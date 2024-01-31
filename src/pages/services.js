
import { Filters, resetFilters } from '../components/filters.js';
import { ServicesList } from '../components';
import hero from '../images/image1.jpg';

const Services = () => {
    resetFilters();
    return (
        <main className="servicesPage">
          <section className="heroSection">
                <img src={hero} alt="" />
                <div className="heroText">
                    <h1>Services</h1>
                </div>
            </section>
            <Filters />
            <section className="servicesList">
                <ServicesList />
            </section>
        </main>
    )
}



export default Services;