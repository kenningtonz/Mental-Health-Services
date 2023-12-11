import { Link, useParams } from "react-router-dom";
// import { signal  } from "@preact/signals";
import { images } from '../images/services/index.js';
import { services, addToCart,removeFromCart } from '../firebase.js';
import {filteredServices, cart} from '../index.js';



// const name = signal('services');
const Services = () => {
    filteredServices.value = services;
    function filterService(type){ 
        console.log(type)
        filteredServices.value = services.filter((service) => service.type === type); 
        console.log(filteredServices.value)
        console.log(filteredServices)
    }

    console.log(filteredServices.value)
    console.log(filteredServices)
// effect(() =>console.log(filteredServices.value))
    const types = ['bandc', 'holistic', 'humanistic', 'interpersonal', 'physical'];
    return (
        <main className="containerCol ServicesPage">
            <h1>Services</h1>
            <section >
                <h2>Categories</h2>
                <section className="categoryBtns">
                    {types.map((Val, id) => {
                        return (
                            <button key={id} onClick={() => filterService(Val)}>{Val}</button>
                        );
                    })}
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
                   <ServicesList services={filteredServices} />
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
            </section>
            <section className="booking">
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
            </section>

        </main>
    )
}

const ServicesList = (props) => {
    return (
    <ul>
    {/* object entires converts both property names and values into array */}
    {Object.entries(props.services.value).map(([slug, { name, oneline, imageName, cost }]) => (
        <li className="serviceCard" key={slug}>
            <img src={images[imageName]} alt={name} />
            <Link to={`/services/${slug}`}>
                <h3>{name}</h3>
            </Link>
            <p className="desc">{oneline}</p>

            <p className="cost">${cost}</p>
            <button value={slug} onClick={ e=> addToCart(e.target.value)}>Book Now</button>
        </li>
    ))}
</ul>
    )
}

const ServicesListCart = () => {
// let cart = getCart();
console.log(cart)
if(cart == undefined){
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
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                {/* object entires converts both property names and values into array */}
                {Object.entries(cart.value).map(([slug, { name, cost }]) => (
                    <tr className="cartRow" key={slug}>
                    <td>  <Link to={`/services/${slug}`}>
                         <h3>{name}</h3>
                        </Link></td>
                        <td>{cost}</td>
                        <td>date</td>
                        <td> <button value={slug} onClick={ e=> removeFromCart(e.target.value)} >remove from cart</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { Services, Service, ServicesListCart };