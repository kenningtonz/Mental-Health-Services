import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from '../index.js';
import { checkUser } from "../firebase.js";
import { handleFormChange, getDefault } from "../pages/landingPage.js";
import { currentUser } from "../index.js";

const SignIn = () => {
    const navigate = useNavigate();

    function checkLogin(event) {
        event.preventDefault();
        let user = { email: event.target.elements.email.value, password: event.target.elements.password.value};
        if (checkUser(user)) {
            event.preventDefault();
            localStorage.setItem('loggedIn', `1`);
            localStorage.setItem("userID", `${currentUser.value.id}`);
            loggedIn.value = true;
            navigate('/');
        } else {
            document.getElementById("notice").innerHTML = "Incorrect email or password";
        }
    }

    return (
        <>
            <h1>Sign in</h1>

            <form onSubmit={checkLogin}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required onChange={handleFormChange} defaultValue={getDefault(`email`)} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" required onChange={handleFormChange} defaultValue={getDefault(`password`)} />
                <Link to="/landing/forgotpass">Forgot Password?</Link>
                <p id="notice"></p>
                <button className="blueBtn" type="submit"> Sign In</button>
                <Link to="/landing/signup" className="landingLink">Create an Account</Link>
            </form>


        </>

    )
}

export default SignIn;