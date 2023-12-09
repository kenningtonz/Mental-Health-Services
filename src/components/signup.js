import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';

const SignUp = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/');
    }
    return (
        <>

                <h1>sign up</h1>
                <form onSubmit={home}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                    <input type="submit" value="Submit" />
                </form>

                <Link to="/landing/signin">Sign In</Link>


        </>

    )
}

export default SignUp;