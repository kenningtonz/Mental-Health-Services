import { Outlet, useNavigate } from "react-router-dom";
import { signal } from "@preact/signals";
import logo from '../images/logo.png';
import { loggedIn } from "../index.js";
import { useEffect } from "react"
import { setUser } from "../firebase.js";

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
    useEffect(() => {
        const localStorageInfo = localStorage.getItem('loggedIn')
        const localStorageID = localStorage.getItem('userID')

        console.log(localStorageID)
        if (localStorageInfo == `1` && localStorageID != ``) {
            loggedIn.value = true
            setUser(localStorageID);
            navigate('/');
        }
    }, [])

    return (
        <>
            <main className='landingPage'>
                <section>
                    <img src={logo} alt="colourfull tree logo" />
                    <h1>Radiant Realms</h1>
                    <p>Discover. Heal. Thrive. Radiantly.</p>
                </section>
                <section>
                    <Outlet />
                </section>
            </main>
            <footer>
                <p>Radiant Realms © 2023</p>
            </footer>
        </>

    )
}

export default LandingPage;