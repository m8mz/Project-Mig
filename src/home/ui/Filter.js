import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'

const styles = {
	switchPosition: {
		margin: "0 20% 0 20%"
	}
}

export const SwitchLabels = ({ classes, infoReceived=true, inProgress=false, waitingForCustomer=false, agentReview=false, customerReview=false, onFilterToggle }) => {

    return (
 			  <FormGroup className={classes.switchPosition} row>
 				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={infoReceived}
						 onChange={() => onFilterToggle(infoReceived)}
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
						 onChange={() => onFilterToggle(inProgress)}
 						 value="inProgress"
 					  />
 					}
 					label="In Progress"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={waitingForCustomer}
						 onChange={() => onFilterToggle(waitingForCustomer)}
 						 value="waitingForCustomer"
 					  />
 					}
 					label="Waiting For Customer"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={agentReview}
						 onChange={() => onFilterToggle(agentReview)}
 						 value="agentReview"
 					  />
 					}
 					label="Agent Review"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={customerReview}
						 onChange={() => onFilterToggle(customerReview)}
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
