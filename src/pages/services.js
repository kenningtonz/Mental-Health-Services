import { Outlet, Link, useParams } from "react-router-dom";
import image from "../imageholder.png";

const Services = () => {
    return (
        <main className="containerCol ServicesPage">
            <h1>Services</h1>

            <section >
                <h2>Catagories</h2>
                <ul className="containerRow">
                    <li>
                        Category 1
                    </li>
                    <li>
                        Category 2
                    </li>
                    <li>
                        Category 3
                    </li>
                    <li>
                        Category 4
                    </li>
                </ul>
            </section>

            <div className="containerRow">
                <section className="filter child ">
                    <h2>filters</h2>
                    <button>clear all</button>
                    <form className="filterForm containerCol">
                        <label for="priceRange">Price Range:</label>
                        <select id="priceRange" name="priceRange">
                            <option value="">Any</option>
                            <option value="0-50">$0 - $50</option>
                            <option value="51-100">$51 - $100</option>
                            <option value="101-200">$101 - $200</option>
                            <option value="201+">$201+</option>
                        </select>
                        <label for="serviceType">Type of Therapy:</label>
                        <select id="serviceType" name="serviceType">
                            <option value="">Any</option>
                        </select>
                    </form>

                </section>

                <section className="servicesList">
                    <Outlet />
                </section>
            </div>
        </main>
    )
}

const Service = (props) => {
    const { slug } = useParams();
    const service = props.therapies[slug];
    const { title, description } = service;
    // const navigate = useNavigate();
    return (
        <main className="containerCol">
            <Link to="/services">Back</Link>
            <section className="servicePage containerRow">
                <img className="" src={image} alt="" />
                <div className="containerCol serviceContent child">
                    <h1>{title}</h1>
                    <p>description</p>
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

// this will be done better i promise
const ServicesList = (props) => {
    return (
        <ul className="containerRow">
            {/* object entires converts both property names and values into array */}
            {Object.entries(props.therapies).map(([slug, { title }]) => (
                <li className="serviceCard child" key={slug}>
                    <Link to={`/services/${slug}`}>
                        <h3>{title}</h3>

                        <p className="desc">description</p>
                        <p className="cost">Cost</p>
                    </Link>
                    <button>book now</button>
                </li>
            ))}
        </ul>
    );
}

const ServicesListCart = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>date</th>
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                {/* object entires converts both property names and values into array */}
                {Object.entries(props.cart).map(([slug, { title }]) => (
                    <tr className="serviceCard child" key={slug}>
                        <Link to={`/services/${slug}`}>
                            <td><h3>{title}</h3></td>
                        </Link>
                        <td>price</td>
                        <td>date</td>
                        <button>remove from cart</button>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { Services, Service, ServicesList, ServicesListCart };