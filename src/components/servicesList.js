
import { addToCart } from '../functions/cart.js';
import { filteredServices } from '../components/filters.js';
import { images } from '../images/services/index.js';
import { services } from '../functions/service.js';
import { Link } from "react-router-dom";

const ServicesList = () => {
    if (filteredServices.value.length == 0) {
        return (<p className="text-center">No services match your filters.</p>)
    }
    else {
        // return (<DataView value={filteredServices.value} listTemplate={listTemplate} />)
        return (
        <ul>
            {filteredServices.value.map((service) => (
                <li className="serviceCard" key={service.id}>
                    <Link to={{ pathname: `/services/${service.id}` }}>
                    <img src={images[service.imageName]} alt={service.name} />
                        <h3>{service.name}</h3>
                  
                    {/* <p>{filtersObject.typeLabels[filtersObject.types.indexOf(service.type)]}</p> */}
                    <p className="desc">{service.oneLine}</p>
                        <p>${service.cost} per Session</p>
                    </Link>
                </li>
            ))}
        </ul>)
    }
}

export default ServicesList;