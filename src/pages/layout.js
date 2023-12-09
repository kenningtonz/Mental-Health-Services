import { Outlet, Link, Navigate } from "react-router-dom";
import { loggedIn } from "../index.js";

const Layout = () => {
    if (!loggedIn.value) {
        return <Navigate replace to='/landing/signin' />
    } else
        return (
            <>
                <header>
                    <nav>
                        <ul >
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/services">Services</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart</Link>
                            </li>
                            <li>
                                <Link to="/user">User</Link>
                            </li>
                            <li>
                                <Link to="/login">login</Link>
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