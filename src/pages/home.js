import { ServicesList } from "./services";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import { currentUser } from "../index.js";
import { Timeline } from 'primereact/timeline';
import home1 from '../images/home1.jpg';
import home2 from '../images/home2.jpg';
import home3 from '../images/home3.jpg';

import hero from '../images/heroAlt3.jpg';


const Home = () => {

    return (
        <>
            <section >
                <svg xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMax slice"
                    viewBox="0 0 1440 550">
                    <defs>
                        <mask id="mask" >
                            <path fill="#FFFFFF" d="m0 460 48-21.3c48-21.7 144-63.7 240-37.4 96 26.7 192 122.7 288 122.7 96 0 192-96 288-144 96-48 192-48 288-26.7 96 21.7 192 63.7 240 85.4l48 21.3 0-460-1440 0z" />
                        </mask>
                    </defs>
                    <path transform=" translate(0 300)" fill="#9FB4FF" d="m0 460 48-21.3c48-21.7 144-63.7 240-37.4 96 26.7 192 122.7 288 122.7 96 0 192-96 288-144 96-48 192-48 288-26.7 96 21.7 192 63.7 240 85.4l48 21.3 0-460-1440 0z" />
                    <image
                        mask="url(#mask)"
                        x="0" y="-80" width="100%"
                        href={hero}
                    />
                    <path fill="#FFFFFF" opacity={0.2} d="m0 460 48-21.3c48-21.7 144-63.7 240-37.4 96 26.7 192 122.7 288 122.7 96 0 192-96 288-144 96-48 192-48 288-26.7 96 21.7 192 63.7 240 85.4l48 21.3 0-460-1440 0z" />

                </svg>
                <section className="heroText indigoBG ">
                    <h1>Radiant Realms</h1>
                    <h2>Discover. Heal. Thrive. Radiantly.</h2>
                    <Link to="/services"><button className="btn primary">Book a Session Now</button></Link>
                </section>
                <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 300 1440 230"><path fill="#9FB4FF" fillOpacity="1" d="m0 460 48-21.3c48-21.7 144-63.7 240-37.4 96 26.7 192 122.7 288 122.7 96 0 192-96 288-144 96-48 192-48 288-26.7 96 21.7 192 63.7 240 85.4l48 21.3 0-460-1440 0z"></path></svg>
            </section>


            <section className="flex wrap textCenter gap-1 p1 ">
                {/* <h2 className="child-100">About Radiant Realms</h2> */}
                <article className="child-30 card redBG redShadow ">
                    <h3 className="bold">Our Vision</h3>
                    <p className="">We envision a world where mental wellness is prioritized, and each person is empowered to unlock their true potential.</p>
                </article>
                <article className="child-30 card orangeBG orangeShadow">
                    <h3 className="bold">Our Story</h3>
                    <p className="">We are a community of compassionate therapists dedicated to guiding you on your path to radiant living.</p>
                </article>
                <article className="child-30 card yellowBG yellowShadow">
                    <h3 className="bold">Our Commitment</h3>
                    <p className="">We are committed to being a guiding light on your path to mental wellness.</p>
                </article>

            </section>
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260"><path fill="#A0D6F2" fillOpacity="1" d="M0,224L34.3,208C68.6,192,137,160,206,128C274.3,96,343,64,411,64C480,64,549,96,617,122.7C685.7,149,754,171,823,165.3C891.4,160,960,128,1029,149.3C1097.1,171,1166,245,1234,250.7C1302.9,256,1371,192,1406,160L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
            <section className="blueBG">
                <article className=" flex px1 gap-1 align-center wrap ">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="child-25"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 140 140">
                        <defs>
                            <mask id="mask2" >
                                <path transform="translate(55 55)" fill="#FFFFFF" d="M38.3,-32.8C52.6,-23.9,69.4,-12,74.9,5.5C80.4,23,74.7,46,60.4,61.1C46,76.1,23,83.1,1.9,81.2C-19.2,79.3,-38.4,68.4,-47.5,53.4C-56.6,38.4,-55.6,19.2,-53.3,2.2C-51.1,-14.7,-47.7,-29.5,-38.6,-38.3C-29.5,-47.2,-14.7,-50.1,-1.4,-48.7C12,-47.3,23.9,-41.6,38.3,-32.8Z" />
                            </mask>
                        </defs>
                        <image
                            mask="url(#mask2)"
                            x="0" y="0" width="100%"
                            href={home1}
                        />
                    </svg>
                    <p className="child-75 bold text1-4 ">Mental health is more than the absence of mental illness. It encompasses a state of emotional, psychological, and social well-being.</p>
                </article>
            </section>
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 260"><path fill="#A0D6F2" fillOpacity="1" d="M1440 224 1405.7 208C1371.4 192 1303 160 1234 128 1165.7 96 1097 64 1029 64 960 64 891 96 823 122.7 754.3 149 686 171 617 165.3 548.6 160 480 128 411 149.3 342.9 171 274 245 206 250.7 137.1 256 69 192 34 160L0 128 0 0 34.3 0C68.6 0 137 0 206 0 274.3 0 343 0 411 0 480 0 549 0 617 0 685.7 0 754 0 823 0 891.4 0 960 0 1029 0 1097.1 0 1166 0 1234 0 1302.9 0 1371 0 1406 0L1440 0Z"></path></svg>

            <article className=" flex px1 gap-1 align-center wrap ">
                <p className="child-75 bold text1-4 ">Small changes can have a big impact on mental well-being.</p>

                <svg xmlns="http://www.w3.org/2000/svg"
                    className="child-25"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 140 140">
                    <defs>
                        <mask id="mask2" >
                            <path transform="translate(55 55)" fill="#FFFFFF" d="M38.3,-32.8C52.6,-23.9,69.4,-12,74.9,5.5C80.4,23,74.7,46,60.4,61.1C46,76.1,23,83.1,1.9,81.2C-19.2,79.3,-38.4,68.4,-47.5,53.4C-56.6,38.4,-55.6,19.2,-53.3,2.2C-51.1,-14.7,-47.7,-29.5,-38.6,-38.3C-29.5,-47.2,-14.7,-50.1,-1.4,-48.7C12,-47.3,23.9,-41.6,38.3,-32.8Z" />
                        </mask>
                    </defs>
                    <image
                        mask="url(#mask2)"
                        x="0" y="0" width="100%"
                        href={home2}
                    />
                </svg>
            </article>

            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 260"><path fill="#A0D6F2" fillOpacity="1" d="M0,224L34.3,208C68.6,192,137,160,206,128C274.3,96,343,64,411,64C480,64,549,96,617,122.7C685.7,149,754,171,823,165.3C891.4,160,960,128,1029,149.3C1097.1,171,1166,245,1234,250.7C1302.9,256,1371,192,1406,160L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
            <section className="blueBG">
                <article className=" flex px1 gap-1 align-center wrap ">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="child-25"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 140 140">
                        <defs>
                            <mask id="mask2" >
                                <path transform="translate(55 55)" fill="#FFFFFF" d="M38.3,-32.8C52.6,-23.9,69.4,-12,74.9,5.5C80.4,23,74.7,46,60.4,61.1C46,76.1,23,83.1,1.9,81.2C-19.2,79.3,-38.4,68.4,-47.5,53.4C-56.6,38.4,-55.6,19.2,-53.3,2.2C-51.1,-14.7,-47.7,-29.5,-38.6,-38.3C-29.5,-47.2,-14.7,-50.1,-1.4,-48.7C12,-47.3,23.9,-41.6,38.3,-32.8Z" />
                            </mask>
                        </defs>
                        <image
                            mask="url(#mask2)"
                            x="0" y="0" width="100%"
                            href={home3}
                        />
                    </svg>
                    <p className="child-75 bold text1-4 ">Everyone faces challenges, and seeking help is a sign of strength, not weakness.</p>

                </article>
            </section>
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 260"><path fill="#A0D6F2" fillOpacity="1" d="M1440 224 1405.7 208C1371.4 192 1303 160 1234 128 1165.7 96 1097 64 1029 64 960 64 891 96 823 122.7 754.3 149 686 171 617 165.3 548.6 160 480 128 411 149.3 342.9 171 274 245 206 250.7 137.1 256 69 192 34 160L0 128 0 0 34.3 0C68.6 0 137 0 206 0 274.3 0 343 0 411 0 480 0 549 0 617 0 685.7 0 754 0 823 0 891.4 0 960 0 1029 0 1097.1 0 1166 0 1234 0 1302.9 0 1371 0 1406 0L1440 0Z"></path></svg>

        </>
    )
}

export default Home;

{/* <li><strong>Holistic Approach:</strong> </li>
<li><strong>Tailored Care</strong> Your journey is unique, and so is our approach. Our therapists work collaboratively with you, using evidence-based practices to foster growth and resilience.</li>
<li><strong>Safe and Inclusive Space: </strong> Radiant Realms is a safe haven for everyone. We celebrate diversity and create an inclusive environment where all individuals feel welcomed and supported.</li> */}


{/* <section className=" homeCard">
<h3>.</h3>
<h3></h3>
<h3></h3>
</section> */}