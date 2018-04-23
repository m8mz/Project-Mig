// this function will print the date in a mm/ff/uu hh:mm am/pm format
export function formatDate(dateVal) {
    let newDate = new Date(dateVal);
    let sMonth = padValue(newDate.getMonth() + 1);
    let sDay = padValue(newDate.getDate());
    let sYear = newDate.getFullYear().toString().substr(-2);
    let sHour = newDate.getHours();
    let sMinute = padValue(newDate.getMinutes());
    let sAMPM = "AM";
    let iHourCheck = parseInt(sHour, 10);
    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }
    return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}
function padValue(value) {
    return (value < 10) ? "0" + value : value;
}

export default formatDate;
