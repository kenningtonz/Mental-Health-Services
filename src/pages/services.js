import { Link, useParams } from "react-router-dom";
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
        let buttons =document.querySelectorAll(".categoryBtns button");
        e.preventDefault();
        console.log(buttons)
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
                            <button className="lavenderBtn" id={Val} key={id} onClick={(e) => {filterService(Val);    setActiveButton(e)}}>{typeLabels[types.indexOf(Val)]}</button>
                        );
                    })
                    }
                </section>
            </section>


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
                    <ServicesList/>
                </section>

        </main>
    )
}

const Service = () => {
    const { slug } = useParams();
    const service = services[slug];
    const { name, desc, imageName, cost, expect, conditions } = service;
    // const navigate = useNavigate();
    return (
        <main>
            <Link to="/services"><button className="lavenderBtn">Back</button></Link>
            <section className="servicePage card">
                <img src={images[imageName]} alt={name} />
            <div>
                <h1>{name}</h1>
                    <p>{desc}</p>
            </div>
                <div className="serviceContent">
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
                    <Link to={`/services/${services.indexOf(service)}`}>
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
    // let cart = getCart();
    console.log(cart)
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
                        <th>Price</th>
                        <th># of Sessions</th>
                        <th>.</th>
                    </tr>
                </thead>
                <tbody>
                    {/* object entires converts both property names and values into array */}
                    {cart.value.map(service => (
                        <tr className="cartRow" key={services.indexOf(service)}>
                            <td>  <Link to={`/services/${services.indexOf(service)}`}>
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