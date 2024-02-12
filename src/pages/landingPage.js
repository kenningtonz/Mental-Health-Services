import { Outlet, useNavigate, Navigate } from "react-router-dom";

import { signal } from "@preact/signals";
import logo from '../images/logo.png';
import { loggedIn } from "../index.js";
import { useEffect } from "react"
import { checkIsSignedIn } from "../functions/userAuth.js";

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
        if (loggedIn.value) {
            navigate('/');
        }
    }, [])
    return (
        <section className='landingPage flex wrap p1 blueShadow'>
            <div className=" textCenter">
                <img src={logo} alt="" />
                <h1>Radiant Realms</h1>
                <p>Discover. Heal. Thrive. Radiantly.</p>
            </div>
            <div className="">
                <Outlet />
            </div>
        </section>
    )
}

export default LandingPage;