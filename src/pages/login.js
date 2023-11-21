import { useNavigate } from "react-router-dom";
import {loggedIn} from '../index.js';

const Login = () => {
    const navigate = useNavigate();
    function home(event){
        event.preventDefault();
        loggedIn.value = true;
        console.log(loggedIn.value);
        navigate('/');
    }
    return (
        <>
        <div>

        <h1>login</h1>
        <form onSubmit={home}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <input type="submit" value="Submit" />
        </form>

        </div>
            <footer>
                <p>© 2023</p>
            </footer>
        </>
        
    )
}

export default Login;