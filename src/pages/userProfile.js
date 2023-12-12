import { Link, Outlet } from "react-router-dom";
import { getPurchase } from "../firebase";

const UserProfile = () => {
    let purchaseHistory = getPurchase(false);
    console.log(purchaseHistory)
    return (
        <main className="containerCol">
            <h1>User Profile</h1>

            <section className="child">
                <Outlet />


            </section>

            <section className="child">
                <h2>purchase history</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Services(s)</th>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseHistory.map((purchase) => (
                            <tr key={purchaseHistory.indexOf(purchase)}>
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
                                <td>{new Date(purchase.date.seconds * 1000).toLocaleString('en-GB',{timeZone:'UTC'})}</td>
                                <td>${purchase.totalCost[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </main>
    )
}

export default UserProfile;