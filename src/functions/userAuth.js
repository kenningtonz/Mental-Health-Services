import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateEmail, updatePassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { db, app } from "../firebase.js";
import { currentUser, loggedIn } from "../index.js";
import { doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { signal } from "@preact/signals-react";
import { setTempCartItems } from "./cart.js";

const loggedInUser = signal({});
// const currentUser = signal({});

const auth = getAuth(app);

const userAuthChanged = () => auth.onAuthStateChanged(authUser => {
    authUser
        ? localStorage.setItem('authUser', JSON.stringify(authUser))
        : localStorage.removeItem('authUser')
        loggedIn.value = checkIsSignedIn();
});


class User {
    constructor(userID, firstName, lastName, email, password) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        // this.address = address;
        // this.phone = phone;
        // this.payment = { card: ``, expMonth: ``, expYear: ``, cvv: `` };
    }
    setCart(cart) {
        this.cart = cart;
    }
    setPurchases(purchases) {
        this.purchases = purchases;
    }
    setPayment(payment) {
        this.payment = payment;
    }
    setAddress(address) {
        this.address = address;
    }
    setPhone(phone) {
        this.phone = phone;
    }
}

const userConverter = {
    toFirestore: (user) => {
        return {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            // address: user.address,
            // phone: user.phone,
            // payment: user.payment,
            // cart: user.cart,
            // purchases: user.purchases
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.userID, data.firstName, data.lastName, data.email, data.password, data.address, data.phone, data.cart, data.purchases, data.payment);
    }
}


export function signUserOut() {
    // localStorage.removeItem('authUser');
    signOut(auth).then(() => {
        currentUser.value = {};
        userAuthChanged();
    }).catch((error) => {
        console.log(error);
    });
}

export async function signUp(userInfo) {
    let returnMessage = { error: false, message: '' };
    let promise = createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
            setDoc(doc(db, 'users', auth.currentUser.uid).withConverter(userConverter), new User(auth.currentUser.uid, userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.password));
            // Signed up 
            // currentUser.value = new User(auth.currentUser.uid, userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.password);
            console.log("added user")
            userAuthChanged();
            return returnMessage;
        })
        .catch((error) => {
            returnMessage = errorChecker(error);
            console.log(error);
            return returnMessage;
        })
    return await promise;
}



export async function signIn(userInfo) {
    let returnMessage = { error: false, message: '' };
    let promise = signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
            // Signed in 
            // getUserInfo(userInfo.email);
            userAuthChanged();
            return returnMessage;
        })
        .catch((error) => {
            returnMessage = errorChecker(error);
            return returnMessage;
        });
    return await promise;
}

async function getUserInfo(email) {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", email)));
    querySnapshot.forEach((doc) => {
        currentUser.value = doc.data();
    });

    console.log(currentUser.value);
}

// function setLoggedIn(value){
//     loggedIn.value = value;
// }

export function checkIsSignedIn() {
    loggedInUser.value = JSON.parse(localStorage.getItem('authUser'));
    if (loggedInUser.value != null) {
        getUserInfo(loggedInUser.value.email).then(() => {    setTempCartItems();});
        console.log("signed in");
        return true;
    }
    else {
        console.log("not signed in");
        return false;
    }
}



function errorChecker(error) {
    const errorCode = error.code;
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return { error: true, message: 'Email already in use' }
        case 'auth/invalid-email':
            return { error: true, message: 'Invalid email' }
        case 'auth/weak-password':
            return { error: true, message: 'Password must be at least six characters' }
        case 'auth/wrong-password':
            return { error: true, message: 'Incorrect password' }
        case 'auth/user-not-found':
            return { error: true, message: 'User not found' }
        default:
            return { error: true, message: error.message }
    }

}


// function reAuth(userInfo) {
//     // TODO(you): prompt the user to re-provide their sign-in credentials
//     const credential = promptForCredentials();

//     reauthenticateWithCredential(user, credential).then(() => {
//         // User re-authenticated.
//     }).catch((error) => {
//         // An error ocurred
//         // ...
//     });
// }

// export function changePassword(userInfo) {

// }

function changeEmail(userInfo) {
    if (userInfo.email != currentUser.value.email) {
        updateEmail(auth.currentUser, userInfo.email).then(() => {
            console.log("email updated")
        }).catch((error) => {
            console.log(error)
        });
    }
}

function changePassword(userInfo) {
    if (userInfo.password != currentUser.value.password) {
        updatePassword(auth.currentUser, userInfo.password).then(() => {
            console.log("password updated")
        }
        ).catch((error) => {
            console.log(error)
        });
    }
}

export function updateUserInfo(userInfo) {
    console.log(userInfo);
    console.log(currentUser.value.id);
    updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        address: userInfo.address,
        phone: userInfo.phone
    });
    currentUser.value.firstName = userInfo.firstName;
    currentUser.value.lastName = userInfo.lastName;
    currentUser.value.address = userInfo.address;
    currentUser.value.phone = userInfo.phone;    
}
export function savePayment(userInfo) {
    updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
        payment: userInfo
    });
    currentUser.value.payment = userInfo;
    console.log("saved payment")
}


export function saveUserCart(cart) {
    currentUser.value.cart = cart;
    updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
        cart: currentUser.value.cart
    });
}

export function saveOrder(cart) {
    currentUser.value.cart = cart;
    updateDoc(doc(db, 'users', `${currentUser.value.userID}`), {
        cart: currentUser.value.cart
    });
}