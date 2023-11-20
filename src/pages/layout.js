import { Outlet, Link, redirect } from "react-router-dom";
const Layout = () => {

    return (
        <>
            <header>
                <h1>Header</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
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
            <Outlet />
            <footer>
                <p>© 2023</p>
            </footer>
        </>
    )
};

export default Layout;