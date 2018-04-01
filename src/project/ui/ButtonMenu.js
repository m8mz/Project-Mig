import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const FlatButtons = ({ classes }) => {
	const splitPath = (path) => {
		let k
		k = path.split("/")
		return (k[k.length-1])
	}
	//let proservID = splitPath(this.props.location.pathname)

  return (
    <div>
			<Button variant="raised" color="primary" className={classes.button}>
				cPM
			</Button>
      <Button variant="raised" color="primary" className={classes.button}>
        Migration
      </Button>
      <Button variant="raised" color="primary" className={classes.button}>
        cPanel
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        File Manager
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        Domain Manager
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        phpMyAdmin
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        Email
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        MySQL
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        FTP
      </Button>
			<Button variant="raised" color="primary" className={classes.button}>
        Subdomain
      </Button>
    </div>
  )
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FlatButtons)
