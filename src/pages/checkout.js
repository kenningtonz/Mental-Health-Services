import { Link } from "react-router-dom";

import { currentUser } from "../index.js";
import { completePurchase, getTotalCost } from '../functions/orders.js'
import { useNavigate, Navigate } from "react-router-dom";



import { signal } from "@preact/signals-react";
import { Steps } from 'primereact/steps';

import { CartItemsTable, UserContactInfo, UserBillingInfo } from "../components";


const activeStep = signal(0);


const Checkout = () => {

    const steps = [{ label: "Contact" }, { label: "Payment" }, { label: "Review" }]

    function setActiveStep(step) {
        activeStep.value = step;
    }

    if (currentUser.value.cart == undefined) {
        console.log("no cart")
        return (<Navigate to="/" />)
    }
    else
        return (
            <>
                <Link to="/cart"><button className="btn ml1 mt1 secondary" >Back</button></Link>

                <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280"><path fill="#FFB494" fillOpacity="1" d="M0,224L34.3,208C68.6,192,137,160,206,128C274.3,96,343,64,411,64C480,64,549,96,617,122.7C685.7,149,754,171,823,165.3C891.4,160,960,128,1029,149.3C1097.1,171,1166,245,1234,250.7C1302.9,256,1371,192,1406,160L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
                <section className="redBG  p1 mt-1 mb-1">
                    <Steps model={steps} activeIndex={activeStep.value} />

                    <div className="card redShadow mt1">
                        <h2>Order Details</h2>
                        <CartItemsTable showLink={false} showRemove={false} />
                        <section>
                            <p>Cost: {"$" + getTotalCost().beforeTax}</p>
                            <p>Tax: {"$" + (getTotalCost().withTax - getTotalCost().beforeTax)}</p>
                            <p><strong>Total Cost {"$" + getTotalCost().withTax}</strong></p>
                        </section>
                    </div>

                    <div className="card redShadow mt1">

                        {activeStep.value == 0 ? <UserContactInfo isCheckout={true} isEditable={true} setCheckoutIndex={setActiveStep} /> : null}
                        {activeStep.value == 1 ? <UserBillingInfo isCheckout={true} isEditable={true} setCheckoutIndex={setActiveStep} /> : null}
                        {activeStep.value == 2 ? <Review setCheckoutIndex={setActiveStep} /> : null}
                    </div>

                </section>
                <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFB494" fillOpacity="1" d="M1440 224 1405.7 208C1371.4 192 1303 160 1234 128 1165.7 96 1097 64 1029 64 960 64 891 96 823 122.7 754.3 149 686 171 617 165.3 548.6 160 480 128 411 149.3 342.9 171 274 245 206 250.7 137.1 256 69 192 34 160L0 128 0 0 34.3 0C68.6 0 137 0 206 0 274.3 0 343 0 411 0 480 0 549 0 617 0 685.7 0 754 0 823 0 891.4 0 960 0 1029 0 1097.1 0 1166 0 1234 0 1302.9 0 1371 0 1406 0L1440 0Z"></path></svg>
            </>
        )
}

export default Checkout;



const Review = ({ setCheckoutIndex }) => {
    const navigate = useNavigate();
    function nextStep(e) {
        e.preventDefault();
        completePurchase();
        navigate('/cart/checkout/success')
        setCheckoutIndex(0)
    }
    return (
        <section className="flex gap-1 flex-col">
            <h2>Review</h2>
            <UserContactInfo isEditable={false} />
            <UserBillingInfo isEditable={false} />

            <div className="flex space-between">
                <button className="btn secondary" onClick={nextStep}>Back</button>
                <button className="btn primary " onClick={nextStep}>Complete Purchase</button>

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