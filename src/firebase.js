// Import the functions you need from the SDKs you need
// import { signal, computed } from "@preact/signals";

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, collection, addDoc, updateDoc, getDocs, doc } from "firebase/firestore";
import { createContext } from "react";
// https://firebase.google.com/docs/web/setup#available-libraries
import {cart, currentUser} from "./index.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD02l6QYxIhArwY8kp7Mb-pOOOHg_g3XJU",
    authDomain: "todo-51e7a.firebaseapp.com",
    projectId: "todo-51e7a",
    storageBucket: "todo-51e7a.appspot.com",
    messagingSenderId: "285488256767",
    appId: "1:285488256767:web:4d687369be7e1271c91eca"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const servicesSnapshot = await getDocs(collection(db, "services"));
const services = [];
servicesSnapshot.forEach((doc) => {
    services.push(doc.data());
    // console.log(doc.id, " => ", doc.data().type);
});

const typesSnapshot = await getDocs(collection(db, "typesOfServices"));


// function typesFilter(type) {
//     let filtered = services.filter(service => service.type == type);
//     return filtered;
// }


const usersSnapshot = await getDocs(collection(db, "users"));
const users = [];
usersSnapshot.forEach((doc) => {
    users.push(doc.data());
    users[users.length - 1].id = doc.id;
    // console.log(doc.id, " => ", doc.data());
});

// const state = createAppState();

// function createAppState() {
//     const types = signal([]);
//     typesSnapshot.forEach((doc) => {
//         types.push(doc.data());
//         // console.log(doc.id, " => ", doc.data());
//     });
//     return { types };
// }

function checkUser(userInfo) {
    let checked = false
    users.forEach((user) => {
        if (user.email === userInfo.email && user.password === userInfo.password) {
            currentUser.value = user;
            console.log("logged in")
            console.log(currentUser)
            checked = true;
            cart.value = getCart();
        }
    })
    if (checked) {
        return true;
    } else {
        return false;
    }
}

function checkUserExists(userInfo) {
    let checked = false
    users.forEach((user) => {
        if (user.email === userInfo.email) {
            checked = true;
        }
    })
    if (checked) {
        return true;
    } else {
        return false;
    }
}

function addUser(userInfo) {
    addDoc(doc(db, 'users'), {
        email: userInfo.email,
        password: userInfo.password,
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        // cart: [],
        // purchases: []
    });
    console.log("added")
}

function changeUser(userInfo) {
    let changed = false
    users.forEach((user) => {
        if (user.email === userInfo.email) {
            updateDoc(doc(db, 'users', `${user.id}`), {
                password: userInfo.password
            });
            users[users.indexOf(user)].password = userInfo.password;
            changed = true;
        }
    })
    if (changed) {
        console.log("changed")
        return true;
    } else {
        return false;
    }
}

function editUser(userInfo) {
    updateDoc(doc(db, 'users', `${currentUser.id}`), {
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        address: userInfo.address,
        phone: userInfo.phone,
        // email: userInfo.email
    });
    currentUser.value.firstName = userInfo.firstname;
    currentUser.value.lastName = userInfo.lastname;
    currentUser.value.address = userInfo.address;
    currentUser.value.phone = userInfo.phone;
    // currentUser.value.email = userInfo.email;
    console.log("edited")

}


function addToCart(serviceSlug) {
    currentUser.value.cart.push(serviceSlug);
    setDoc(doc(db, 'users', `${currentUser.id}`), {
        cart: currentUser.value.cart
    });
    cart.value.push(services[serviceSlug]);
    console.log(currentUser.value.cart)
}

function removeFromCart(serviceSlug) {
    let index = currentUser.value.cart.indexOf(serviceSlug);
    currentUser.value.cart.splice(index, 1);
    console.log(currentUser.value.cart)
    setDoc(doc(db, 'users', `${currentUser.id}`), {
        cart: currentUser.value.cart
    });
    cart.value.splice(index, 1);
    console.log(cart.value)
}

// const remove = computed(() => {
//     return (serviceSlug) => {
//         let index = currentUser.value.cart.indexOf(serviceSlug);
//         currentUser.value.cart.splice(index, 1);
//         console.log(currentUser.value.cart)
//         setDoc(doc(db, 'users', `${currentUser.id}`), {
//             cart: currentUser.value.cart
//         });
//         cart.value.splice(index, 1);
//         console.log(cart.value)
//     }
// })

function getCart() {
    let cartTemp = [];
    currentUser.value.cart.forEach((serviceSlug) => {
        cartTemp.push(services[serviceSlug]);
    })
    console.log(cartTemp)
    return cartTemp;
}

export {getCart, editUser, checkUserExists, addUser, changeUser, services, addToCart, removeFromCart, checkUser };