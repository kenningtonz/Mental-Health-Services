import { currentUser } from "../index.js";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { signal } from "@preact/signals-react";
import { updateUserContact } from "../functions/userAuth.js";

// const UserContact = () => {
//     return (
//         <>
//             <h2>Contact Information</h2>
//             <section className="flex">
//                 <span className="child-50">
//                     <strong >First Name</strong>
//                     <p>{currentUser.value.firstName}</p>
//                 </span>
//                 <span className="child-50">
//                     <strong >Last Name</strong>
//                     <p>{currentUser.value.lastName}</p>
//                 </span>
//                 <span className="child-50">
//                     <strong>Email</strong>
//                     <p >{currentUser.value.email}</p>
//                 </span>
//                 <span className="child-50">
//                     <strong >Phone Number</strong>
//                     {currentUser.value.phone == undefined ? "" : (<p>{currentUser.value.phone}</p>)}
//                 </span>
//             </section>
//         </>
//     )
// }

const isEditing = signal(false);
const UserContactInfo = ({ isEditable, setCheckoutIndex, isCheckout }) => {
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

    let defaultValues = { firstName: currentUser.value.firstName, lastName: currentUser.value.lastName, phone: currentUser.value.phone, email: currentUser.value.email };
    function saveUserInfo(e) {
        e.preventDefault();
        let values = e.target.elements;

        updateUserContact(values.firstName.value, values.lastName.value, values.phone.value);
        setEdit(false);
        if (isCheckout) {
            setCheckoutIndex(1);
        }
    }

    return (
        <>
            <form onSubmit={saveUserInfo} >
                <section className="flex gap-1 wrap">
                    <span className="child-50">
                        <label htmlFor="firstName">First Name</label>
                        <InputText id="firstName" value={defaultValues.firstName} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50">
                        <label htmlFor="lastName">Last Name</label>
                        <InputText id="lastName" value={defaultValues.lastName} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50">
                        <label htmlFor="phone">Phone Number</label>
                        <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" value={defaultValues.phone} required={required} disabled={isDisabled} />
                    </span>
                    <span className="child-50">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" value={defaultValues.email} required={required} disabled />
                    </span>
                </section>

                {isEditing.value && isEditable ?
                    (<span className={`flex justify-end gap-1 pt1`}>
                        {!isCheckout ? <button className=" btn secondary" type="reset" onClick={() => setEdit(false)}>Discard</button> : null}
                        <button className="btn primary " type="submit">{isCheckout ? "Next" : "Save Changes"}</button>
                    </span>) : ""}

            </form>
            {!isEditing.value && isEditable ?
                <span className="flex justify-end pt1" >  <button className="btn primary" type="button" onClick={() => setEdit(true)}>Edit</button></span>
                : ""}


        </>
    )
}

export default UserContactInfo;