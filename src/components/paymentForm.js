import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { currentUser } from "../index.js";
import { savePayment } from "../functions/userAuth.js";


const PaymentForm = ({ extraFunction }) => {
    let defaultValues = {
        name: currentUser.value.firstName + " " + currentUser.value.lastName,
        card: currentUser.value.payment != undefined ? currentUser.value.payment.card : "",
        cvv: currentUser.value.payment != undefined ? currentUser.value.payment.cvv : "",
        expDate: currentUser.value.payment != undefined ? currentUser.value.payment.expDate : ""
    };
    function nextStep(event) {
        event.preventDefault();
        let userInfo = { name: event.target.elements.nameOnCard.value, card: event.target.elements.cardNumber.value, expDate: event.target.elements.expDate.value, cvv: event.target.elements.cvv.value }
        savePayment(userInfo);
        extraFunction(2);
    }

    return (<section className="card">
        <h2>Payment</h2>

        <form onSubmit={nextStep}>
            <section className="flex">
                <span className="child-100">
                    <label htmlFor="nameOnCard">Name on Card</label>
                    <InputText id="nameOnCard" value={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required />
                </span>
                <span className="child-100">
                    <label htmlFor="cardNumber">Card Number</label>
                    <InputText id="cardNumber"  required />
                </span>
                <span className="child-50 ">
                    <label htmlFor="expDate">Exp</label>
                    <InputMask id="expDate" mask="99/99" required value={defaultValues.expDate} />
                </span>
                <span className="child-50">
                    <label htmlFor="cvv">CVV</label>
                    <InputMask id="cvv" mask="999" required value={defaultValues.cvv} />
                </span>
            </section>

            <button className="customButton width-100 greenBtn" type="submit">Save Payment</button>
        </form>
    </section>)
}

export default PaymentForm;