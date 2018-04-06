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
import green from 'material-ui/colors/green'
import Radio from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
	button: {
		margin: theme.spacing.unit
	},
	group: {
		display: "block"
	},
	checked: {
    color: green[500],
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
	  let month = d.getMonth()+1
	  let day = d.getDate()
	  let year = d.getFullYear()
	  let hourMinute = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	  let time = month+'/'+day+'/'+year+' '+hourMinute
	  var fullNote = {
		  proserv_id: this.props.id,
		  visibility: 1,
		  time: time,
		  utime: d.getTime(),
		  action: "Agent Note",
		  user: this.props.user,
		  note: note
	  }
		// TODO API CALL
	  this.props.onAddNote(fullNote)
	  this.setState({ open: false })
  }

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
	            <FormControlLabel value="important" onChange={this.handleChange} control={<Radio classes={{checked: classes.checked}} checked={(this.state.selectedValue === "important") ? true : false} />} label="Important" />
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
            <Button onClick={() => this.addNote(document.getElementById('addNote').value)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(FormDialog);
