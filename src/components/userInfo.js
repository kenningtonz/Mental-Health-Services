import { Link } from "react-router-dom";
import { currentUser } from "../index.js";
const UserInfo = (props) => {

    return (
        <section className="card userProfile">
            <h2>User Information</h2>
            <p><strong>First Name: </strong>{currentUser.value.firstName}</p>
            <p><strong>Last Name: </strong>{currentUser.value.lastName}</p>
            <p><strong>Address: </strong>{currentUser.value.address}</p>
            <p><strong>Phone Number: </strong>{currentUser.value.phone}</p>
            <p><strong>Email: </strong>{currentUser.value.email}</p>
            {props.canEdit ? <Link to="/user/edit"><button className="blueBtn"> Edit User</button></Link> : ``}
        </section>
    )
}

export default UserInfo;