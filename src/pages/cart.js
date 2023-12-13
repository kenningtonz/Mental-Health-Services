import { Link } from "react-router-dom";
import { ServicesListCart } from './services';
import { cart } from "../index.js";

const Cart = () => {
    return (
        <main>
            <h1>Your Cart</h1>
            <section className="card">
            <ServicesListCart />
                {cart.value.length == 0 ? <p className="center">Cart is empty</p> : <Link to="/cart/checkout" ><button className="greenBtn"> Checkout</button></Link>}
            </section>

        </main>
    )
}

export default Cart;