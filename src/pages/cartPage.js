import { Link } from "react-router-dom";
import { tempCartItems } from "../functions/cart.js";
import { CartItemsTable } from "../components/index.js";

const Cart = () => {

  if (tempCartItems.value.length == 0) {
    return (
      <main>
        <h1>Your Cart</h1>
        <section className="card">
          <h2>Your cart is empty</h2>
          <Link to="/services"><button className=" width-100 customButton lavenderBtn" >Return to Services</button>
          </Link>
        </section>
      </main>
    )
  }
  else {
    return (
      <main>
        <h1>Your Cart</h1>
        <section className="card">
          <CartItemsTable showRemove={true} showLink={true} />
          <Link to="/cart/checkout" ></Link>
          <Link to="/cart/checkout"><button className=" width-100 customButton greenBtn">Checkout</button>
          </Link>
        </section>
      </main>
    )
  }
}

export default Cart;

