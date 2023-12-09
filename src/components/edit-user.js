const EditUser = () => {
    return (
        <section>
            <h2>edit user</h2>

            <form className="editUser">
                    <label htmlFor="first">First Name</label>
                    <input type="text" id="first" />
                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="last" />
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" />
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" />
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" />

                <section className="editUserButtons">
                    <input type="submit" value="Submit" />
                    <input type="submit" value="Discard" />
                </section>

            </form>
        </section>
    )
}

export default EditUser;