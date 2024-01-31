import { ServicesList } from "./services";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import { currentUser } from "../index.js";
import { Timeline } from 'primereact/timeline';

import hero from '../images/hero.jpg';


const Home = () => {

    return (
        <>

            <section className="hero">
                <img src={hero} alt="" />
                <div className="heroText">
                    <h1>Radiant Realms</h1>
                    <h2>Discover. Heal. Thrive. Radiantly.</h2>
                    <Link to="/services"><button className="greenBtn customButton">Book a Session Now</button></Link>
                </div>
            </section>


            <section className=" homeCard">
                <h3>Mental health is more than the absence of mental illness. It encompasses a state of emotional, psychological, and social well-being.</h3>
                <h3>Everyone faces challenges, and seeking help is a sign of strength, not weakness.</h3>
                <h3>Small changes can have a big impact on mental well-being.</h3>
            </section>

            <section className="homeCard">
                <h2>About Radiant Realms</h2>
                <article className="card ">
                    <h3>Our Vision</h3>
                    <p>Our vision is simple yet profound — to create a space where individuals can explore, heal, and thrive. We envision a world where mental wellness is prioritized, and each person is empowered to unlock their true potential.</p>
                </article>
                <article className="card ">
                    <h3>Who We Are</h3>
                    <p>Radiant Realms is more than just a therapy center; we are a community of compassionate therapists dedicated to guiding you on your path to radiant living. Our diverse team brings a wealth of experience and a commitment to providing personalized care that meets your unique needs.</p>
                </article>

                <article className="card ">
                    <h3>Our Commitment</h3>
                    <p>We are committed to being a guiding light on your path to mental wellness. Whether you're navigating life's challenges, seeking personal growth, or addressing specific issues, Radiant Realms is here for you.</p>
                </article>
                <article className="card ">
                    <h3>What Sets Us Apart</h3>
                    <ul>
                        <li><strong>Holistic Approach:</strong> We embrace a holistic approach to mental well-being, recognizing the interconnectedness of mind, body, and spirit.</li>
                        <li><strong>Tailored Care</strong> Your journey is unique, and so is our approach. Our therapists work collaboratively with you, using evidence-based practices to foster growth and resilience.</li>
                        <li><strong>Safe and Inclusive Space: </strong> Radiant Realms is a safe haven for everyone. We celebrate diversity and create an inclusive environment where all individuals feel welcomed and supported.</li>
                    </ul>
                </article>
            </section>



        </>
    )
}

export default Home;