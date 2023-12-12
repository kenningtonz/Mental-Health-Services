import { Link } from "react-router-dom";
import UserInfo from '../components/userInfo';
import { savePayment, getTotalCost,completePurchase } from '../firebase.js'
import { currentUser } from "../index.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    function savePay(event) {
        event.preventDefault();
        let userInfo = { card: event.target.elements.card.value, expMonth: event.target.elements.expMonth.value,expYear: event.target.elements.expYear.value , cvv: event.target.elements.cvv.value }
        console.log(userInfo)
        savePayment(userInfo);
    }
    
    function complete(event){
        event.preventDefault();
        completePurchase();
        navigate('/cart/checkout/success')
    }

    return (
        <main>
            <Link to="/cart">  back to cart</Link>
            <h1>checkout</h1>
            <section className="card">
                <h2>Cost</h2>
                <p>total cost before tax: {getTotalCost()[0]}</p>
                <p>total cost with tax: {getTotalCost()[1]}</p>
            </section>

            <UserInfo />
            <section className="payment">
                <h2>Payment</h2>
                <form onSubmit={savePay}>
                    <label htmlFor="card">Name on Card</label>
                    <input type="text" id="name" defaultValue={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required />
                    <label htmlFor="card">Card Number</label>
                    <input type="text" id="card" required defaultValue={`${currentUser.value.payment.card}`}/>
                    <label htmlFor="expMonth">Exp Month</label>
                    <input type="text" id="expMonth" placeholder="September" defaultValue={`${currentUser.value.payment.expMonth}`}/>
                    <label htmlFor="expYear">Exp Year</label>
                    <input type="text" id="expYear" placeholder="2018" defaultValue={`${currentUser.value.payment.expYear}`}/>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" required defaultValue={`${currentUser.value.payment.cvv}`}/>
                    <button type="submit">Save Payment</button>
                </form>
            </section>
            <button onClick={complete}>Complete Purchase</button>
            {/* <Link to="/cart/checkout/success"> Complete Purchase</Link> */}
        </main>
    )
}

export default Checkout;