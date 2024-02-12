import { collection, updateDoc, doc, onSnapshot, query, addDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase.js";
import { currentUser } from "../index.js";

import { setTempCartItems } from "./cart.js";
export const reservations = [];

class Order {
    constructor(userID, services, date, cost) {
        this.userID = userID;
        this.services = services;
        this.date = date;
        this.cost = cost;
    }
}

class Reservation {
    constructor(serviceID, date, time) {
        this.serviceID = serviceID;
        this.date = date;
        this.time = time;
    }
    setReservationID(reservationID) {
        this.reservationID = reservationID;
    }
}

const orderConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Order(data.userID, data.serviceID, data.date, data.time);
    }
}

const reservationConverter = {
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Reservation(data.serviceID, data.date, data.time);
    }
}


const reservationsSnapshot = onSnapshot(query(collection(db, "reservations")), (snap) => {
    snap.docChanges().forEach((change) => {
        if (change.type === "added") {
            reservations.push(change.doc.data());
        }
    })
    console.log(reservations)
});

export function completePurchase() {
    let order = { userID: currentUser.value.userID, services: currentUser.value.cart.cartItems, date: (new Date(Date.now())).toDateString(), cost: getTotalCost().withTax };
    currentUser.value.cart = undefined;
    setTempCartItems();

    for (const service of order.services) {
        let reservation = { serviceID: service.id, date: service.date, time: service.time, userID: currentUser.value.userID };
        addDoc(collection(db, "reservations"), reservation)
            .then(function (docRef) {
                // updateDoc(doc(db, 'orders', `${docRef.id}`), {
                //     reservationID: docRef.id
                // });
                service.reservationID = docRef.id;
            })
    }
    if (currentUser.value.orders === undefined) {
        currentUser.value.orders = [order];
    } else {
        currentUser.value.orders.push(order);
    }
    updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
        cart: deleteField(),
        orders: currentUser.value.orders
    });

    console.log("completed purchase")
}

export function getTotalCost() {
    let total = 0;
    currentUser.value.cart.cartItems.forEach((service) => {
        total += service.cost;
    })
    return { beforeTax: total.toFixed(2), withTax: (total * 1.13).toFixed(2) };
}

export function getOrderHistory() {
    return currentUser.value.orders;
}