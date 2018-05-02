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
    selectedOption: true
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

    //make the axios call to submit the completion to db
    axios.get(`https://tempeproserve.com/tracker/submit/submit-cancellation.php?migid=${params.proserv_id}&reason=${params.reasonid}&refundDate=${timestamp}&brand=${params.brandname}&comment=${params.comment}&purchaseDate=${params.added}&agent=${params.user}&domain=${params.domain}&custID=${params.cust_id}&isFlagged=0`)
    .then((res) => {
      console.log(`
          Exit Code: ${res.data.success}
          Response: ${res.data.refund_submission_data}
        `)
      if (res.data.success === 1) {
        console.log("Refund recorded.")
      } else {
        console.log(`Error: ${res.data.note}`)
      }
    })
    .catch((error) => {
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
        >
          <DialogTitle id="form-dialog-title">Process Refund</DialogTitle>
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
                <option value="Missold">Missold</option>
                <option value="Agent Review">Agent Review</option>
                <option value="Cancelled Account">Cancelled Account</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="refundComment"
              label="Refund Comment"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Refund
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default RefundSubmission;
