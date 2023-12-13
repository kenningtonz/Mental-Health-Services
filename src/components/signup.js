import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';
import { addUser, checkUserExists, setUser } from '../firebase.js';
import { handleFormChange, getDefault } from "../pages/landingPage.js";

const SignUp = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/');
    }
    function signUp(event) {
        event.preventDefault();
        let user = { email: event.target.elements.email.value, password: event.target.elements.password.value, firstName: event.target.elements.firstName.value, lastName: event.target.elements.lastName.value, address: event.target.elements.address.value, phone: event.target.elements.phone.value };
        if (checkUserExists(user)) {
            document.getElementById("notice").innerHTML = "Email already in use.";
        } else {
            let id = addUser(user);
            setTimeout(() =>{
                home(event);
                setUser(id);}
                , 500);
                    }
    }

    return (
        <>
            <h1>Create an Account</h1>
            <form onSubmit={signUp}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required onChange={handleFormChange} defaultValue={getDefault(`email`)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={handleFormChange} defaultValue={getDefault(`password`)} />
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required onChange={handleFormChange} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" required onChange={handleFormChange} />
                <label htmlFor="address">Address</label>
                <input type="text" id="address" required onChange={handleFormChange} />
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" required onChange={handleFormChange} />
                <p id="notice"></p>
                <button className="blueBtn" type="submit"> Create an Account</button>
                <Link to="/landing/signin" className="landingLink">Sign In</Link>
            </form>
        </>
    )
}

export default SignUp;