import { Link } from "react-router-dom";
import { tempCartItems } from "../functions/cart.js";
import { CartItemsTable } from "../components/index.js";
import hero from '../images/image3.jpg';

const Cart = () => {

  if (tempCartItems.value.length == 0) {
    return (
      <main>
        <section className="heroSection">
          <img src={hero} alt="" />
          <div className="heroText">
            <h1>Your Cart</h1>
          </div>
        </section>

        <section className="card">
          <h2>Your cart is empty</h2>
          <Link to="/services"><button className=" customButton blueBtn" >Return to Services</button>
          </Link>
        </section>
      </main>
    )
  }
  else {
    return (
      <main>
     <section className="heroSection">
          <img src={hero} alt="" />
          <div className="heroText">
            <h1>Your Cart</h1>
          </div>
        </section>
        <section className="card">
          <CartItemsTable showRemove={true} showLink={true} />
          <Link to="/cart/checkout"><button className=" width-100 customButton greenBtn">Checkout</button>
          </Link>
        </section>
      </main>
    )
  }
}

export default Cart;

