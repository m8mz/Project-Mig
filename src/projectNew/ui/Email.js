import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import purple from 'material-ui/colors/purple'
import Button from 'material-ui/Button'
import SendIcon from 'material-ui-icons/Send'
import Tooltip from 'material-ui/Tooltip'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import axios from 'axios'

const styles = theme => ({
  container: {
	 marginTop: 5
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputUnderline: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
		width: "100%"
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
	root: {
		width: 800
	}
})

class CustomizedInputs extends React.Component {
	state = {
		open: false
	}
	handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  sendEmail = () => {
	  if (document.getElementById('finalEmail').value.replace(/\s/, "") === "") {
		  console.log("Cannot send a blank email for obvious reasons.")
	  } else {
		  const mail = {
   		  user: this.props.user,
   		  provider: document.location.host.slice(2).replace(/\.com/, ''),
   		  action: 'send_email',
   		  type: 'websitetransfer',
   		  lib: 'general',
   		  email: this.props.email,
   		  subject: `Website Transfer for ${this.props.cpanel_user}`,
   		  content: encodeURIComponent(document.getElementById('finalEmail').value.replace(/(\r\n|\n|\r)/g,"<br>")),
   		  content_note: encodeURIComponent(document.getElementById('finalEmail').value.replace(/(\r\n|\n|\r)/g,"<br>").replace(/<br>/g, "!!break!!")),
   		  cust_id: this.props.cust_id,
   		  proserv_id: this.props.id
   	  }
   	  axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${mail.user}&provider=${mail.provider}&type=${mail.type}&action=${mail.action}&lib=${mail.lib}&email=${mail.email}&subject=${mail.subject}&content=${mail.content}&content_note=${mail.content_note}&cust_id=${mail.cust_id}&proserv_id=${mail.proserv_id}`)
   	  .then((res) => {
   		  console.log(`
   				  Exit Code: ${res.data.success}
   				  Response: ${res.data.note}
   			  `)
   		  if (res.data.success === 1) {
   			  document.getElementById('bootstrap-input').value = ""
   			  this.setState({ open: false })
   		  } else {
   			  console.log(`Error: ${res.data.note}`)
   		  }
   	  })
   	 .catch((error) => {
   		 console.log("Issue with sending email through API.. please report.")
   	 })
	  }
  }
	previewEmail = () => {
		const email = document.getElementById('bootstrap-input').value
		return email
	}
	render() {
		const { classes } = this.props
		return (
			<div className={classes.container}>
	      <TextField
	        placeholder="Hello..."
			  	multiline={true}
			  	rows={15}
			  	fullWidth={true}
	        label="Send Email"
	        id="bootstrap-input"
	        InputProps={{
	          disableUnderline: true,
	          classes: {
	            root: classes.textFieldRoot,
	            input: classes.textFieldInput,
	          },
	        }}
	        InputLabelProps={{
	          shrink: true,
	          className: classes.textFieldFormLabel,
	        }}
	      />
			<Tooltip id="tooltip-right" title="Send Email" placement="right">
			<Button mini className={classes.button} variant="raised" color="primary" aria-label="Send Email" onClick={this.handleClickOpen}>
			<SendIcon style={{fontSize: 20}}/>
	  	</Button>
			</Tooltip>
			<Dialog maxWidth="md"
	          open={this.state.open}
	          onClose={this.handleClose}
	          aria-labelledby="alert-dialog-title"
	          aria-describedby="alert-dialog-description"
	        >
	          <DialogTitle id="alert-dialog-title">{"Preview Email"}</DialogTitle>
	          <DialogContent>
	            <DialogContentText id="alert-dialog-description">
	              <TextField classes={{root:classes.root}} id="finalEmail" multiline defaultValue={(this.state.open) ? this.previewEmail() : null} rowsMax={40} />
	            </DialogContentText>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleClose} color="primary">
	              Cancel
	            </Button>
	            <Button onClick={this.sendEmail} color="primary" autoFocus>
	              Send Email
	            </Button>
	          </DialogActions>
	        </Dialog>
	    </div>
		)
	}
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomizedInputs)
