import { ServicesList } from "./services";
import { Link } from "react-router-dom";

import hero from '../images/hero.jpg';


const Home = () => {
    return (
        <>
            <h1>Radiant Realms</h1>

            <section className="hero">
                <img src={hero} alt="" />

            </section>


            {/* <section className="featuredServices">
                <h2> featured services</h2>
                    <ServicesList />
                    <Link to="/services">view all services</Link>
            </section> */}

            <section className="card">
                <h2>Understanding Mental Health</h2>
                <h3>What is Mental Health?</h3>
                <p><strong>Mental health is more than the absence of mental illness. </strong>It encompasses a state of emotional, psychological, and social well-being. Good mental health enables individuals to handle stress, form meaningful relationships, and make decisions.</p>
                <h3>Seeking Help is a Sign of Strength</h3>
                <p><strong>Everyone faces challenges, and seeking help is a sign of strength, not weakness. </strong> If you or someone you know is experiencing mental health difficulties, reaching out to a mental health professional can make a significant difference.</p>
                <h3>Mental Health and Everyday Life</h3>
                <p><strong>Small changes can have a big impact on mental well-being.</strong>Incorporating activities like regular exercise, maintaining social connections, and practicing mindfulness can contribute to a positive mental health routine.</p>

            </section>

            <section className="card">
                <h2>About Radiant Realms</h2>
                <p>Welcome to Radiant Realms, a sanctuary for mental well-being and personal growth. At Radiant Realms, we believe in the transformative power of inner peace and the journey towards a balanced, resilient mind.</p>
                <article>
                    <h3>Our Vision</h3>
                    <p>Our vision is simple yet profound — to create a space where individuals can explore, heal, and thrive. We envision a world where mental wellness is prioritized, and each person is empowered to unlock their true potential.</p>
                </article>
                <article>
                    <h3>Who We Are</h3>
                    <p>Radiant Realms is more than just a therapy center; we are a community of compassionate therapists dedicated to guiding you on your path to radiant living. Our diverse team brings a wealth of experience and a commitment to providing personalized care that meets your unique needs.</p>
                </article>
                <article>
                    <h3>What Sets Us Apart</h3>
                    <ul>
                        <li><strong>Holistic Approach:</strong> We embrace a holistic approach to mental well-being, recognizing the interconnectedness of mind, body, and spirit.</li>
                        <li><strong>Tailored Care</strong> Your journey is unique, and so is our approach. Our therapists work collaboratively with you, using evidence-based practices to foster growth and resilience.</li>
                        <li><strong>Safe and Inclusive Space: </strong> Radiant Realms is a safe haven for everyone. We celebrate diversity and create an inclusive environment where all individuals feel welcomed and supported.</li>
                    </ul>
                </article>
                <article>
                    <h3>Our Commitment</h3>
                    <p>We are committed to being a guiding light on your path to mental wellness. Whether you're navigating life's challenges, seeking personal growth, or addressing specific issues, Radiant Realms is here for you.</p>
                </article>
            </section>



        </>
    )
}

export default Home;