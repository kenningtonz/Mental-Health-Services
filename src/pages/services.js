import { Link, useParams } from "react-router-dom";
import { images } from '../images/services/index.js';
import { services, addToCart, removeFromCart } from '../firebase.js';
import { filteredServices, cart, title } from '../index.js';
import { useEffect } from "react";


let tempServices = [];

function filterService(type) {
    filteredServices.value = services.filter((service) => service.type == type);
    title.value = type;
 
    tempServices = filteredServices.value;
}

const Services = () => {
    {
        useEffect(() => {
            console.log("useeffect")
            filteredServices.value = services;
            tempServices = filteredServices.value;
        }, [tempServices])
    }
    function setActiveButton(e) {
        let buttons =document.querySelectorAll(".categoryBtns button");

        e.preventDefault();
        console.log(buttons)
        buttons.forEach((button) => {
            if (button != e.target) {
                button.className = "";
                console.log(button.className)
            }
        });
        e.target.className = "active";
    }

    const types = ['bandc', 'holistic', 'humanistic', 'interpersonal', 'physical'];
    const typeLabels = ['Behavioral and Cognitive', 'Holistic', 'Humanistic', 'Interpersonal', 'Physical']
    return (
        <main className="containerCol ServicesPage">
            <h1>Services</h1>
            <section >
                <h2>Categories</h2>
                <section className="categoryBtns">
                    {types.map((Val, id) => {
                        return (
                            <button id={Val} key={id} onClick={(e) => {filterService(Val);    setActiveButton(e)}}>{typeLabels[types.indexOf(Val)]}</button>
                        );
                    })
                    }
                </section>
            </section>

            <div className="containerRow">
                {/* <section className="filter child ">
                    <h2>Filters</h2>
                    <button >Clear All</button>
                    <form className="filterForm containerCol">
                        <label for="cost">Price Range:</label>
                        <select id="cost" name="cost" onChange={handleFilterChange}>
                            <option value="">Any</option>
                            <option value="0-50">$0 - $50</option>
                            <option value="51-100">$51 - $100</option>
                            <option value="101-200">$101 - $200</option>
                            <option value="201+">$201+</option>
                        </select>
                        <label for="type">Type of Therapy:</label>
                        <select id="type" name="type" onChange={handleFilterChange} >
                            <option value="">Any</option>
                            <option value="bandc">Behavioral and Cognitive</option>
                            <option value="holistic">Holistic</option>
                            <option value="human">Humanistic</option>
                            <option value="interpersonal">Interpersonal</option>
                            <option value="physical">Physical</option>
                            <option value="psychoanalysis">Psychoanalysis</option>
                        </select>
                    </form>

                </section> */}
                <section className="servicesList">
                    <ServicesList props={tempServices} />
                </section>
            </div>
        </main>
    )
}

const Service = () => {
    const { slug } = useParams();
    const service = services[slug];
    const { name, desc, imageName } = service;
    // const navigate = useNavigate();
    return (
        <main className="containerCol">
            <Link to="/services">Back</Link>
            <section className="servicePage containerRow">
                <img src={images[imageName]} alt={name} />
                <div className="containerCol serviceContent child">
                    <h1>{name}</h1>
                    <p>{desc}</p>
                    <h2>Good For:</h2>
                    <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                    </ul>
                    <p>what to expect</p>
                    <p>Length</p>
                    <p>Cost</p>
                </div>
                <button value={services.indexOf(service)} onClick={e => addToCart(e.target.value)}>Add to Cart</button>

            </section>
            {/* <section className="booking">
                <h2>booking</h2>
                <form>
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" id="date" />
                    <label htmlFor="time">Time</label>
                    <input type="time" name="time" id="time" />
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" id="quantity" />
                    <button>book now</button>
                </form>
            </section> */}

        </main>
    )
}

const ServicesList = (props) => {
    // console.log(props.services)

    // console.log(filteredServices.value)
    // {useEffect(() => {
    //     {/* console.log() */}
    //     filteredServices.value = [...filteredServices.value]
    // }, filteredServices.value)}

    return (
        <ul>
            {/* object entires converts both property names and values into array */}
            {filteredServices.value.map((service) => (
                <li className="serviceCard" key={services.indexOf(service)}>
                    <img src={images[service.imageName]} alt={service.name} />
                    <Link to={`/services/${services.indexOf(service)}`}>
                        <h3>{service.name}</h3>
                    </Link>
                    <p>{title.value}</p>
                    <p className="desc">{service.oneline}</p>
                    <p className="cost">${service.cost}</p>
                    <button value={services.indexOf(service)} onClick={e => addToCart(e.target.value)}>Add to Cart</button>
                </li>
            ))}
        </ul>
    )
}

const ServicesListCart = () => {
    // let cart = getCart();
    console.log(cart)
    if (cart == undefined) {
        return (
            <p>Cart is empty</p>
        )
    }
    else
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>amount</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody>
                    {/* object entires converts both property names and values into array */}
                    {cart.value.map(service => (
                        <tr className="cartRow" key={services.indexOf(service)}>
                            <td>  <Link to={`/services/${services.indexOf(service)}`}>
                                <h3>{service.name}</h3>
                            </Link></td>
                            <td>{service.cost}</td>
                            <td>{service.amount}</td>
                            <td>date</td>
                            <td> <button value={services.indexOf(service)} onClick={e => { removeFromCart(e.target.value); cart.value = [...cart.value] }} >remove from cart</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
}



export { Services, Service, ServicesListCart };