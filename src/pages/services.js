import { Outlet, Link, useParams } from "react-router-dom";

const Services = () => {
    return (
        <>
            <h1>Services</h1>
            <section>
                <h2>Catagories</h2>
                <ul className="flex-parent">
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
            <section>
                <Outlet></Outlet>
            </section>
        </>
    )
}

const Service = (props) => {
    const { slug } = useParams();
    const service = props.therapies[slug];
    const { title, description } = service;

    return (
        <div>
            <h1>{title}</h1>
            <img src="https://source.unsplash.com/random/400x200" alt="" />
            <p>{description}</p>
            <h2>Good For:</h2>
            <ul>
                <li>item 1</li>
                <li>item 2</li>
            </ul>
            <p>what to expect</p>
            <p>Length</p>
            <p>Cost</p>
        </div>
    )
}

const ServicesList = (props) => {
    return (
        <ul className="flex-parent">
            {Object.entries(props.therapies).map(([slug, { title }]) => (
                <li key={slug}>
                    <Link to={`/services/${slug}`}>
                        <h3>{title}</h3>
                        <p>description</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}


export { Services, Service, ServicesList };