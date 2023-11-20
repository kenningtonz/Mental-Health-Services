import {Link} from "react-router-dom";
const Cart = () => {
    return (
        <div>
            <h1>cart</h1>
            <Link to="/cart/checkout">Checkout</Link>
        </div>
    )
}

export default Cart;