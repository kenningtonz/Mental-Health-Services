import { Link, useParams, useLocation } from "react-router-dom";
import { images } from '../images/services/index.js';
import { Dialog } from 'primereact/dialog';
import { services } from '../functions/service.js';
import { Booking, openBooking, closeBooking, bookingOpen } from '../components/booking.js';

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
            <Link to={backLink}><button className="customButton redBtn" style={{marginTop:1+'rem', marginLeft:1+ 'rem' }}>Back</button></Link>
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
            <Dialog visible={bookingOpen.value} onHide={closeBooking} resizable={false} draggable={false}>
            <Booking />
            </Dialog>
        </main>
    )
}

export default Service;