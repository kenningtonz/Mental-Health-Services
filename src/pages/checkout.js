import { Link } from "react-router-dom";
import UserInfo from '../components/userInfo';
import { savePayment, getTotalCost, completePurchase } from '../firebase.js'
import { currentUser } from "../index.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    function savePay(event) {
        event.preventDefault();
        let userInfo = { card: event.target.elements.card.value, expMonth: event.target.elements.expMonth.value, expYear: event.target.elements.expYear.value, cvv: event.target.elements.cvv.value }
        console.log(userInfo)
        savePayment(userInfo);
    }

    function complete(event) {
        event.preventDefault();
        completePurchase();
        navigate('/cart/checkout/success')
    }

    return (
        <main>
            <h1>Checkout</h1>
            <Link to="/cart"><button className="redBtn">Back to Cart</button> </Link>
     
            <section className="card">
                <h2>Cost</h2>
                <p><strong>Total Cost Before Tax: </strong>${getTotalCost()[0]}</p>
                <p><strong>Total Cost With Tax: </strong>${getTotalCost()[1]}</p>
            </section>
            <UserInfo canEdit={false} />
            <section className="card">
                <h2>Payment</h2>
                <form onSubmit={savePay} className="payment">
                    <p>
                        <label htmlFor="name">Name on Card</label>
                        <input type="text" id="name" defaultValue={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required />
                    </p>
                    <p>
                        <label htmlFor="card">Card Number</label>
                        <input type="text" id="card" required defaultValue={`${currentUser.value.payment.card}`} />
                    </p>
                    <p>
                        <label htmlFor="expMonth">Exp Month</label>
                        <input type="text" id="expMonth" placeholder="September" defaultValue={`${currentUser.value.payment.expMonth}`} />
                    </p>
                    <p>
                        <label htmlFor="expYear">Exp Year</label>
                        <input type="text" id="expYear" placeholder="2018" defaultValue={`${currentUser.value.payment.expYear}`} />
                    </p>
                    <p>
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" required defaultValue={`${currentUser.value.payment.cvv}`} />
                    </p>
                    <button type="submit">Save Payment</button>
                </form>
            </section>
            <button className="greenBtn" onClick={complete}>Complete Purchase</button>
        </main>
    )
}

export default Checkout;