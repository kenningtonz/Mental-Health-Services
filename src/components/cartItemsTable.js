import { Link } from "react-router-dom";
import { removeFromCart } from "../functions/cart.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import {tempCartItems } from "../functions/cart.js";



const CartItemsTable = ({ showRemove, showLink }) => {

    const nameDataTemplate = (cartItem) => {
        if (showLink) {
            return (<Link to={{ pathname: `/services/${cartItem.id}`, hash: "#cart" }}>
                <h3>{cartItem.name}</h3>
            </Link>)
        } else {
            return (<h3>{cartItem.name}</h3>)
        }
    }
    const costDataTemplate = (cartItem) => {
        return "$" + cartItem.cost;
    }
    const dateDataTemplate = (cartItem) => {
        return cartItem.date.toDate().toDateString() + " at " + cartItem.time;
    }
    const removeDataTemplate = (cartItem) => {
        return <Button onClick={() => { removeFromCart(cartItem.cartItemID); tempCartItems.value = [...tempCartItems.value] }} icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />;
    }

    return (
        <section className="card">
            <DataTable value={tempCartItems.value} >
                <Column body={nameDataTemplate} header="Title" key="cartItemID" align={"left"}></Column>
                <Column header="Date" key="cartItemID" body={dateDataTemplate} align={"left"}></Column>
                <Column header="Cost" key="cartItemID" body={costDataTemplate} align={"left"}></Column>
                {showRemove ? <Column body={removeDataTemplate} header="Remove"></Column> : null}
            </DataTable>
        </section>
    )

}

export default CartItemsTable;

