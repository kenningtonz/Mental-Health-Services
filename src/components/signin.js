import { Link, useNavigate } from "react-router-dom";
import { loggedIn } from '../index.js';

 const SignIn = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/');
    }
    return (
        <>
                <h1>Sign in</h1>
                <form onSubmit={home}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <Link to="/landing/forgotpass">Forgot Password?</Link>
                    <button type="submit"> Sign In</button>
                </form>

                <Link to="/landing/signup">Sign Up</Link>

        </>

    )
}

export default SignIn;