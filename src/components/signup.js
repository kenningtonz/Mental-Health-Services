import { useNavigate, Link } from "react-router-dom";
import { loggedIn } from '../index.js';
// import { addUser, checkUserExists } from '../firebase.js';
import { handleFormChange, getDefault } from "../pages/landingPage.js";
import { isSignedIn, signUp } from "../functions/userAuth.js";
// import {InputMask} from 'react-input-mask';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';



function sign(user) {

}

const SignUp = () => {
    const navigate = useNavigate();
    function home(event) {
        event.preventDefault();
        // loggedIn.value = true;
        // console.log(loggedIn.value);
        navigate('/');
    }

    function signUpUser(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const f = event.target.elements.firstname.value;
        const l = event.target.elements.lastname.value;
        let user = { email: email, password: password, firstName: f, lastName: l };
        // let message = await 

        const  getMessage = async (user) => {
            let message = await signUp(user);
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
            <h1>Create an Account</h1>
            <form onSubmit={signUpUser}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" required onChange={handleFormChange} defaultValue={getDefault(`email`)} />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" required onChange={handleFormChange} defaultValue={getDefault(`password`)} />
                <label htmlFor="firstname">First Name</label>
                {/* <InputText type="text" id="firstname" value={value} onChange={handleFormChange} required/> */}
                <input type="text" id="firstname" required onChange={handleFormChange} />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" required onChange={handleFormChange} />
                <p id="notice"></p>
                <button type="submit"> Create an Account</button>
                <Link to="/landing/signin" className="landingLink">Sign In</Link>
            </form>
        </>
    )
}

export default SignUp;