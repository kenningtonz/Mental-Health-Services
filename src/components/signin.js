import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from '../index.js';
// import { checkUser } from "../firebase.js";
import {handleFormChange, getDefault} from "../pages/landingPage.js";
import { signIn } from "../functions/userAuth.js";

const SignIn = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        navigate('/');
    }

    // const users = props.users;
    function checkLogin(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        let user = { email: email, password: password };
        const  getMessage = async (user) => {
            let message = await signIn(user);
            console.log(message);
            if (message.error) {
                document.getElementById("notice").innerHTML = message.message;
            }
            else {
                home(event);
            }
        }
        getMessage(user);
    }

    return (
        <>
            <h1>Sign in</h1>

            <form onSubmit={checkLogin}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required onChange={handleFormChange} defaultValue={getDefault(`email`)}/>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" required onChange={handleFormChange} defaultValue={getDefault(`password`)} />
                <Link to="/landing/forgotpass">Forgot Password?</Link>
          <p id="notice"></p>
                <button type="submit"> Sign In</button>
          <Link to="/landing/signup" className="landingLink">Create an Account</Link>
            </form>


        </>

    )
}

export default SignIn;