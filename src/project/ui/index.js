import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import ButtonMenu from '../containers/ButtonMenu'
import Tasks from '../containers/Tasks'
import Divider from 'material-ui/Divider'
import Notes from '../containers/Notes'
import EmailTemplates from '../containers/EmailTemplates'
import Email from '../containers/Email'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
		width: "90%",
		margin: "0 auto",
		marginTop: theme.spacing.unit * 2,
		height: "auto"
  }),
	divider: {
		marginBottom: 5
	},
	grid: {
		flexGrow: 1
	}
})

function PaperSheet(props) {
  const { classes } = props
  return (
	  <Paper className={classes.root} elevation={4}>
		  <Grid container spacing={24}>
		   	<Grid item xs>
			    <Typography component="div">
			      <ButtonMenu />
						<Divider className={classes.divider} />
			    </Typography>
				</Grid>
		  </Grid>
			<Grid container spacing={24}>
			 <Grid item xs={5} sm={12} style={{maxWidth: 540}}>
		      <Tasks />
			 </Grid>
			 <Grid item xs>
				<Notes />
			 </Grid>
			</Grid>
			<Grid container spacing={24}>
			 <Grid item xs={4} sm={12} style={{maxWidth: 540}}>
				<EmailTemplates />
			 </Grid>
			 <Grid item xs style={{minWidth: 500}}>
				<Email />
			 </Grid>
			</Grid>
	  </Paper>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaperSheet)
