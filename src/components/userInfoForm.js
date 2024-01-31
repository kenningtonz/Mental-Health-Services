
import { currentUser } from "../index.js";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { updateUserInfo } from "../functions/userAuth.js";

const UserInfoForm = ({ extraFunction }) => {
    let defaultValues = { firstName: currentUser.value.firstName, lastName: currentUser.value.lastName,  
        streetAddress : currentUser.value.address != undefined ? currentUser.value.address.street : "",
        cityAddress : currentUser.value.address != undefined ? currentUser.value.address.city : "",
        provinceAddress : currentUser.value.address != undefined ? currentUser.value.address.province : "",
        postalAddress : currentUser.value.address != undefined ? currentUser.value.address.postal : "",
        phone: currentUser.value.phone, email: currentUser.value.email };


    function saveUserInfo(event) {
        event.preventDefault();
        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const streetAddress = event.target.elements.streetAddress.value;
        const cityAddress = event.target.elements.cityAddress.value;
        const provinceAddress = event.target.elements.provinceAddress.value;
        const postalAddress = event.target.elements.postalAddress.value;
        const phone = event.target.elements.phone.value;
        const email = event.target.elements.email.value;
        let user = { firstName: firstName, lastName: lastName, address: { street: streetAddress, city: cityAddress, province: provinceAddress, postal: postalAddress }, phone: phone, email: email };
        updateUserInfo(user);
        extraFunction(1);
    }

    return (<section className="card">
        <h2>User Info</h2>
        <form onSubmit={saveUserInfo} >
            <section className="flex">
                <span className="child-50">
                    <label htmlFor="firstName">First Name</label>
                    <InputText id="firstName" value={defaultValues.firstName} required />
                </span>
                <span className="child-50">
                    <label htmlFor="lastName">Last Name</label>
                    <InputText id="lastName" value={defaultValues.lastName} required />
                </span>
                <span className="child-50">
                    <label htmlFor="phone">Phone Number</label>
                    <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" value={defaultValues.phone} required />
                </span>
                <span className="child-50">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={defaultValues.email} disabled />
                </span>
                <span className="child-100">
                    <label htmlFor="streetAddress">Street</label>
                    <input id="streetAddress" defaultValue={defaultValues.streetAddress} required />
                </span>
                <span className="child-50">
                    <label htmlFor="cityAddress">City</label>
                    <input id="cityAddress" defaultValue={defaultValues.cityAddress} required />
                </span>
                <span className="child-25">
                    <label htmlFor="provinceAddress">Province</label>
                    <input id="provinceAddress" defaultValue={defaultValues.provinceAddress} required />
                </span>
                <span className="child-25">
                    <label htmlFor="postalAddress">Postal Code</label>
                    <InputMask id="postalAddress" mask="a9a 9a9" value={defaultValues.postalAddress} required />
                </span>
            </section>
            <button className=" width-100 customButton blueBtn" type="submit">Save User Info</button>
        </form>
    </section>)
}

export default UserInfoForm;