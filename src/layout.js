import { Outlet } from "react-router-dom";
import { Header } from './components';

const Layout = () => {
    // if (!loggedIn.value) {
    //     return <Navigate replace to='/landing/signin' />
    // } else
    return (
        <>
            <Header />
            <main>
                <Outlet />
                <footer>
                    <p>Radiant Realms © {(new Date()).getFullYear()} </p>
                    <p>Images and Content were generated using AI</p>
                </footer>
            </main>
        </>
    )
};

export default Layout;