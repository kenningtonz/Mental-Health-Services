import { Outlet, Link, Navigate } from "react-router-dom";
import {signUserOut } from "./functions/userAuth.js";
import { loggedIn } from "./index.js";
import logo from './images/logo.png';
import {Button } from 'primereact/button';

import { cartLength } from "./functions/cart.js";

const Layout = () => {
    if (!loggedIn.value) {
        return <Navigate replace to='/landing/signin' />
    } else
        return (
            <>
                <header className="mainHeader">
                    <nav className="nav">
                        <ul >
                            <li>
                                <Link to="/"><img src={logo} alt="" /> </Link>
                            </li>
                            <li>
                                <Link ariaLabel="services" to="/services"><i className="fa-solid fa-list-ul"></i></Link>
                            </li>
                            <li>
                            <Link ariaLabel="cart"  to="/cart"><i className="fa-solid fa-cart-shopping"></i><i id="cartNotice">{cartLength.value == 0 ? '': cartLength.value}</i></Link>
                            </li>
                            <li>
                                <Link ariaLabel="user" to="/user"><i className="fa-solid fa-user"></i></Link>
                            </li>
                            <li>
                                <Link ariaLabel="sign out" to="/landing/signin" onClick={signUserOut}><i className="fa-solid fa-right-from-bracket"></i></Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="body">

                    <Outlet />

                    <footer>
                        <p>Radiant Realms © {(new Date()).getFullYear()} </p>
                        <p>Images and Content were generated using AI</p>
                    </footer>
                </div>
            </>
        )
};

export default Layout;