import { signal } from "@preact/signals-react";
import { reservations } from "../functions/orders";
import { Calendar } from 'primereact/calendar';
import { ListBox } from 'primereact/listbox';
import { Dialog } from 'primereact/dialog';

import { addToCart } from "../functions/cart";
import { services } from "../functions/service";
import { currentUser } from "../index";


const datePicked = signal(new Date());
const timePicked = signal(8);


const bookingService = signal({});
const bookingOpen = signal(false);

export function openBooking(e) {
    bookingService.value = services[e.target.value];
    bookingOpen.value = true;
    console.log(bookingService.value)
}

function closeBooking() {
    bookingOpen.value = false;

}

function getDisabledTimes() {
    let disabledTimes = [];
    let serviceOrders = reservations.filter((order) => order.serviceID == bookingService.value.id);
    for (const order in serviceOrders) {
        let added = false;
        if (disabledTimes.length > 0) {
            for (const date in disabledTimes) {
                if (disabledTimes[date].date.getTime() == serviceOrders[order].date.getTime()) {
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
        if (disabledTimes[date].date == datePicked.value) {
            availableTimes = availableTimes.filter((time) => !disabledTimes[date].time.includes(time));
        }
    }

    for (const time in availableTimes) {
        availableTimes[time] = { label: getTimeFormat(availableTimes[time]), value: availableTimes[time] };
    }
    // timePicked.value = availableTimes[0].value;
    return availableTimes;
}

export function getTimeFormat(time) {
    if (time < 12) {
        return time + " AM"
    } else if (time == 12) {
        return time + " PM"
    }
    else {
        return (time - 12) + " PM"
    }
}

export const Booking = () => {

    function checkTimeConflicts(date, time) {
        let conflict = false;
        if (currentUser.value.cart !== undefined) {
            let cartItems = currentUser.value.cart.cartItems;
            for (const item in cartItems) {
                console.log(cartItems[item].date, date, cartItems[item].time, time)
                if (cartItems[item].date == date && cartItems[item].time == time) {
                    conflict= true;
                }
            }
        }
        if(conflict){
            document.getElementById("notice").innerHTML = "You already have a booking for this time";
        }else{
            addToCart(bookingService.value.id, datePicked.value, timePicked.value, bookingService.value.cost, bookingService.value.name); 
            closeBooking();
        }
    }
    return (
        <Dialog visible={bookingOpen.value} onHide={closeBooking} resizable={false} draggable={false}>
            <div className="datePicker">
                <h2>Booking for {bookingService.value.name}</h2>
                <div>
                    <strong>Choose a Date</strong>
                    <Calendar
                        minDate={new Date()}
                        disabledDays={[0, 6]}
                        disabledDates={getDisabledDates()}
                        inline
                        value={datePicked.value}
                        onChange={value => datePicked.value = value.value}
                    />
                </div>

                <div>
                    <strong>Choose a Time</strong>
                    <ListBox
                        value={timePicked.value}
                        onChange={value => timePicked.value = value.value}
                        options={getAvailableTimes()}
                    />
                </div>
                <p>{bookingService.value.name} on {datePicked.value.toLocaleDateString('en-ca')} at {getTimeFormat(timePicked.value)} for ${bookingService.value.cost}</p>
                <p id="notice"></p>
                <button className="customButton greenBtn" onClick={(e) => { checkTimeConflicts(datePicked.value, timePicked.value) }}>Book</button>

            </div>
        </Dialog>
    );
};

