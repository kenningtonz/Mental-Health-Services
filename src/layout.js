import { Outlet, Link, Navigate } from "react-router-dom";
import {cartLength, currentUser } from "./index.js";
import {signUserOut } from "./functions/userAuth.js";
import { loggedIn } from "./index.js";
import logo from './images/logo.png';
import {Button } from 'primereact/button';

const Layout = () => {
    if (!loggedIn.value) {
        return <Navigate replace to='/landing/signin' />
    } else
        return (
            <>
                <header className="mainHeader">
                    <nav>
                        <ul >
                            <li>
                                <Link to="/"><img src={logo} alt="" /> </Link>
                            </li>
                            <li>
                                <Link to="/services"><i className="fa-solid fa-list-ul"></i>Services</Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                <Button type="button" icon="fa-solid fa-cart-shopping" aria-label="Cart"  text /></Link>
                            </li>
                            {/* badge={currentUser.cart.value.length == 0 ? '': currentUser.cart.value.length } */}
                            <li>
                                <Link to="/user"><i className="fa-solid fa-user"></i>User</Link>
                            </li>
                            <li>
                                <Link to="/landing/signin" onClick={signUserOut}><i className="fa-solid fa-right-from-bracket"></i>Sign Out</Link>
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