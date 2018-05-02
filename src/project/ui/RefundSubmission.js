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
import Input, { InputLabel } from 'material-ui/Input'


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
      domain_complete: this.props.domain_complete,
      email_complete: this.props.email_complete,
      units_complete: 1,
      isVPS: null,
      isInternal: null,
      completion_comment: null
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
          Track Cancellation
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
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                input={<Input id="name-error" />}
                inputProps={{id: 'age-native-simple'}}
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
              id="name"
              label="Refund Comment"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary">
              Refund
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default RefundSubmission;
