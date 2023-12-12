import { Link } from "react-router-dom";
import UserInfo from '../components/userInfo';
import { savePayment, getTotalCost,completePurchase } from '../firebase.js'
import { currentUser } from "../index.js";

const Checkout = () => {

    function handleSubmit(event) {
        let userInfo = { card: event.target.elements.card.value, expMonth: event.target.elements.expMonth.value,expYear: event.target.elements.expYear , cvv: event.target.elements.cvv.value }
        savePayment(userInfo);
    }
    

    return (
        <main>
            <Link to="/cart">  back to cart</Link>
            <h1>checkout</h1>
            <section className="card">
                <h2>Cost</h2>
                <p>total cost before tax: {getTotalCost()}</p>
                <p>total cost with tax: {getTotalCost() * 1.13}</p>
            </section>

            <UserInfo />
            <section className="payment">
                <h2>Payment</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="card">Name on Card</label>
                    <input type="text" id="name" defaultValue={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required />
                    <label htmlFor="card">Card Number</label>
                    <input type="text" id="card" required />
                    <label for="expMonth">Exp Month</label>
                    <input type="text" id="expMonth" placeholder="September" />
                    <label for="expYear">Exp Year</label>
                    <input type="text" id="expYear" placeholder="2018" />
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" required />
                    <button type="submit">Save Payment</button>
                </form>
            </section>
            <button onClick={completePurchase}>Complete Purchase</button>
            {/* <Link to="/cart/checkout/success"> Complete Purchase</Link> */}
        </main>
    )
}

export default Checkout;