import { Outlet, Link } from "react-router-dom";
const Services = () => {
    return (
        <div>
<h1>Services</h1>
            <ul>
                <li> <Link to="/services/service">Service</Link></li>
                <Outlet></Outlet>
            </ul>

        </div>
    )
}

export default Services;