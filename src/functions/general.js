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