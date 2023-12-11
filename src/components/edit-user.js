import { editUser } from '../firebase.js';
import { useNavigate } from "react-router-dom";
import { currentUser } from "../index.js";


const EditUser = () => {
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const address = event.target.elements.address.value;
        const phone = event.target.elements.phone.value;
        const email = event.target.elements.email.value;
        let user = { firstName: firstName, lastName: lastName, address: address, phone: phone, email: email };
        editUser(user);
    }
    function handleReset(event) {
        event.preventDefault();
        navigate('/user');
        //reset form
    }
    const getDefault = (val) => {
        if (currentUser.value[val] === ``) {
            return "";
        } else {
            return currentUser.value[val];
        }
    }
    return (
        <section className="card">
            <h2>Edit User</h2>

            <form className="editUser" onSubmit={handleSubmit} onReset={handleReset}>
                <p>
                    <label htmlFor="first">First Name</label>
                    <input type="text" id="firstName" defaultValue={getDefault(`firstName`)} />
                </p>
                <p>
                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="lastName" defaultValue={getDefault(`lastName`)} />
                </p>
                <p>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" defaultValue={getDefault(`address`)} />
                </p>
                <p>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" defaultValue={getDefault(`phone`)} />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" defaultValue={getDefault(`email`)} />
                </p>
                <section className="editUserButtons">
                    <button type="submit"> Save Changes</button>
                    <button type="reset"> Discard </button>
                </section>

            </form>

        </section>
    )
}

export default EditUser;