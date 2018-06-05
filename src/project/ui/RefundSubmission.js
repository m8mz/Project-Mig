import React from 'react'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import axios from 'axios'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import formatDate from './TrackerFunctions.js'
import TextField from 'material-ui/TextField'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { InputLabel } from 'material-ui/Input'


var params = {}

class RefundSubmission extends React.Component {

  state = {
    status: this.props.status,
    completed: this.props.completed,
    open: false,
    completion_submitted: false,
    selectedOption: true,
    timestamp: formatDate(Date()),
    refinedTimestamp: "20"+formatDate(Date()).slice(6,8)+"-"+formatDate(Date()).slice(0,2)+"-"+formatDate(Date()).slice(3,5)
  }

  // Dialog open/close functions
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  // Handle completion submission
  handleSubmit = () => {
    //set the timestamp
    const timestamp = formatDate(Date());
    //set the comment
    params.comment = document.getElementById("refundComment").value;
    //set the reason
    params.reasonid = document.getElementById("refundReason").value;
    //set the refund date
    params.rawRefundDate = document.getElementById("refundDate").value;
    params.refundDate = params.rawRefundDate.slice(5,7)+"/"+params.rawRefundDate.slice(8,10)+"/"+params.rawRefundDate.slice(2,4);

    //make the axios call to submit the completion to db
    axios.get(`https://tempeproserve.com/tracker/submit/submit-cancellation.php?migid=${params.proserv_id}&reason=${params.reasonid}&refundDate=${params.refundDate}&brand=${params.provider}&comment=${params.comment}&purchaseDate=${params.added}&agent=${params.user}&domain=${params.domain}&custID=${params.cust_id}&isFlagged=0`)
    .then((res) => {
      console.log(`
          Exit Code: ${res.data.success}
          Response: ${res.data.refund_submission_data}
        `)
      if (res.data.success === 1) {
        this.setState({submissionMessage: "Refund recorded successfully."});
        console.log("Refund recorded successfully.");
      } else {
        this.setState({submissionMessage: "Error: " + res.data.note});
        console.log(`Error: ${res.data.note}`)
      }
    })
    .catch((error) => {
      this.setState({submissionMessage: "Issue recording refund to database.. please report."});
      console.log("Issue recording refund to database.. please report.")
    })
    this.setState({completion_submitted: true});
  }



  componentWillUpdate(nextProps) {
    params = {
      user: this.props.user,
      provider: document.location.host.slice(2).replace(/\.com/, ''),
      service_type: 'websitetransfer',
      action: 'update_status',
      lib: 'general',
      new_status: this.status,
      proserv_id: this.props.id,
      domain: this.props.domain,
      cust_id: this.props.cust_id,
      added: this.props.added,
      cpanel_user: this.props.cpanel_user,
      }
      console.log(JSON.stringify(params));
  }


  render() {

    return (
      <div>
        <Button
          id="completionSubmissionButton"
          variant='raised'
          // eslint-disable-next-line
          onClick={this.handleOpen}
        >
          Track Refund
        </Button>
        {/**Dialog Box**/}
        <Dialog
          open={this.state.open}
          onClose={this.handleClick}
          aria-labelledby="form-dialog-title"
          modal={true}
        >
          <DialogTitle id="form-dialog-title">Process Refund</DialogTitle>
          {(this.state.completion_submitted === false) ?
          <DialogContent>
            <DialogContentText>
              <Typography>1. No work was completed</Typography>
              <Typography>2. Customer is requesting a refund</Typography>
              <Typography>* All exceptions must be confirmed by Manager/Team Lead.</Typography>
            </DialogContentText>
            <FormControl>
              <InputLabel htmlFor="name-error">Refund Reason</InputLabel>
              <Select
                native
                name="name"
                id="refundReason"
              >
                <option value="None">
                  <em><span role="img" aria-label="error">⚠️</span>  - None</em>
                </option>
                <option value="Incompatible">Incompatible</option>
                <option value="Proprietary">Proprietary</option>
                <option value="No Access">No Access</option>
                <option value="Customer Completed">Customer Completed</option>
                <option value="Escalated Refund">Escalated Refund</option>
                <option value="WordPress.com">WordPress.com Disclaimer</option>
                <option value="Purchased on Source">Purchased on Source</option>
                <option value="Extra Purchases">Extra Purchases</option>
                <option value="Missold">Missold/Mispurchased</option>
                <option value="Agent Review">Agent Review</option>
                <option value="Cancelled Account">Cancelled Account</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <br/><br/>
            <TextField
              id="refundDate"
              label="Refund Date"
              type="date"
              defaultValue={this.state.refinedTimestamp}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br/><br/>
            <TextField
              autoFocus
              margin="dense"
              id="refundComment"
              label="Refund Comment"
              type="text"
              fullWidth
            />
          </DialogContent>
          : <Typography id="submission-message">{this.state.submissionMessage}</Typography>}
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {(this.state.completion_submitted === false) ?
                "Cancel"
                :
                "OK"
              }

            </Button>
            {(this.state.completion_submitted === false) ?
              <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
              :
              <Button label="Disabled" disabled={true}>Submitted</Button>
            }
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default RefundSubmission;
