import { Outlet } from "react-router-dom";
import image from "../imageholder.png";
const LandingPage = () => {
    return (
        <>
            <main className='landingPage'>
                <section className="landingPageInfo child">
                    <img src={image} alt="" />
                    <h1>our company</h1>
                    <p>some text</p>
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