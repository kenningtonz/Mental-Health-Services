
import { currentUser } from "../index.js";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { updateUserInfo } from "../functions/userAuth.js";

const UserInfoForm = ({ extraFunction }) => {
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
        extraFunction();
    }

    return (<section className="card">
        <h2>User Info</h2>
        <form onSubmit={saveUserInfo} >
            <section className="flex">
                <span className="p-float-label child-50">
                    <InputText id="firstName" value={currentUser.value.firstName} required />
                    <label htmlFor="firstName">First Name</label>
                </span>
                <span className="p-float-label child-50">
                    <InputText id="lastName" value={currentUser.value.lastName} required />
                    <label htmlFor="lastName">Last Name</label>
                </span>
                <span className="p-float-label child-50">
                    <InputMask id="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" required />
                    <label htmlFor="phone">Phone Number</label>
                </span>
                <span className="p-float-label child-50">
                    <InputText id="email" value={currentUser.value.email} disabled required />
                    <label htmlFor="email">Email</label>
                </span>
                <span className="p-float-label child-100">
                    <InputText id="streetAddress" required />
                    <label htmlFor="streetAddress">Street</label>
                </span>
                <span className="p-float-label child-50">
                    <InputText id="cityAddress" required />
                    <label htmlFor="cityAddress">City</label>
                </span>
                <span className="p-float-label child-25">
                    <InputText id="provinceAddress" required />
                    <label htmlFor="provinceAddress">Province</label>
                </span>
                <span className="p-float-label child-25">
                    <InputMask id="postalAddress" mask="a9a 9a9" required />
                    <label htmlFor="postalAddress">Postal Code</label>
                </span>
            </section>
            <button className=" width-100 customButton blueBtn" type="submit">Save Contact</button>
        </form>
    </section>)
}

export default UserInfoForm;