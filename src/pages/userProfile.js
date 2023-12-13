import { Outlet } from "react-router-dom";
import { getPurchase } from "../firebase";

const UserProfile = () => {
    let purchaseHistory = getPurchase(false);
    console.log(purchaseHistory)
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
    if (props.purchaseHistory.length == 0) {
        return (<p>No Purchase History</p>)
    } else {
        return (<table>
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Services(s)</th>
                    <th>Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.purchaseHistory.map((purchase) => (
                    <tr key={props.purchaseHistory.indexOf(purchase)}>
                        <td>{purchase.orderNumber}</td>
                        <td>
                            <ul>
                                {purchase.services.map((service) => (
                                    <li key={purchase.services.indexOf(service)}>
                                        <p>{service.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>{new Date(purchase.date.seconds * 1000).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
                        <td>${purchase.totalCost[1]}</td>
                    </tr>
                ))}
            </tbody>
        </table>)

    }

}

export default UserProfile;