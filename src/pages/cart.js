import { Link } from "react-router-dom";
import { ServicesListCart } from './services';
 

 const cart = {
    'firstService': {
      title: 'First Service',
    },
    'secondService': {
      title: 'Second Service',
    }
  }

const Cart = () => {
    return (
        <main>
            <h1>Your Cart</h1>

            <section className="card">

            <ServicesListCart cart={cart} />
            </section>
            <Link to="/cart/checkout" >Checkout</Link>
        </main>
    )
}

export default Cart;