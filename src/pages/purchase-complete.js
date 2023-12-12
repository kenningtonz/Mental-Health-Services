import { Link } from "react-router-dom";
import {getPurchase} from '../firebase.js';
const PurchaseComplete = () => {
    let receipt = getPurchase(true);
    console.log(receipt)
    return (
        <main>
            <h1>PurchaseComplete</h1>
            <section>
                <h2>summary</h2>
                <ul>
                    <li><h3>title</h3>
                        {/* <p>{receipt}</p> */}
                        <p>image</p>
                        <p>description</p>
                        <p>quantity</p>
                    </li>
                </ul>
            </section>

            <section>   
            <h2>dates</h2>
            </section>
            <Link to="/">  return to home</Link>
        </main>
    )
}

export default PurchaseComplete;