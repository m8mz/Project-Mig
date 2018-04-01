import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import ButtonMenu from './ButtonMenu'
import Tasks from './Tasks'
import Divider from 'material-ui/Divider'
import Notes from './Notes'
import EmailTemplates from './EmailTemplates'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
		width: "90%",
		margin: "0 auto",
		marginTop: theme.spacing.unit * 2
  }),
	divider: {
		marginBottom: 15
	}
})

function PaperSheet(props) {
  const { classes } = props;
  return (
	  <Paper className={classes.root} elevation={4}>
	    <Typography variant="headline" component="h3">
	      <ButtonMenu />
	    </Typography>
			<Divider light className={classes.divider} />
	    <Typography component="div" style={{marginBottom: 25}}>
	      <Tasks />
				<Notes />
	    </Typography>
			<EmailTemplates />
	  </Paper>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaperSheet)
