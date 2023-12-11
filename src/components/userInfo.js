import { Link } from "react-router-dom";
import { currentUser } from "../index.js";
const UserInfo = () => {

    return (
        <section className="card">
            <h2>User Information</h2>

            <p>First Name: {currentUser.value.firstName}</p>
            <p>Last Name: {currentUser.value.lastName}</p>
            <p>Address: {currentUser.value.address}</p>
            <p>Phone Number: {currentUser.value.phone}</p>
            <p>Email: {currentUser.value.email}</p>
            <Link to="/user/edit">Edit User</Link>
        </section>
    )
}

export default UserInfo;