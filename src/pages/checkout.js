import {Link} from "react-router-dom";
const Checkout = () => {
    return (
        <div>
            <h1>checkout</h1>
            <Link to="/cart/checkout/success">PurchaseComplete</Link>
        </div>
    )
}

export default Checkout;