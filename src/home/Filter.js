import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import C from '../constants'
import { filter } from '../store/reducers'

const styles = {
	switchPosition: {
		margin: "0 20% 0 20%"
	}
}

class SwitchLabels extends Component {

  handleChange = name => event => {
	  this.setState({ [name]: event.target.checked });
  }

  render() {
    const { classes } = this.props

	 const action = {
		 type: C.FILTER_FALSE
	 }

    return (
 			  <FormGroup className={classes.switchPosition} row>
 				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={this.props.filterState.infoReceived}
						 onChange={handleChange('')}
 						 value="infoReceived"
						 color="primary"
 					  />
 					}
 					label="Info Received"
 				 />
 				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={this.props.filterState.inProgress}
						 onChange={() => {
							 console.log('In Progress state change called')
						 }}
 						 value="inProgress"
 					  />
 					}
 					label="In Progress"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={this.props.filterState.waitingForCustomer}
						 onChange={() => {
							 console.log('Waiting for Customer state change called')
						 }}
 						 value="waitingForCustomer"
 					  />
 					}
 					label="Waiting For Customer"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={this.props.filterState.agentReview}
						 onChange={() => {
							 console.log('Agent Review state change called')
						 }}
 						 value="agentReview"
 					  />
 					}
 					label="Agent Review"
 				 />
				 <FormControlLabel
 					control={
 					  <Switch
 						 checked={this.props.filterState.customerReview}
						 onChange={() => {
							 console.log('Customer Review state change called')
						 }}
 						 value="customerReview"
 					  />
 					}
 					label="Customer Review"
 				 />
 			  </FormGroup>
    )
  }
}

SwitchLabels.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SwitchLabels)
