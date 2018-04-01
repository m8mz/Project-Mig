import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import MenuDrawer from './MenuDrawer'
import Tooltip from 'material-ui/Tooltip'

const styles = {
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
	}
}

const ButtonAppBar = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <MenuDrawer />
					<Button className={classes.homeButton} mini={true} size="small" href="/cgi/admin/proservice" color="inherit"><Icon>home</Icon></Button>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Professional Services
          </Typography>
					<Tooltip id="tooltip-left-end" title="Search Domain" placement="left-end">
		       	<Button color="inherit"><Icon>search</Icon></Button>
					</Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBar)
