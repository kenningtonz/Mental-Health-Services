import { Link } from "react-router-dom";
import UserInfo from '../components/userInfo';

const Checkout = () => {
    return (
        <main>
         <Link to="/cart">  back to cart</Link>
            <h1>checkout</h1>
            <section className="card">
                <h2>cost</h2>
                <p>total cost before tax</p>
                <p>total cost with tax</p>
            </section>

           <UserInfo />
            <section className="payment">
                <h2>Payment</h2>
                <form>
                    <label htmlFor="card">Card Number</label>
                    <input type="text" id="card" />
                    <label htmlFor="exp">Expiration Date</label>
                    <input type="text" id="exp" />
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" />
                    <input type="submit" value="Submit" />
                </form>
            </section>
            <Link to="/cart/checkout/success"> Complete Purchase</Link>
        </main>
    )
}

export default Checkout;