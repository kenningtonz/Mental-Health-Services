import { signal } from "@preact/signals-react";
import { reservations } from "../functions/orders";
import { Calendar } from 'primereact/calendar';
import { ListBox } from 'primereact/listbox';


import { addToCart } from "../functions/cart";
import { services } from "../functions/service";
import { currentUser } from "../index";
import { getTimeFormat } from "../functions/general";

const datePicked = signal(0);
const timePicked = signal(0);



const bookingService = signal({});
export const bookingOpen = signal(false);

export function openBooking(e) {
    datePicked.value = 0;
    timePicked.value = 0;
    bookingService.value = services[e.target.value];
    bookingOpen.value = true;
    console.log(bookingService.value)
}

export function closeBooking() {
    bookingOpen.value = false;
}

function getDisabledTimes() {
    let disabledTimes = [];
    let serviceOrders = reservations.filter((order) => order.serviceID == bookingService.value.id);
    for (const order in serviceOrders) {
        let added = false;
        if (disabledTimes.length > 0) {
            for (const date in disabledTimes) {
                if (disabledTimes[date].date == serviceOrders[order]) {
                    disabledTimes[date].time.push(serviceOrders[order].time);
                    added = true;
                }
            }
        }
        if (!added) {
            disabledTimes.push({ date: serviceOrders[order].date, time: [serviceOrders[order].time] });
        }
    }
    return disabledTimes;
}

function getDisabledDates() {
    let disabledDates = [];
    let disabledTimes = getDisabledTimes();
    for (const time in disabledTimes) {
        if (disabledTimes[time].time.length == 8) {
            disabledDates.push(disabledTimes[time].date);
        }
        return disabledDates;
    }
}

function getAvailableTimes() {
    let availableTimes = [8, 9, 10, 11, 12, 13, 14, 15];
    let disabledTimes = getDisabledTimes();
    for (const date in disabledTimes) {
        if (disabledTimes[date].date == datePicked.value.toDateString()) {
            availableTimes = availableTimes.filter((time) => !disabledTimes[date].time.includes(time));
        }
    }
    for (const time in availableTimes) {
        availableTimes[time] = { label: getTimeFormat(availableTimes[time]), value: availableTimes[time] };
    }
    return availableTimes;
}



export const Booking = () => {
    function checkTimeConflicts(date, time) {
        let conflict = false;
        if (currentUser.value.cart !== undefined) {
            let cartItems = currentUser.value.cart.cartItems;
            for (const item in cartItems) {
                console.log(cartItems[item].date, date.toDateString(), cartItems[item].time, time)
                if (cartItems[item].date == date.toDateString() && cartItems[item].time == time) {
                    conflict = true;
                }
            }
        }
        if (conflict) {
            document.getElementById("notice").innerHTML = "You already have a booking for this time";
        } else {
            addToCart(bookingService.value.id, datePicked.value, timePicked.value, bookingService.value.cost, bookingService.value.name);
            closeBooking();
        }
    }
    return (
        <div className="datePicker">
            <h2 className="child-100" >Booking for {bookingService.value.name}</h2>
            <section className="flex wrap gap-1 justify-center textCenter">
                <div className="child-50">
                    <h3>Choose a Date</h3>
                    <Calendar
                        minDate={new Date()}
                        disabledDays={[0, 6]}
                        disabledDates={getDisabledDates()}
                        inline
                        value={datePicked.value}
                        onChange={value => { datePicked.value = value.value; timePicked.value = 0; }}
                    />
                </div>
                {datePicked.value != 0 ? (<div className="child-50">
                    <h3>Choose a Time</h3>
                    <ListBox
                        value={timePicked.value}
                        onChange={value => timePicked.value = value.value}
                        options={getAvailableTimes()}
                    />
                </div>
                ) : null}
            </section>

            {datePicked.value != 0 && timePicked.value != 0 ? <h3>{bookingService.value.name} on {datePicked.value.toDateString()} at {getTimeFormat(timePicked.value)} for ${bookingService.value.cost}</h3> : null}
            <p id="notice"></p>
            {datePicked.value != 0 && timePicked.value != 0 ? <button className="btn primary" onClick={(e) => { checkTimeConflicts(datePicked.value, timePicked.value) }}>Book</button> : null}


        </div>

    );
};

