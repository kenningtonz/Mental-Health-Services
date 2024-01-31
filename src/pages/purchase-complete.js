import { Link } from "react-router-dom";
// import { getPurchase } from '../firebase.js';
import { currentUser } from "../index.js";
import { getTimeFormat } from "../functions/general.js";
const PurchaseComplete = () => {

    let receipt = currentUser.value.orders[currentUser.value.orders.length - 1];
    console.log(receipt)
    return (
        <main>
        
            <section className="card purchase">
            <h1>Purchase Complete!</h1>
                <h2>Summary</h2>
                {/* <h3>Purchase Order {receipt.order}</h3> */}
                <p><strong>Date: </strong>{receipt.date}</p>
                <p><strong>Total Cost: </strong>${receipt.cost}</p>
                <p><strong>Services:</strong></p>
                <ul>
                    {receipt.services.map((service) => (
                        <li key={service.id}>
                <p>{service.name} on {service.date} at {getTimeFormat(service.time)}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <Link to="/"><button className="customButton blueBtn" style={{marginLeft: 1+'rem'}} >Return to Home</button></Link>
        </main>
    )
}

export default PurchaseComplete;