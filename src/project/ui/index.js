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
import Grid from 'material-ui/Grid'
import TrackerComponent from '../containers/TrackerComponent.js'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
		width: "90%",
		margin: "0 auto",
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 2,
		height: "auto",
		overflowY: 'auto'
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
			<Grid container spacing={24} style={{paddingBottom: 20}}>
			 <Grid xs={4}>
		      <Tasks />
				<EmailTemplates />
			 </Grid>
			 <Grid xs={8}>
				<Notes />
        <TrackerComponent/>
			 </Grid>
			</Grid>
	  </Paper>
  )
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PaperSheet)
