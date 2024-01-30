import { collection, updateDoc, doc, onSnapshot, query, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { currentUser } from "../index.js";


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
    let order = new Order(currentUser.value.id, currentUser.value.cart, new Date(Date.now()), getTotalCost().withTax);

    currentUser.value.cart = [];
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        cart: currentUser.value.cart
    });

    for (const service of order.services) {
        service.setReservationID(saveReservation(new Reservation(service.serviceID, service.date, service.time)));
    }

    currentUser.value.purchases.push(order);
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        orders: currentUser.value.purchases
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


function saveReservation(reservation) {
    addDoc(collection(db, "reservations"), reservation)
        .then(function (docRef) {
            updateDoc(doc(db, 'orders', `${docRef.id}`), {
                reservationID: docRef.id
            });
            return docRef.id;
        })
}