import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import MenuDrawer from './MenuDrawer'
import Input, { InputLabel } from 'material-ui/Input'
import yellow from 'material-ui/colors/yellow'
import { FormControl } from 'material-ui/Form'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  list: {
	  width: 200,
  },
	homeButton: {
		padding: 0,
		minWidth: 40,
		marginRight: 5
	},
  formControl: {
    margin: theme.spacing.unit,
		width: "12%"
  },
  inputLabelFocused: {
    color: yellow[500],
  },
  inputUnderline: {
    '&:after': {
      backgroundColor: yellow[500],
    },
  }
})

class ButtonAppBar extends React.Component {
	handleChange = event => {
		if (event.target.value.length >= 3) {
			this.props.onSearchChange(event.target.value)
		} else if (event.target.value.length === 0) {
			this.props.onSearchOff()
		}
	}
	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
	      <AppBar position="static">
	        <Toolbar>
	          <MenuDrawer />
						<Button className={classes.homeButton} mini={true} size="small" href="/cgi/admin/proservice" color="inherit"><Icon>home</Icon></Button>
	          <Typography variant="title" color="inherit" className={classes.flex}>
	            Professional Services
	          </Typography>
						<FormControl className={classes.formControl}>
			        <InputLabel
			          htmlFor="custom-color-input"
			        >
			          Search
			        </InputLabel>
			        <Input
			          classes={{
			            underline: classes.inputUnderline,
			          }}
			          id="custom-color-input"
								onChange={this.handleChange}
			        />
			      </FormControl>
	        </Toolbar>
	      </AppBar>
	    </div>
		)
	}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
