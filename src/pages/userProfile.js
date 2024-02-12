import { TabMenu } from 'primereact/tabmenu';
import { UserBillingInfo, UserContactInfo, PurchaseHistory } from '../components';
import { signal } from "@preact/signals-react";


const activeIndex = signal(0);
const UserProfile = () => {

    const items = [
        {
            label: 'Contact Info',
            icon: 'pi pi-fw pi-user',
        },
        {
            label: 'Billing Info',
            icon: 'pi pi-fw pi-credit-card',
        },
        {
            label: 'Purchase History',
            icon: 'pi pi-fw pi-shopping-cart',
        }
    ]

    return (
        <>
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280"><path fill="#F9B548" fillOpacity="1" d="M0,224L34.3,208C68.6,192,137,160,206,128C274.3,96,343,64,411,64C480,64,549,96,617,122.7C685.7,149,754,171,823,165.3C891.4,160,960,128,1029,149.3C1097.1,171,1166,245,1234,250.7C1302.9,256,1371,192,1406,160L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
            <section className="orangeBG p1 mt-1 mb-1  ">

                <h1 className='textCenter flex flex-col gap-05 mb2'>     <i className="fa-solid fa-user"></i>User Profile</h1>
                <article className="">
                    <TabMenu model={items} activeIndex={activeIndex.value} onTabChange={(e) => activeIndex.value = e.index} />
                </article>
                <article className=" card bgWhite orangeShadow ">
                    <UserProfileChild activeIndex={activeIndex.value} />
                </article>
            </section>
            <svg preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F9B548" fillOpacity="1" d="M1440 224 1405.7 208C1371.4 192 1303 160 1234 128 1165.7 96 1097 64 1029 64 960 64 891 96 823 122.7 754.3 149 686 171 617 165.3 548.6 160 480 128 411 149.3 342.9 171 274 245 206 250.7 137.1 256 69 192 34 160L0 128 0 0 34.3 0C68.6 0 137 0 206 0 274.3 0 343 0 411 0 480 0 549 0 617 0 685.7 0 754 0 823 0 891.4 0 960 0 1029 0 1097.1 0 1166 0 1234 0 1302.9 0 1371 0 1406 0L1440 0Z"></path></svg>
        </>
    )
}

const UserProfileChild = ({ activeIndex }) => {
    if (activeIndex == 0) {
        return <UserContactInfo isEditable={true} startEditable={false} />
    } else if (activeIndex == 1) {
        return <UserBillingInfo isEditable={true} startEditable={false} />
    } else if (activeIndex == 2) {
        return <PurchaseHistory />
    }
}


export default UserProfile;