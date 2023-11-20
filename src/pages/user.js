import {Link} from "react-router-dom";
const User = () => {
    return (
        <div>
            <h1>User</h1>
            <Link to="/user/edit">Edit User</Link>
        </div>
    )
}

export default User;