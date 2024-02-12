import { currentUser } from "../index.js";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { signal } from "@preact/signals-react";
import { updateUserBilling } from "../functions/userAuth.js";


const isEditing = signal(false);
const UserBillingInfo = ({ isEditable, setCheckoutIndex, isCheckout }) => {
    let isDisabled = !isEditing.value;
    if (!isEditable) {
        isDisabled = true;
    }

    let required = false;

    if (isCheckout) {
        setEdit(true);
        required = true;
    }

    function setEdit(value) {
        isEditing.value = value;
    }

    let defaultValues = {
        firstName: currentUser.value.firstName,
        lastName: currentUser.value.lastName,
        street: currentUser.value.address != undefined ? currentUser.value.address.streetAddress : "",
        city: currentUser.value.address != undefined ? currentUser.value.address.city : "",
        province: currentUser.value.address != undefined ? currentUser.value.address.province : "",
        postal: currentUser.value.address != undefined ? currentUser.value.address.postal : "",
        name: currentUser.value.firstName + " " + currentUser.value.lastName,
        card: currentUser.value.payment != undefined ? currentUser.value.payment.card : "",
        cvv: currentUser.value.payment != undefined ? currentUser.value.payment.cvv : "",
        expDate: currentUser.value.payment != undefined ? currentUser.value.payment.expDate : ""
    };

    function saveBillingInfo(e) {
        e.preventDefault();
        let values = e.target.elements;
        updateUserBilling({
            name: values.nameOnCard.value,
            card: values.cardNumber.value,
            expDate: values.expDate.value,
            cvv: values.cvv.value
        }, {
            city: values.city.value ?? "",
            postal: values.postal.value ?? "",
            province: values.province.value ?? "",
            streetAddress: values.street.value ?? ""
        });

        if (isCheckout) {
            setCheckoutIndex(2);
        }

        setEdit(false);
    }

    function discard() {
        if (isCheckout) {
            setCheckoutIndex(0);
        } else {
            setEdit(false);
        }
    }

    return (
        <>
            <form onSubmit={saveBillingInfo} >
                <section className="flex gap-1 wrap">
                    <h2 className="child-100" >Address</h2>
                    <span className="child-100">
                        <label htmlFor="street">Street</label>
                        <InputText id="street" defaultValue={defaultValues.street} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50">
                        <label htmlFor="city">City</label>
                        <InputText id="city" defaultValue={defaultValues.city} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-25">
                        <label htmlFor="province">Province</label>
                        <InputText id="province" defaultValue={defaultValues.province} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-25">
                        <label htmlFor="postal">Postal Code</label>
                        <InputMask id="postal" mask="a9a 9a9" value={defaultValues.postal} required={required} disabled={isDisabled} />
                    </span>
                </section>
                <section className="flex gap-1 wrap mt1">
                    <h2 className="child-100">Payment</h2>
                    <span className="child-100">
                        <label htmlFor="nameOnCard">Name on Card</label>
                        <InputText id="nameOnCard" value={`${currentUser.value.firstName} ${currentUser.value.lastName}`} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-100">
                        <label htmlFor="cardNumber">Card Number</label>
                        <InputMask id="cardNumber" mask="9999-9999-9999-9999" value={defaultValues.card} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50 ">
                        <label htmlFor="expDate">Exp</label>
                        <InputMask id="expDate" mask="99/99" value={defaultValues.expDate} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50">
                        <label htmlFor="cvv">CVV</label>
                        <InputMask id="cvv" mask="999" value={defaultValues.cvv} required={required} disabled={isDisabled} />
                    </span>
                </section>

                {isEditing.value && isEditable ?
                    (<span className={`flex ${isCheckout ? `space-between` : `justify-end`} gap-1 pt1`}>
                        <button className=" btn secondary" type="reset" onClick={discard}>{isCheckout ? "Back" : "Discard"}</button>
                        <button className="btn primary " type="submit">{isCheckout ? "Next" : "Save Changes"}</button>
                    </span>) : ""}
            </form>
            {!isEditing.value && isEditable ?
                <span className="flex justify-end pt1">  <button className="btn primary" type="button" onClick={() => setEdit(true)}>Edit</button></span>
                : ""}
        </>
    )
}

export default UserBillingInfo;