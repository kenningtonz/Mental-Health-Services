import { Link, Outlet } from "react-router-dom";

const UserProfile = () => {
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
                        <th>Product</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>12345</td>
                        <td><h3>title</h3>  <p>description</p></td>
                        <td>date</td>
                        <td>$50.00</td>
                    </tr>

                </tbody>
                </table>
         
            </section>

        </main>
    )
}

export default UserProfile;