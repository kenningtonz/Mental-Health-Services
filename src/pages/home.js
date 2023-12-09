import { ServicesList } from "./services";
import {Link} from "react-router-dom";
import { therapies } from "../index.js";
const Home = () => {
    return (
        <>
            <h1>Home</h1>

            <div className="hero">
                hero picture
            </div>

            <section className="featuredServices">
                <h2> featured services</h2>
                    <ServicesList therapies={therapies}/>
                    <Link to="/services">view all services</Link>
            </section>

            <section className="about">
                <h2>mental health info</h2>
                <p>text</p>
            </section>

            <section className="about">
                <h2>about</h2>
                <p>text</p>
            </section>



        </>
    )
}

export default Home;