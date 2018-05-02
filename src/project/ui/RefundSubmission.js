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




class RefundSubmission extends React.Component {


  render() {
    return (
      <div>
        <Button
          id="completionSubmissionButton"
          variant='raised'
        >
          Track Cancellation
        </Button>

      </div>
    )
  }
}

export default RefundSubmission;
