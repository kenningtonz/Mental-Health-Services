import { Link } from "react-router-dom";

import { currentUser } from "../index.js";
import { completePurchase, getTotalCost } from '../functions/orders.js'
import { useNavigate, Navigate } from "react-router-dom";



import { signal } from "@preact/signals-react";
import { Steps } from 'primereact/steps';

import { PaymentForm, UserInfoForm, CartItemsTable, UserInfo } from "../components";


const activeStep = signal(0);


const Checkout = () => {

    const steps = [{ label: "Details" }, { label: "Payment" }, { label: "Review" }]

    function setActiveStep(step) {
        activeStep.value = step;
    }

    if (currentUser.value.cart == undefined) {
        console.log("no cart")
        // navigate('/cart');
        return (<Navigate to="/" />)
    }
    else
        return (
            <main>
                <Link to="/cart"><button className="customButton redBtn" style={{ marginTop: 1 + 'rem', marginLeft: 1 + 'rem' }}>Back</button></Link>
                <div className="card">
                    {/* <h1>Checkout</h1> */}
                    <Steps model={steps} activeIndex={activeStep.value} />
                    <h2>Order Details</h2>
                    <CartItemsTable showLink={false} showRemove={false} />

                    <section>
                        <p>Cost: {"$" + getTotalCost().beforeTax}</p>
                        <p>Tax: {"$" + getTotalCost().beforeTax}</p>
                        <p><strong>Total Cost {"$" + getTotalCost().withTax}</strong></p>
                    </section>

                </div>

                {activeStep.value == 0 ? <UserInfoForm extraFunction={setActiveStep} /> : null}
                {activeStep.value == 1 ? <PaymentForm extraFunction={setActiveStep} /> : null}
                {activeStep.value == 2 ? <Review /> : null}

            </main>
        )
}

export default Checkout;



const Review = () => {
    const navigate = useNavigate();
    function nextStep(event) {
        event.preventDefault();
        completePurchase();

        navigate('/cart/checkout/success')
    }
    return (
        <section>
            <h2>Review</h2>
            <UserInfo showPayment={true} />
            <div className="flex">
                <button className="customButton redBtn width-25" onClick={nextStep}>Back</button>
                <button className="customButton greenBtn width-25" onClick={nextStep}>Complete Purchase</button>

            </div>
        </section>
    )

}


const PurchaseComplete = () => {
    let receipt = {};
    console.log(receipt)
    return (
        <main>
            <h1>Order Complete!</h1>
            <section className="card purchase">
                <h2>Summary</h2>
                <h3>Purchase Order {receipt.order}</h3>
                <p><strong>Date: </strong>{receipt.date.toLocaleDateString('en-CA')}</p>
                <p><strong>Total Cost: </strong>${receipt.totalCost}</p>
                <p><strong>Services:</strong></p>
                <ul>
                    {receipt.services.map((service) => (
                        <li key={receipt.services.indexOf(service)}>
                            <p>{service.name} <strong>Sessions Date: </strong>{service.amount}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <Link to="/"><button className="lavenderBtn" >Return to Home</button></Link>
        </main>
    )
}