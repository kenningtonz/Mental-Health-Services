import { Link } from "react-router-dom";

import { currentUser } from "../index.js";
import { completePurchase, getTotalCost } from '../functions/orders.js'
import { useNavigate } from "react-router-dom";



import { signal } from "@preact/signals-react";
import { Steps } from 'primereact/steps';

import { PaymentForm, UserInfoForm, CartItemsTable, UserInfo } from "../components";

const activeStep = signal(0);


const Checkout = () => {


    const navigate = useNavigate();

    const steps = [{ label: "Your Details" }, { label: "Payment" }, { label: "Review" }, { label: "Complete" }]

    function stepSelect(event) {
        if (event.index < activeStep.value) {
            activeStep.value = event.index;
        }
    }

    function setActiveStep(step) {
        activeStep.value = step;
    }

    return (
        <main>
            <Link to="/cart">  back to cart</Link>
            <div className="card">
                <h1>Checkout</h1>
                <Steps model={steps} activeIndex={activeStep.value} />
            </div>


            <section className="card">
                <h2>Order</h2>
                <CartItemsTable showLink={false} showRemove={false} />

                <p>total cost before tax: {"$" + getTotalCost().beforeTax}</p>
                <p>total cost with tax: {"$" + getTotalCost().withTax}</p>
            </section>

            {activeStep.value == 0 ? <UserInfoForm extraFunction={setActiveStep(1)} /> : activeStep.value == 1 ? <PaymentForm extraFunction={setActiveStep(2)} /> : activeStep.value == 2 ? <Review /> : <PurchaseComplete />}

        </main>
    )
}

export default Checkout;

const Review = () => {
    function nextStep(event) {
        event.preventDefault();
        completePurchase();
        activeStep.value = 3;
        // navigate('/cart/checkout/success')
    }
    return (
        <section>
            <h2>Review</h2>
            <UserInfo showPayment={true} />
            <button className="customButton greenBtn width-100" onClick={completePurchase}>Complete Purchase</button>
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