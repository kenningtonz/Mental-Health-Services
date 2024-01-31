
import { addDoc, doc, updateDoc, collection, deleteDoc, deleteField, Timestamp } from "firebase/firestore";
import { db } from "../firebase.js";
import { currentUser } from "../index.js";

import { signal } from "@preact/signals-react";
export const tempCartItems = signal([]);
export const cartLength = signal(0);


export function setTempCartItems(){
    if(currentUser.value.cart != undefined){
        tempCartItems.value = currentUser.value.cart.cartItems;
    }else{
        tempCartItems.value = [];
    }
    console.log(tempCartItems.value);
    cartLength.value = tempCartItems.value.length;
}

class Cart{
    constructor(cartItems, date){
        this.cartItems = cartItems;
        this.date = date;
    }
}
const cartConverter={
    fromFirestore: (snapshot, options)=>{
        const data = snapshot.data(options);
        return new Cart(data.cartItems, data.date);
    },
    toFirestore: (cart)=>{
        return{
            cartItems: cart.cartItems,
            date: cart.date
        }
    }
}


// export const cart = [];


class CartItem{
    constructor(serviceID, date, time, cost,serviceName){
        this.serviceID = serviceID;
        this.serviceName = serviceName;
        this.date = date;
        this.time = time;
        this.cost = cost;
    }
    setReservationID(reservationID) {
        this.reservationID = reservationID;
    }
}

export function addToCart(id, date, time, cost, name) {
    let cartItem = {cartItemID: "", id: id, date: date.toDateString() , time: time, cost: cost, name: name}
    if(currentUser.value.cart === undefined){
        currentUser.value.cart = {cartItems: [cartItem], date:  Timestamp.fromDate(new Date(Date.now()))}
        addDoc(collection(db, "carts"), {
            cartItems: [],
            date: Timestamp.fromDate(new Date(Date.now()))
        }).then((docRef) => {
            cartItem.cartItemID = docRef.id.concat("_0");
            currentUser.value.cart.cartID = docRef.id;
            updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
                cart: currentUser.value.cart
            });
        })
    }else{
        cartItem.cartItemID = currentUser.value.cart.cartID.concat("_", currentUser.value.cart.cartItems.length.toString());
        currentUser.value.cart.cartItems.push(cartItem)
        updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
            cart: currentUser.value.cart
        });
    }
    setTempCartItems();
}

export function removeFromCart(cartItemID) {
    if(currentUser.value.cart.cartItems.length === 1){
        currentUser.value.cart = undefined;
        updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
            cart: deleteField()
        });
        deleteDoc(doc(db, 'carts', `${cartItemID}`));
    }else{
        currentUser.value.cart.cartItems.splice(currentUser.value.cart.cartItems.indexOf(cartItemID), 1);
        updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
            cart: currentUser.value.cart
        });
    }
    setTempCartItems();
}

