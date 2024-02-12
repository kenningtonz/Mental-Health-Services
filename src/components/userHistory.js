import { getOrderHistory } from '../functions/orders';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getTimeFormat } from '../functions/general';


const PurchaseHistory = () => {
    let purchaseHistory = getOrderHistory();


    const costDataTemplate = (item) => {
        return "$" + item.cost;
    }

    const serviceDataTemplate = (item) => {
        return (
            <ul>
                {item.services.map((service) => (
                    <li key={item.services.indexOf(service)}>
                        <p>{service.name} on {service.date} at {getTimeFormat(service.time)}</p>
                    </li>
                ))}
            </ul>
        )
    }


    if (purchaseHistory == undefined || purchaseHistory.length == 0) {
        return (<p className="center">No Purchase History</p>)
    } else {
        return (
            <DataTable value={purchaseHistory} >
                {/* <Column field="order" header="Order Number" key="orderID" align={"left"}></Column> */}
                <Column field="date" header="Date" key="cartItemID" align={"left"}></Column>
                <Column header="Services" key="cartItemID" body={serviceDataTemplate} align={"left"}></Column>
                <Column header="Total Cost" key="cartItemID" body={costDataTemplate} align={"left"}></Column>
            </DataTable>


            //     <table className="purchase">
            //     <thead>
            //         <tr>
            //             <th>Order Number</th>
            //             <th>Services(s)</th>
            //             <th>Date</th>
            //             <th>Total Cost</th>
            //         </tr>
            //     </thead>
            //     <tbody>
            //         {purchaseHistory.map((purchase) => (
            //             <tr key={purchaseHistory.indexOf(purchase)}>
            //                 <td>{purchase.order}</td>
            //                 <td>
            //                     <ul>
            //                         {purchase.services.map((service) => (
            //                             <li key={purchase.services.indexOf(service)}>
            //                                 <p>{service.name} <strong># of Sessions: </strong>{service.amount}</p>
            //                             </li>
            //                         ))}
            //                     </ul>
            //                 </td>
            //                 <td>{purchase.date.seconds != undefined ? new Date(purchase.date.seconds * 1000).toLocaleDateString('en-CA') : purchase.date.toLocaleDateString('en-CA')}</td>
            //                 <td>${purchase.totalCost}</td>
            //             </tr>
            //         ))}
            //     </tbody>
            // </table>)
        )

    }

}
export default PurchaseHistory;