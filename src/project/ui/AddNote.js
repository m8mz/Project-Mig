import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import Tooltip from 'material-ui/Tooltip'
import AddIcon from 'material-ui-icons/Add'
import { withStyles } from 'material-ui/styles'
import green from 'material-ui/colors/green';
import Radio from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	group: {
		display: "block"
	}
})

class FormDialog extends React.Component {
  state = {
    open: false,
	 selectedValue: 'general'
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = (event, value) => {
	  console.log(event)
    this.setState({ open: false })
  }

  handleChange = event => {
    this.setState({ selectedValue: event.target.value })
  }
  addNote = note => {
	  let d = new Date()
	  let month = d.getMonth()
	  let day = d.getDate()
	  let year = d.getFullYear()
	  let hourMinute = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	  let time = month+'/'+day+'/'+year+' '+hourMinute
	  let fullNote = {
		  proserv_id: this.props.id,
		  visibility: 1,
		  time: time,
		  utime: d.getTime(),
		  action: "Agent Note",
		  user: this.props.user,
		  note: note
	  }
	  this.props.onAddNote(fullNote)
	  this.setState({ open: false })
  }

  //onClick={() => this.addNote({"proserv_id":38324,"visibility":1,"time":"02/13/18 6:20pm","utime":"1518571231","action":"Status Update","user":"shunt","note":"Successfully updated status<br /> to Waiting For Cust"})}

  render() {
	 const { classes } = this.props
    return (
      <div>
			<Tooltip id="tooltip-right" title="Add Note" placement="right">
			<Button mini onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" className={classes.button}>
				<AddIcon />
			</Button>
			</Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Note</DialogTitle>
          <DialogContent>
				<FormControl component="fieldset" required style={{display: "inline"}}>
	          <FormLabel component="legend">Type</FormLabel>
	            <FormControlLabel value="general" onChange={this.handleChange} control={<Radio checked={(this.state.selectedValue === "general") ? true : false} />} label="General" />
	            <FormControlLabel value="important" onChange={this.handleChange} control={<Radio checked={(this.state.selectedValue === "important") ? true : false} />} label="Important" />
	            <FormControlLabel value="essential" onChange={this.handleChange} control={<Radio checked={(this.state.selectedValue === "essential") ? true : false} />} label="Essential" />
	        </FormControl>
            <TextField
              autoFocus
              margin="dense"
              id="addNote"
              label="Start typing..."
              type="text"
							multiline
							rows={3}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.addNote("testing")} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormDialog);
