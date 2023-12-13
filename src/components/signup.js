import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';
import { addUser, checkUserExists } from '../firebase.js';
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
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const f = event.target.elements.firstname.value;
        const l = event.target.elements.lastname.value;
        let user = { email: email, password: password, firstname: f, lastname: l };
        if (checkUserExists(user)) {
            document.getElementById("notice").innerHTML = "Email already in use.";
        } else {
            addUser(user);
            home(event);
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
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" required onChange={handleFormChange} />
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" required onChange={handleFormChange} />
                <p id="notice"></p>
                <button className="blueBtn" type="submit"> Create an Account</button>
                <Link to="/landing/signin" className="landingLink">Sign In</Link>
            </form>
        </>
    )
}

export default SignUp;