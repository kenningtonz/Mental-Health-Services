import { Link, useParams, useLocation } from "react-router-dom";
import { images } from '../images/services/index.js';
import { services, addToCart, removeFromCart } from '../firebase.js';
import { filteredServices, cart } from '../index.js';
// import { useEffect } from "react";


// let tempServices = [];

function filterService(type) {
    filteredServices.value = services.filter((service) => service.type == type);
}
const types = ['bandc', 'holistic', 'humanistic', 'interpersonal', 'physical'];
const typeLabels = ['Behavioral and Cognitive', 'Holistic', 'Humanistic', 'Interpersonal', 'Physical']
const Services = () => {
    // {
    //     useEffect(() => {
    //         console.log("useeffect")
    //        
    //         tempServices = filteredServices.value;
    //     }, [tempServices])
    // }
    filteredServices.value = services;
    function setActiveButton(e) {
        let buttons = document.querySelectorAll(".categoryBtns button");
        e.preventDefault();
        buttons.forEach((button) => {
            if (button !== e.target) {
                button.className = "lavenderBtn";
            }
        });
        e.target.className = "active lavenderBtn";
    }

    return (
        <main className="ServicesPage">
            <h1>Services</h1>
            <section >
                {/* <h2>Categories</h2> */}
                <section className="categoryBtns">
                    {types.map((Val, id) => {
                        return (
                            <button className="lavenderBtn" id={Val} key={id} onClick={(e) => { filterService(Val); setActiveButton(e) }}>{typeLabels[types.indexOf(Val)]}</button>
                        );
                    })
                    }
                </section>
            </section>

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
    const service = services[slug];
    const { name, desc, imageName, cost, expect, conditions } = service;
    return (
        <main>
            <Link to={backLink}><button className="lavenderBtn">Back</button></Link>
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
                <button className="greenBtn" value={services.indexOf(service)} onClick={e => addToCart(e.target.value)}>Add to Cart</button>
            </section>
        </main>
    )
}

const ServicesList = () => {
    return (
        <ul>
            {/* object entires converts both property names and values into array */}
            {filteredServices.value.map((service) => (
                <li className="serviceCard" key={services.indexOf(service)}>
                    <img src={images[service.imageName]} alt={service.name} />
                    <Link to={{ pathname: `/services/${services.indexOf(service)}`}}>
                        <h3>{service.name}</h3>
                    </Link>
                    <p>{typeLabels[types.indexOf(service.type)]}</p>
                    <p className="desc">{service.oneline}</p>
                    <div>
                        <p>${service.cost} per Session</p>
                        <button className="greenBtn" value={services.indexOf(service)} onClick={e => addToCart(e.target.value)}>Add to Cart</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

const ServicesListCart = () => {
    if (cart === undefined) {
        return (
            <p>Cart is empty</p>
        )
    }
    else
        return (
            <table className="cart">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Cost Per Session</th>
                        <th># of Sessions</th>
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {/* object entires converts both property names and values into array */}
                    {cart.value.map(service => (
                        <tr className="cartRow" key={services.indexOf(service)}>
                            <td>  <Link to={{ pathname: `/services/${services.indexOf(service)}`, hash: "#cart" }}>
                                <h3>{service.name}</h3>
                            </Link></td>
                            <td>${service.cost}</td>
                            <td>{service.amount}</td>
                            <td> <button className="redBtn" value={services.indexOf(service)} onClick={e => { removeFromCart(e.target.value); cart.value = [...cart.value] }} >Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
}



export { Services, Service, ServicesListCart };