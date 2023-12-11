
import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';
import { changeUser} from '../firebase.js';
import {handleFormChange, getDefault} from "../pages/landingPage.js";

const ForgotPass = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/landing/signin');
    }
    function forgotPass(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const user = { email: email, password: password };
            if (  changeUser(user)) {
                home(event);
            }
            else {
                document.getElementById("notice").innerHTML = "Email does not exist.";
            }
    
    } 

    return (
        <>
            <h1>Forgot Password?</h1>
     
            <form onSubmit={forgotPass}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required onChange={handleFormChange} defaultValue={getDefault(`email`)}/>
                <label htmlFor="password">New Password</label>
                <input type="text" id="password" required/>
                <p id="notice"></p>
                <button type="submit"> Change Password</button>
                <Link to="/landing/signin" className="landingLink">Sign In</Link>
                <Link to="/landing/signup" className="landingLink">Create an Account</Link> 
            </form>

        </>

    )
};

export default ForgotPass;
