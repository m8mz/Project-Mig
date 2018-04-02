import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import purple from 'material-ui/colors/purple'
import Button from 'material-ui/Button'
import SendIcon from 'material-ui-icons/Send'

const styles = theme => ({
  container: {
	 marginTop: 20
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
	 display: "block"
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
});

function CustomizedInputs(props) {
  const { classes } = props

  return (
    <div className={classes.container}>
      <TextField
        defaultValue="Hello..."
		  multiline={true}
		  rows={10}
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
		<Button mini className={classes.button} variant="fab" color="primary" aria-label="Send Email">
		<SendIcon style={{fontSize: 20}}/>
  	 	</Button>
    </div>
  )
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomizedInputs)
