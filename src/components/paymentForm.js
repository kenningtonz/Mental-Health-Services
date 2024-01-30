import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { currentUser } from "../index.js";
import { savePayment } from "../functions/userAuth.js";


const PaymentForm = ({extraFunction}) => {
    function nextStep(event) {
        event.preventDefault();
        let userInfo = { name:event.target.elements.cardNumber.value  ,card: event.target.elements.cardNumber.value, expDate: event.target.elements.expDate.value, cvv: event.target.elements.cvv.value }
        savePayment(userInfo);
        extraFunction();
    }

    return (<section className="">
        <h2>Payment</h2>
        <form onSubmit={nextStep}>
            <span className="p-float-label">
                <InputText id="nameOnCard" value={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required />
                <label htmlFor="nameOnCard">Name on Card</label>
            </span>
            <span className="p-float-label">
                <InputText id="cardNumber" required />
                <label htmlFor="cardNumber">Card Number</label>
            </span>
            <div className="flex-1">
                <span className="p-float-label ">
                    <InputMask id="expDate" mask="99/99" required />
                    <label htmlFor="expDate">Exp</label>
                </span>
                <span className="p-float-label">
                    <InputMask id="cvv" mask="999" required />
                    <label htmlFor="cvv">CVV</label>
                </span>
            </div>
            <button className="blueBtn" type="submit">Save Payment</button>
        </form>
    </section>)
}

export default PaymentForm;