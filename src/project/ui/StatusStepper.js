import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import axios from 'axios'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import formatDate from './TrackerFunctions.js'

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
	progress: {
    margin: 0,
  },
})

function getSteps() {
  return ['New', 'In Progress', 'Done']
}

function findStatus(statusName) {
	const statusObj = [
		["new", "info_received"],
		["in_progress", "waiting_for_cust", "customer_review", "agent_review"],
		["complete", "cancelled"]
	]
	return (statusObj[0].indexOf(statusName) !== -1) ?
		0 :
		(statusObj[1].indexOf(statusName) !== -1) ?
		1 :
		(statusObj[2].indexOf(statusName) !== -1)  ?
		2 :
		0
}

var params = {}

class HorizontalNonLinearStepper extends React.Component {

  state = {
    statusStep: findStatus(this.props.status),
		status: this.props.status,
    completed: this.props.completed,
    open: false,
    completion_submitted: false,
    selectedOption: true
  }

  // componentDidUpdate() {
	// params = {
	// 	user: nextProps.user,
	// 	provider: document.location.host.slice(2).replace(/\.com/, ''),
	// 	service_type: 'websitetransfer',
	// 	action: 'update_status',
	// 	lib: 'general',
	// 	new_status: this.status,
	// 	proserv_id: nextProps.id,
	// 	domain: nextProps.domain,
	// 	cust_id: nextProps.cust_id,
	// 	added: nextProps.added,
	// 	cpanel_user: nextProps.cpanel_user,
	// 	domain_complete: nextProps.domain_complete,
	// 	email_complete: nextProps.email_complete,
	// 	units_complete: 1,
	// 	isVPS: null,
	// 	isInternal: null,
	// 	completion_comment: null
	//   }
  //   console.log(JSON.strigify(params));
  // }


  // Dialog open/close functions
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  // Handle completion submission
  handleSubmit = () => {
    const timestamp = formatDate(Date());
    //check if internal/external
    if(document.getElementById("externalMigration").checked===true){
      params.isInternal = 0;
    } else {
      params.isInternal = 1;
    }
    //check if tracked as agent or forced completion (agent review)
    if(document.getElementById("agentCompleted").checked===true){
      params.agentReview = 0;
    } else {
      params.agentReview = 1;
    }
    //check if shared or vps
    if(document.getElementById("sharedMigration").checked===true){
      params.isVPS = 0;
    } else {
      params.isVPS = 1;
    }
    //set number of sites
    params.domain_complete = document.getElementById("numberOfSites").value;
    //set number of emails
    params.email_complete = document.getElementById("numberOfMailboxes").value;
    //set number of units
    params.units_complete = document.getElementById("numberOfUnits").value;
    //set the comment
    params.completion_comment = document.getElementById("completionComment").value
    //make the axios call to submit the completion to db
    axios.get(`https://tempeproserve.com/tracker/submit/submit-completion.php?migid=${params.proserv_id}&completionDate=${timestamp}&brand=${params.provider}&comment=${params.completion_comment}&purchaseDate=${params.added}&agentName=${params.user}&domain=${params.domain}&cpanelUsername=${params.cpanel_user}&isVPS=${params.isVPS}&isInternal=${params.isInternal}&numberOfUnits=${params.units_complete}&numberOfSites=${params.domain_complete}&numberOfMailboxes=${params.email_complete}&custID=${params.cust_id}&agentReview=${params.agentReview}`)
    .then((res) => {
      console.log(`
          Exit Code: ${res.data.success}
          Response: ${res.data.refund_submission_data}
        `)
      if (res.data.success === 1) {
        console.log("Refund recorded.")
      } else {
        console.log(`Error: ${res.data.note}`)
      }
    })
    .catch((error) => {
      console.log("Issue recording refund to database.. please report.")
    })
    this.setState({completion_submitted: true});
  }

  completedSteps() {
    return Object.keys(this.state.completed).length
  }

  totalSteps = () => {
    return getSteps().length
  }

  isLastStep() {
    return this.state.statusStep === this.totalSteps() - 1
  }

