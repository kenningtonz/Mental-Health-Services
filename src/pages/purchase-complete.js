import { Link } from "react-router-dom";
// import { getPurchase } from '../firebase.js';
const PurchaseComplete = () => {
    let receipt = {};
    console.log(receipt)
    return (
        <main>
            <h1>Purchase Complete!</h1>
            <section className="card purchase">
                <h2>Summary</h2>
                <h3>Purchase Order {receipt.order}</h3>
                <p><strong>Date: </strong>{receipt.date.toLocaleDateString('en-CA')}</p>
                <p><strong>Total Cost: </strong>${receipt.totalCost}</p>
                <p><strong>Services:</strong></p>
                <ul>
                    {receipt.services.map((service) => (
                        <li key={receipt.services.indexOf(service)}>
                            <p>{service.name} <strong>Sessions: </strong>{service.amount}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <Link to="/"><button className="lavenderBtn" >Return to Home</button></Link>
        </main>
    )
}

export default PurchaseComplete;