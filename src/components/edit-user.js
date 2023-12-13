import { editUser, checkUserExists, checkUserPassword } from '../firebase.js';
import { useNavigate } from "react-router-dom";

import { currentUser } from "../index.js";

export const getDefault = (val) => {
    if (currentUser.value[val] === ``) {
        return "";
    } else {
        return currentUser.value[val];
    }
}

const EditUser = () => {
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        let user = { password: event.target.elements.password.value, firstName: event.target.elements.firstName.value, lastName: event.target.elements.lastName.value, address: event.target.elements.address.value, phone: event.target.elements.phone.value, email: event.target.elements.email.value };
        if (user.password != event.target.elements.confirmPassword.value) {
            document.getElementById("notice").innerHTML = "Passwords do not match.";
        } else  {
            if (checkUserPassword(user)){
                document.getElementById("notice").innerHTML = "Password must be different from previous password.";
            }else{
                if (checkUserExists(user)) {
                    document.getElementById("notice").innerHTML = "Email already in use.";
                }
                else {
                    editUser(user);
                    navigate('/user');
                }
            }
        }
    }
    function handleReset(event) {
        event.preventDefault();
        navigate('/user');
        //reset form
    }

    return (
        <section className="card">
            <h2>Edit User</h2>

            <form className="userInfo" onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" id="firstName" defaultValue={getDefault(`firstName`)} />
                </p>
                <p>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" id="lastName" defaultValue={getDefault(`lastName`)} />
                </p>
                <p>
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" defaultValue={getDefault(`address`)} />
                </p>
                <p>
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="tel" id="phone" defaultValue={getDefault(`phone`)} />
                </p>
                <p>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" defaultValue={getDefault(`email`)} />
                </p>
                <p>
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" />
                </p>
                <p>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="text" id="confirmPassword" />
                </p>
                <p id="notice"></p>
                <section>
                    <button className="blueBtn" type="submit"> Save Changes</button>
                    <button className="redBtn" type="reset"> Discard </button>
                </section>

            </form>

        </section>
    )
}

export default EditUser;