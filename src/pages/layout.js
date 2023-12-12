import { Outlet, Link, Navigate } from "react-router-dom";
import { currentUser, loggedIn } from "../index.js";
import logo from '../images/logo.png';

const Layout = () => {
    function getCartNotice(){
if(currentUser == undefined){
    return '';
}
else{
    return currentUser.value.cart.length;
}
    }
    function signOut() {
        loggedIn.value = false;
        localStorage.setItem('isLoggedIn', '0')
    }
    if (!loggedIn.value) {
        return <Navigate replace to='/landing/signin' />
    } else
        return (
            <>
                <header>
                    <nav>
                        <ul >
                            <li>
                                <Link to="/"><img src={logo} alt="" /> </Link>
                            </li>
                            <li>
                                <Link to="/services"><i className="fa-solid fa-list-ul"></i>Services</Link>
                            </li>
                            <li>
                                <Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>Cart<i id="cartNotice">{}</i></Link>
                            </li>
                            <li>
                                <Link to="/user"><i className="fa-solid fa-user"></i>User</Link>
                            </li>
                            <li>
                                <Link to="/landing/signin" onClick={signOut}><i className="fa-solid fa-right-from-bracket"></i>Sign Out</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="body">
            
                        <Outlet />
                 
                    <footer>
                        <p>© 2023</p>
                    </footer>
                </div>
            </>
        )
};

export default Layout;