  allStepsCompleted() {
    return this.state.completed
  }

  handleStep = step => () => {
    this.setState({
      statusStep: step,
    })
  }

  handleComplete = (status) => {
    const params = this.params;
	 axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&new_status=${params.new_status}&proserv_id=${params.proserv_id}`)
	 .then((res) => {
		 console.log(`
				 Exit Code: ${res.data.success}
				 Response: ${res.data.note}
			 `)
			 if (res.data.success === 1) {
				 this.setState({
					status: status
			   })
				this.setState({
		        completed: true,
		  			status: status
		      })
		   } else {
			   console.log(`Error: ${res.data.note}`)
		   }})
			.catch((error) => {
		console.log("Issue with the status API.. please report.")
   })
  }

  handleReset = () => {
    this.setState({
      statusStep: 0,
      completed: false,
    })
  }

  componentWillUpdate(nextProps) {
	  if (nextProps.status !== this.props.status) {
		 if (nextProps.status === "complete" || nextProps.status === "cancelled") {
			 this.setState({
  			 	completed: true,
				refunded: nextProps.refunded
  		 	 })
		 } else if (this.state.completed) {
			 this.setState({
				 completed: false
			 })
		 }
		  this.setState({
			 status: nextProps.status,
			 statusStep: findStatus(nextProps.status)
		 })
	  }

    params = {
    	user: this.props.user,
    	provider: document.location.host.slice(2).replace(/\.com/, ''),
    	service_type: 'websitetransfer',
    	action: 'update_status',
    	lib: 'general',
    	new_status: this.status,
    	proserv_id: this.props.id,
    	domain: this.props.domain,
    	cust_id: this.props.cust_id,
    	added: this.props.added,
    	cpanel_user: this.props.cpanel_user,
    	domain_complete: this.props.domain_complete,
    	email_complete: this.props.email_complete,
    	units_complete: 1,
    	isVPS: null,
    	isInternal: null,
    	completion_comment: null
      }
      console.log(JSON.stringify(params));

  }

	setStatus = (status) => {
		const params = {
  		 user: this.props.user,
  		 provider: document.location.host.slice(2).replace(/\.com/, ''),
  		 service_type: 'websitetransfer',
  		 action: 'update_status',
  		 lib: 'general',
  		 new_status: status,
  		 proserv_id: this.props.id
  	 }
  	 axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&new_status=${params.new_status}&proserv_id=${params.proserv_id}`).then((res) => {
  		 console.log(`
  				 Exit Code: ${res.data.success}
  				 Response: ${res.data.note}
  			 `)
  			 if (res.data.success === 1) {
  				 this.setState({
  					status: status
  				})
  			} else {
  				console.log(`Error: ${res.data.note}`)
  			}
  	 }).catch((error) => {
  		console.log("Issue with the status API.. please report.")
     })
  }

  render() {
    const { classes, refunded } = this.props
    const steps = getSteps()
	 	const { statusStep, status } = this.state

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={statusStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
								{(statusStep === 1 && index === 1) ? <CircularProgress size={20} className={classes.progress}/> :
                <StepButton
                  onClick={(this.state.completed) ? '' : this.handleStep(index)}
                  completed={this.state.completed}
                >
                  {label}
                </StepButton>}
              </Step>
            )
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                Finished Project - {(status === "complete") ? 'Completed' : 'Cancelled'}
              </Typography>
							{(refunded) ?
							<Button style={{color:'red'}} disabled>REFUNDED</Button> :
              <Button onClick={this.handleReset}>Reset</Button>}
            </div>
          ) : (
            <div style={{textAlign: "center"}}>
              <div>
								{(statusStep === 1) ?
									<Button
										variant={(status === "in_progress") ? 'raised' : 'flat'}
										onClick={() => this.setStatus("in_progress")}
										color={(this.state.refunded && statusStep === 2) ? 'secondary' : 'primary'}
										className={classes.button}
									>
										{(statusStep === 0) ? '' : (statusStep === 1) ? 'Working' : (this.state.refunded) ? 'Refunded' : ''}
									</Button> :
									null}


                  {/* Completion Button **/}
                <Button
                  variant={(status === "new" && statusStep === 0) ?
										'raised' :
										(status === "waiting_for_cust" && statusStep === 1) ?
										'raised' :
										(status === "completed" && statusStep === 2) ?
										'raised' :
										'flat'}
                  color="primary"
                  onClick={(statusStep === 2) ?
										() => this.handleComplete("complete") :
										(statusStep === 0) ? () => this.setStatus("new") :
										() => this.setStatus("waiting_for_cust")
										}
                  className={classes.button}
                  // eslint-disable-next-line
                  onClick={this.handleOpen}
                >
                  {(statusStep === 0) ? 'New' : (statusStep === 1) ? 'Waiting' : 'Completed'}
                </Button>
                {/* Dialog box **/}
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Submit Completion</DialogTitle>
                  {/* Check if completion has been submitted**/}
                  {(this.state.completion_submitted === false) ?
                  <DialogContent id="completion-form-wrapper">
                  <hr/>
                    <DialogContentText>
                      <Typography>Please confirm the details for your completion submission, otherwise please cancel if this will be untracked.</Typography>
                    </DialogContentText>
                    <hr/>
                    <form id="completion-form">
                      <Typography>How should this be tracked?</Typography>
                      <input id="agentCompleted" type="radio" name="tracked" value="complete" defaultChecked/><label for="agentCompleted">I completed this</label>
                      <input id="agentReview" type="radio" name="tracked" value="agentReview"/><label for="agentReview">Agent Review/Forced Completion</label>
                      <Typography>Is the source external or internal?</Typography>
                      <input id="externalMigration" type="radio" name="source" value="External" defaultChecked/><label for="externalMigration">External</label>
                      <input id="Internal" type="radio" name="source" value="Internal"/><label for="Internal">Internal</label>
                      <Typography>What kind of account is the destination?</Typography>
                      <input id="sharedMigration" type="radio" name="destination" value="shared" defaultChecked/><label for="sharedMigration">Shared/Cloud/Basic/BlueRock/Other</label>
                      <input id="vpsdedi" type="radio" name="destination" value="vpsdedi"/><label for="vpsdedi">OHWP/VPS/Dedi</label>
                      <br/>
                      <Typography>Confirm the number of sites</Typography>
                      <input id="numberOfSites" type="number" defaultValue={this.props.domain_complete}/>
                      <Typography>Confirm the number of mailboxes</Typography>
                      <input id="numberOfMailboxes" type="number" defaultValue={this.props.email_complete}/>
                      <Typography>Confirm the number of units sold</Typography>
                      <input id="numberOfUnits" type="number" defaultValue="1"/>
                      <Typography>Leave an optional comment</Typography>
                      <textarea id="completionComment" placeholder="If this wasn't an average migration briefly explain here"/>
                    </form>
                  </DialogContent>
                   : <Typography id="submission-message">Thank you for your submission</Typography>}
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    {(this.state.completion_submitted === false) ?
                      <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                      :
                      <Button label="Disabled" disabled={true}>Submitted</Button>
                    }

                  </DialogActions>
                </Dialog>
                {/* Info rcvd, review, cancelled **/}
                <Button
									className={classes.button}
									variant={(status === "info_received" && statusStep === 0) ?
										'raised' :
										((status === "customer_review" && statusStep === 1) || (status === "agent_review" && statusStep === 1)) ?
										'raised' :
										(status === "cancelled" && statusStep === 2) ?
										'raised' :
										'flat'}
									color="primary"
									onClick={(statusStep === 2) ?
										() => this.handleComplete("cancelled") :
										(statusStep === 0) ? () => this.setStatus("info_received") :
										() => this.setStatus("customer_review")}>
                  {(statusStep === 0) ? 'Info Rec' : (statusStep === 1) ? 'Review' : 'Cancelled'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

HorizontalNonLinearStepper.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(HorizontalNonLinearStepper)
