// Import the functions you need from the SDKs you need
// import { signal, computed } from "@preact/signals";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries
import { cart, currentUser, cartLength } from "./index.js";
import { initServices, services } from "./functions/service.js";

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
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
initServices(db);




// const ordersSnapshot = await getDoc(doc(db, "orders", "orders"));
// const orderNumbers = [];

// const orderQ = query(doc(db, "orders", "orders"));
// const ordersSnapshot = onSnapshot(orderQ, (snap) => {
//     orderNumbers.length = 0;
//     snap.data().orderNumbers.forEach((order) => {
//         orderNumbers.push(order);
//     })
// });

// const users = [];

// const userQ = query(collection(db, "users"));
// const usersSnapshot2 = onSnapshot(userQ, (snap) => {
//     snap.docChanges().forEach((change) => {
//         if (change.type === "added") {
//             users.push(change.doc.data());
//             users[users.length - 1].id = change.doc.id;
//         }
//     })
//     console.log(users)
// });

// export function checkUser(userInfo) {
//     let checked = false
//     users.forEach((user) => {
//         if (user.email === userInfo.email && user.password === userInfo.password) {
//             setUser(user.id);
//             console.log("logged in")
//             console.log(currentUser)
//             checked = true;
//         }
//     })
//     if (checked) {
//         return true;
//     } else {
//         return false;
//     }
// }

// export function setUser(id) {
//     currentUser.value = users.find(user => user.id === id);
//     cartLength.value = currentUser.value.cart.length;
//     cart.value = getCart();
// }

// export function checkUserExists(userInfo) {
//     let checked = false
//     userInfo.email = userInfo.email.toLowerCase();
//     users.forEach((user) => {
//         if (user.email == userInfo.email) {
//             checked = true;
//         }
//     })
//     if (currentUser.value.email != undefined && currentUser.value.email === userInfo.email) {
//         checked = false;
//     }
//     if (checked) {
//         return true;
//     } else {
//         return false;
//     }
// }

// export function checkUserPassword(userInfo) {
//     if (currentUser.value.password === userInfo.password) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// export function addUser(userInfo) {
//     userInfo.email = userInfo.email.toLowerCase();
//     setDoc(doc(db, 'users', `user${users.length + 1}`), {
//         email: userInfo.email,
//         password: userInfo.password,
//         firstName: userInfo.firstName,
//         lastName: userInfo.lastName,
//         address: userInfo.address,
//         phone: userInfo.phone,
//         cart: [],
//         purchases: [],
//         payment: { card: ``, expMonth: ``, expYear: ``, cvv: `` }
//     });
//     console.log("added user")
//     return `user${users.length + 1}`
// }

// export function changeUser(userInfo) {
//     let changed = false
//     userInfo.email = userInfo.email.toLowerCase();
//     users.forEach((user) => {
//         if (user.email === userInfo.email) {
//             updateDoc(doc(db, 'users', `${user.id}`), {
//                 password: userInfo.password
//             });
//             users[users.indexOf(user)].password = userInfo.password;
//             changed = true;
//         }
//     })
//     if (changed) {
//         console.log("changed")
//         return true;
//     } else {
//         return false;
//     }
// }


// export function getPurchase(isLatest) {
//     if (isLatest) {
//         return currentUser.value.purchases[currentUser.value.purchases.length - 1];
//     }
//     else {
//         return currentUser.value.purchases;
//     }
// }

