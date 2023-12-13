// Import the functions you need from the SDKs you need
// import { signal, computed } from "@preact/signals";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc, arrayUnion, onSnapshot } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries
import { cart, currentUser } from "./index.js";

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
export const services = [];
servicesSnapshot.forEach((doc) => {
    services.push(doc.data());
    // console.log(doc.id, " => ", doc.data().type);
});

const ordersSnapshot = await getDocs(collection(db, "orders"));
const orderNumbers = [];
ordersSnapshot.forEach((doc) => {
    orderNumbers.push(doc.data().orderNumbers);
});

const usersSnapshot = await getDocs(collection(db, "users"));
const users = [];
usersSnapshot.forEach((doc) => {
    users.push(doc.data());
    users[users.length - 1].id = doc.id;
    // console.log(doc.id, " => ", doc.data());
});

// FUTURE THOUGHTS
// const orders = [];
// const ordersSnap = onSnapshot(getDocs((collection(db, "users")),(doc) =>{
// }));
// const userQ = query(collection(db, "users"), where("email", "==", userInfo.email));
// const userQSnap = await getDocs(q)

export function checkUser(userInfo) {
    let checked = false
    users.forEach((user) => {
        if (user.email === userInfo.email && user.password === userInfo.password) {
            setUser(user.id);
            console.log("logged in")
            console.log(currentUser)
            checked = true;
        }
    })
    if (checked) {
        return true;
    } else {
        return false;
    }
}

export function setUser(id){
currentUser.value =  users.find(user => user.id === id);
cart.value = getCart();
}

export function checkUserExists(userInfo) {
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

export function addUser(userInfo) {
    addDoc(collection(db, 'users'), {
        email: userInfo.email,
        password: userInfo.password,
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        cart: [],
        purchases: [],
        payment: {card: 0, expMonth: 0, expYear: 0, cvv: 0}
    });
    console.log("added")
}

export function changeUser(userInfo) {
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

export function editUser(userInfo) {
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
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


export function addToCart(serviceSlug) {
    currentUser.value.cart.push(serviceSlug);
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        cart: currentUser.value.cart
    });
    if (cart.value.indexOf(services[serviceSlug]) == -1) {
        cart.value.push(services[serviceSlug]);
        cart.value[cart.value.indexOf(services[serviceSlug])].amount = 1;
    } else {
        cart.value[cart.value.indexOf(services[serviceSlug])].amount++;
    }
    console.log(`currentUser value: ${currentUser.value.cart}`)

}

export function removeFromCart(serviceSlug) {
    let index1 = currentUser.value.cart.indexOf(serviceSlug);
    let index2 = cart.value.indexOf(services[serviceSlug]);
    currentUser.value.cart.splice(index1, 1);
    if (cart.value[index2].amount > 1) {
        cart.value[index2].amount--;
    } else {
        cart.value.splice(index2, 1);
    }
    console.log(currentUser.value.cart)
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        cart: currentUser.value.cart
    });
}

export function getCart() {
    let cartTemp = [];
    currentUser.value.cart.forEach((serviceSlug) => {
        if (cartTemp.indexOf(services[serviceSlug]) == -1) {
            cartTemp.push(services[serviceSlug]);
            cartTemp[cartTemp.indexOf(services[serviceSlug])].amount = 1;
        }
        else {
            cartTemp[cartTemp.indexOf(services[serviceSlug])].amount++;
        }
    })
    console.log(cartTemp)
    return cartTemp;
}

export function savePayment(userInfo){
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        payment: userInfo
    });
    currentUser.value.payment = userInfo;
    console.log("saved payment")
}
export function getTotalCost(){
    let total = 0;
    cart.value.forEach((service)=>{
        total += service.cost * service.amount;
    })
    return [total.toFixed(2), (total * 1.13).toFixed(2)];
}

export function completePurchase(){
    
    let purchase = {order: Math.max(orderNumbers) + 1, date: new Date() ,services: cart.value, totalCost: getTotalCost()[0], user: currentUser.value.id}
    currentUser.value.purchases.push(purchase);
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        purchases: currentUser.value.purchases
    });
    cart.value = [];
    currentUser.value.cart = [];
    updateDoc(doc(db, 'users', `${currentUser.value.id}`), {
        cart: currentUser.value.cart
    });
    updateDoc(doc(db, 'users', `orders`), {
        orderNumbers: arrayUnion(purchase.order)
    });

    console.log("completed purchase")
}


export function getPurchase(isLatest){

    if(isLatest){
        return currentUser.value.purchases[currentUser.value.purchases.length - 1];
    }
    else{
        return currentUser.value.purchases;
    }
}

// export { getCart, editUser, checkUserExists, addUser, changeUser, services, addToCart, removeFromCart, checkUser };