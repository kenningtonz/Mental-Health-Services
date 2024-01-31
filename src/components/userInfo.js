import { currentUser } from "../index.js";
const UserInfo = ({ showPayment }) => {
    return (
        <section className="card">
            <h2>Contact Information</h2>
            <section className="flex">
                <span className="child-50">
                    <strong >First Name</strong>
                    <p>{currentUser.value.firstName}</p>
                </span>
                <span className="child-50">
                    <strong >Last Name</strong>
                    <p>{currentUser.value.lastName}</p>
                </span>
                <span className="child-50">
                    <strong>Email</strong>
                    <p >{currentUser.value.email}</p>
                </span>
                {currentUser.value.phone == undefined ? "" : (<span className="child-50">
                    <strong >Phone Number</strong><p>{currentUser.value.phone}</p>   </span>)}
            </section>
            {currentUser.value.address != undefined ? (
                <section className="flex">
                    <h2 className="child-100" >Address</h2>
                    <span className="child-100">
                        <strong >Address</strong>
                        <p >{currentUser.value.address.streetAddress}</p>
                        </span>
                        <span className="child-50">
                        <strong>City</strong>
                        <p>{currentUser.value.address.city}</p>
                        </span>
                        <span className="child-25">
                        <strong >Province</strong>
                        <p  >{currentUser.value.address.province}</p>
                        </span>
                        <span className="child-25">
                        <strong  >Postal Code</strong>
                        <p  >{currentUser.value.address.postal}</p>
                        
                    </span>    </section>) : ""}
            {showPayment && currentUser.value.payment != undefined ? (
                <section className="flex">
                    <h2 className="child-100">Payment</h2>
                    <span className="child-50">
                        <strong>Name on Card</strong>
                        <p >{currentUser.value.payment.name}</p>
                    </span>
                    <span className="child-50">
                        <strong>Card Number</strong>
                        <p >{currentUser.value.payment.cardNumber}</p>
                    </span>
                    <span className="child-50">
                        <strong>Exp</strong>
                        <p >{currentUser.value.payment.expDate}</p>
                    </span>
                    <span className="child-50">
                        <strong>CVV</strong>
                        <p >{currentUser.value.payment.cvv}</p>
                    </span>
                </section>) : ""}
        </section>
    )
}

export default UserInfo;