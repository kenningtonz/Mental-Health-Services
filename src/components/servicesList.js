
import { addToCart } from '../functions/cart.js';
import { filteredServices } from '../components/filters.js';
import { images } from '../images/services/index.js';
import { services } from '../functions/service.js';
import { Link } from "react-router-dom";

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


const ServicesList = () => {

    const listTemplate = (services) => {
        return (<ul>
            {services.map((service) => listItem(service))}
        </ul>)
    }


    const listItem = (service) => {
        return (<li className="serviceCard yellowShadow" key={service.id}>
            <Link to={{ pathname: `/services/${service.id}` }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="child-30"
                    preserveAspectRatio="xMidYMax meet"
                    viewBox="0 0 115 130">
                    <defs>
                        <mask id="mask" >
                            <path transform="translate(53 70)" fill="#FFFFFF" d="M50.1,-42.9C60.7,-26.8,61.9,-6.2,56.6,11.1C51.2,28.4,39.2,42.5,23.5,50.9C7.7,59.2,-11.7,62,-26.3,54.9C-41,47.8,-50.7,30.8,-51.3,15.4C-51.9,0,-43.3,-13.8,-33.2,-29.9C-23.1,-45.9,-11.6,-64.1,4.1,-67.4C19.8,-70.7,39.6,-59,50.1,-42.9Z" />
                        </mask>
                    </defs>
                    <image
                        mask="url(#mask)"
                        x="0" y="0" width="100%"
                        href={images[service.imageName]}
                        alt={service.name}
                    />
                </svg>
                <div className=''>
                    <h3>{service.name}</h3>
                    <p className="desc">{service.oneLine}</p>
                    <p className='cost'>${service.cost} per Session</p>
                </div>

            </Link>
        </li>)
    }


    if (filteredServices.value.length == 0) {
        return (<p className="text-center">No services match your filters.</p>)
    }
    else {
        return (<DataView value={filteredServices.value} listTemplate={listTemplate} />)
        return (
            <ul>
                {filteredServices.value.map((service) => (
                    <li className="serviceCard" key={service.id}>
                        <Link to={{ pathname: `/services/${service.id}` }}>
                            <img src={images[service.imageName]} alt={service.name} />
                            <div>
                                <h3>{service.name}</h3>
                                <p className="desc">{service.oneLine}</p>
                                <p>${service.cost} per Session</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>)
    }
}

export default ServicesList;