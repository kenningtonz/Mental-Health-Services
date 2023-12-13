import { Outlet } from "react-router-dom";
import { getPurchase } from "../firebase";


const UserProfile = () => {
    let purchaseHistory = getPurchase(false);
    return (
        <main className="containerCol">
            <h1>User Profile</h1>

            <section>
                <Outlet />
            </section>

            <section className="card">
                <h2>Purchase History</h2>
                <PurchaseHistory purchaseHistory={purchaseHistory} />
            </section>

        </main>
    )
}

const PurchaseHistory = (props) => {
    if (props.purchaseHistory.length == 0 || props.purchaseHistory == undefined) {
        return (<p className="center">No Purchase History</p>)
    } else {
        return (<table className="purchase">
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Services(s)</th>
                    <th>Date</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                {props.purchaseHistory.map((purchase) => (
                    <tr key={props.purchaseHistory.indexOf(purchase)}>
                        <td>{purchase.order}</td>
                        <td>
                            <ul>
                                {purchase.services.map((service) => (
                                    <li key={purchase.services.indexOf(service)}>
                                        <p>{service.name} <strong># of Sessions: </strong>{service.amount}</p>
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>{purchase.date.seconds != undefined ? new Date(purchase.date.seconds * 1000).toLocaleDateString('en-CA') : purchase.date.toLocaleDateString('en-CA')}</td>
                        <td>${purchase.totalCost}</td>
                    </tr>
                ))}
            </tbody>
        </table>)

    }

}

export default UserProfile;