import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

const styles = {
	switchPosition: {
		margin: "0 20% 0 20%",
		display: "block",
		textAlign: "center"
	}
}

export const SwitchLabels = ({ classes, newProjects=false, infoReceived=true, inProgress=false, waitingForCustomer=false, agentReview=false, customerReview=false, onNew=f=>f, onInfoReceived=f=>f, onInProgress=f=>f, onWaitingForCustomer=f=>f, onAgentReview=f=>f, onCustomerReview=f=>f, }) => {

    return (
 			  <FormGroup className={classes.switchPosition} >
 				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={infoReceived}
						 onChange={() => onInfoReceived(infoReceived)}
 						 value="infoReceived"
						 color="primary"
 					  />
 					}
 					label="Info Received"
 				 />
 				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={inProgress}
						 onChange={() => onInProgress(inProgress)}
 						 value="inProgress"
 					  />
 					}
 					label="In Progress"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={waitingForCustomer}
						 onChange={() => onWaitingForCustomer(waitingForCustomer)}
 						 value="waitingForCustomer"
 					  />
 					}
 					label="Waiting For Customer"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={agentReview}
						 onChange={() => onAgentReview(agentReview)}
 						 value="agentReview"
 					  />
 					}
 					label="Agent Review"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={customerReview}
						 onChange={() => onCustomerReview(customerReview)}
 						 value="customerReview"
 					  />
 					}
 					label="Customer Review"
 				 />
 			  </FormGroup>
    )
}

SwitchLabels.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SwitchLabels)
