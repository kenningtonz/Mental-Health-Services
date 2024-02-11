import { signUserOut } from "../functions/userAuth.js";
import { loggedIn } from "../index.js";
import logo from '../images/logoNoWords.png';
import { cartLength } from "../functions/cart.js";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className="mainHeader">
            <nav className="nav">
                <ul >
                    <li>
                        <Link to="/"><img src={logo} alt="logo" /> </Link>
                    </li>
                    <li>
                        <Link className="orange" to="/services" ariaLabel="Services"><i className="fa-solid fa-list-ul"></i></Link>
                    </li>
                    {loggedIn.value ? (<>
                        <li>
                            <Link className="pink" to="/cart" ariaLabel="Cart"><i className="fa-solid fa-cart-shopping"></i><i id="cartNotice">{cartLength.value == 0 ? '' : cartLength.value}</i></Link>
                        </li>
                        <li>
                            <Link className="yellow" to="/user" ariaLabel="Profile" ><i className=" fa-solid fa-user"></i></Link>
                        </li>
                        <li>
                            <Link className="blue" to="/landing/signin" ariaLabel="Sign Out" onClick={signUserOut}><i className="fa-solid fa-right-from-bracket"></i></Link>
                        </li>
                    </>
                    ) :
                        <li>
                            <Link ariaLabel="sign in" to="/landing/signin" className="blue" ><i className="fa-solid fa-right-to-bracket"></i></Link>
                        </li>
                    }
                </ul>
            </nav>
        </header >
    )
}

export default Header;