
import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';

const ForgotPass = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/landing/signin');
    }
    return (
        <>

                <h1>forgot password?</h1>
                <form onSubmit={home}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <label htmlFor="password">New Password</label>
                    <input type="password" id="password" />
                    <input type="submit" value="Submit" />
                </form>

                <Link to="/landing/signin">Sign In</Link>

                <Link to="/landing/signup">Sign Up</Link>
        </>

    )
};

export default ForgotPass;
