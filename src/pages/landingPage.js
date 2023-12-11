import { Outlet, useNavigate } from "react-router-dom";
import image from "../imageholder.png";
import { signal } from "@preact/signals";
import logo from '../images/logo.png';
import { loggedIn } from "../index.js";
import { useEffect } from "react"

export const signInFormData = signal([]);

export const handleFormChange = (event) => {
    const target = event.target;
    signInFormData.value[target.id] = target.value;
}
export const getDefault = (val) => {
    if (signInFormData.value[val] == ``) {
        return "";
    } else {
        return signInFormData.value[val];
    }
}

const LandingPage = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     const localStorageInfo = localStorage.getItem('loggedIn')
    //     console.log(localStorageInfo)
    //     if (localStorageInfo == `1`) {
    //         loggedIn.value = true
    //         navigate('/');
    //     }
    // }, [])

    return (
        <>
            <main className='landingPage'>
                <section className="landingPageInfo child">
                    <img src={logo} alt="" />
                    <h1>Radiant Realms</h1>
                    <p>Discover. Heal. Thrive. Radiantly.</p>
                </section>
                <section className="landingPageSign child">
                    <Outlet />
                </section>
            </main>
            <footer>
                <p>© 2023</p>
            </footer>
        </>

    )
}

export default LandingPage;