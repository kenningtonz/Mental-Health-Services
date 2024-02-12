// import React from 'react';
// import { InputText } from 'primereact/inputtext';
// import { InputMask } from 'primereact/inputmask';
// import { currentUser } from "../index.js";
// import { savePayment } from "../functions/userAuth.js";


// const PaymentForm = ({ extraFunction }) => {

//     function nextStep(event) {
//         event.preventDefault();
//         let userInfo = { name: event.target.elements.nameOnCard.value, card: event.target.elements.cardNumber.value, expDate: event.target.elements.expDate.value, cvv: event.target.elements.cvv.value }
//         savePayment(userInfo);
//         extraFunction(2);
//     }

//     return (<section className="card">
//         <h2>Payment</h2>

//         <form onSubmit={nextStep}>
//             <section className="flex">
             
//             </section>

//             <button className="customButton width-100 greenBtn" type="submit">Save Payment</button>
//         </form>
//     </section>)
// }

// export default PaymentForm;