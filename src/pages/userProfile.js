import { Link, Outlet } from "react-router-dom";
import hero from '../images/image2.jpg';

const UserProfile = () => {
    return (
        <main className="containerCol">
            <section className="heroSection">
                <img src={hero} alt="" />
                <div className="heroText">
                <h1>User Profile</h1>
                </div>
            </section>

            <section className="child">
                <Outlet />
            </section>

            <section className="child">
            <PurchaseHistory  purchaseHistory={[]}/>
        
            </section>
        </main>
    )
}

const PurchaseHistory = ({purchaseHistory}) => {
    if (purchaseHistory.length == 0 || purchaseHistory == undefined) {
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
                {purchaseHistory.map((purchase) => (
                    <tr key={purchaseHistory.indexOf(purchase)}>
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