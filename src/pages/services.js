import { Link, useParams, useLocation } from "react-router-dom";
import { images } from '../images/services/index.js';

import { services } from '../functions/service.js';
import { Booking, openBooking } from '../components/booking.js';
import { Filters, resetFilters } from '../components/filters.js';

import { ServicesList } from '../components';

const Services = () => {
    resetFilters();
    return (
        <main className="servicesPage">
            <h1>Services</h1>
            <Filters />

            <section className="servicesList">
                <ServicesList />
            </section>
       
        </main>
    )
}


const Service = () => {
    let backLink = `/services`
    const { hash } = useLocation();
    if (hash == "#cart") {
        backLink = `/cart`
    }
    const { slug } = useParams();
    const service = services.find((service) => service.id == slug);
    const { name, desc, imageName, cost, expect, conditions, id } = service;
    return (
        <main>
            <Link to={backLink}><button className="customButton lavenderBtn">Back</button></Link>
            <section className="servicePage card">
                <img src={images[imageName]} alt={name} />

                <div className="serviceContent">
                    <h1>{name}</h1>
                    <p>{desc}</p>
                    <h2>Helps With:</h2>
                    <ul>
                        {conditions.map((condition) => (
                            <li key={conditions.indexOf(condition)}>{condition}</li>
                        ))}
                    </ul>
                    <h2>What to Expect:</h2>
                    <p>{expect}</p>
                    <p>${cost} per Session</p>
                </div>
                <button className="customButton width-100 greenBtn" value={services.indexOf(service)} onClick={(e) => { openBooking(e); }}>Book Now</button>
            </section>
            <Booking />
        </main>
    )
}

export { Services, Service };