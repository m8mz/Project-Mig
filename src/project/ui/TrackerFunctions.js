import axios from 'axios'

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


export function submitCompletion(){
  // const params = {
  //   user: this.props.user,
  //   provider: document.location.host.slice(2).replace(/\.com/, ''),
  //   service_type: 'websitetransfer',
  //   action: 'update_status',
  //   lib: 'general',
  //   new_status: this.props.status,
  //   proserv_id: this.props.id
  // }
  alert("hello");
  // axios.get(`https://tempeproserve.com/tracker/submit/submit-cancellation.php?migid=${params.proserv_id}&reason=${params.reasonid}&refundDate=${params.timestamp}&brand=${params.brandname}&comment=${params.comment}&purchaseDate=${params.added}&agent=${params.user}&domain=${params.domain}&custID=${params.cust_id}&isFlagged=0`)
  // .then((res) => {
  //   console.log(`
  //       Exit Code: ${res.data.success}
  //       Response: ${res.data.refund_submission_data}
  //     `)
  //   if (res.data.success === 1) {
  //     console.log("Refund recorded.")
  //   } else {
  //     console.log(`Error: ${res.data.note}`)
  //   }
  // })
  // .catch((error) => {
  //   console.log("Issue recording refund to database.. please report.")
  // })
}

export default {formatDate, submitCompletion};
