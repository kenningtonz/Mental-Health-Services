import { Link } from "react-router-dom";
const PurchaseComplete = () => {
    return (
        <main>
            <h1>PurchaseComplete</h1>
            <section>
                <h2>summary</h2>
                <ul>
                    <li><h3>title</h3>
                        <p>price</p>
                        <p>image</p>
                        <p>description</p>
                        <button>remove</button>
                        <p>quantity</p>
                    </li>
                </ul>
            </section>

            <section>   
            <h2>dates</h2>
            </section>
            <Link to="/">  return to home</Link>
        </main>
    )
}

export default PurchaseComplete;