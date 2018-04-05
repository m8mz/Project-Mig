import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Stepper, { Step, StepButton } from 'material-ui/Stepper'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'

const styles = theme => ({
  root: {
    width: '90%',
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
		["completed", "cancelled"]
	]
	return (statusObj[0].indexOf(statusName) !== -1) ?
		0 :
		(statusObj[1].indexOf(statusName) !== -1) ?
		1 :
		(statusObj[2].indexOf(statusName) !== -1)  ?
		2 :
		0
}

class HorizontalNonLinearStepper extends React.Component {

  state = {
    statusStep: findStatus(this.props.status),
    completed: {},
	 refunded: false
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
    return (this.state.completed[2] === true)
  }

  handleStep = step => () => {
    this.setState({
      statusStep: step,
    })
  }

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.statusStep] = true;
    this.setState({
      completed,
    })
  }

  handleReset = () => {
    this.setState({
      statusStep: 0,
      completed: {},
    })
  }

  componentWillReceiveProps(nextProps) {
	  this.setState({
		  statusStep: findStatus(nextProps.status)
	  })
  }

  render() {
    const { classes, status } = this.props
    const steps = getSteps()
	 const { statusStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={statusStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
								{(statusStep === 1 && index === 1) ? <CircularProgress size={24} className={classes.progress}/> :
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
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
                Finished Project - Completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <div>
                <Button
									variant={(status === "in_progress") ? 'raised' : 'flat'}
                  disabled={statusStep === 0}
									onClick={() => alert("update status")}
									color={(this.state.refunded) ? 'secondary' : 'primary'}
                  className={classes.button}
                >
                  {(statusStep === 0) ? '' : (statusStep === 1) ? 'Working' : (this.state.refunded) ? 'Refunded' : ''}
                </Button>
                <Button
                  variant={(status === "new") ? 'raised' : (status === "waiting_for_cust") ? 'raised' : (status === "completed") ? 'raised' : 'flat'}
                  color="primary"
                  onClick={(statusStep === 2) ? this.handleComplete : () => alert("update status")}
                  className={classes.button}
                >
                  {(statusStep === 0) ? 'Need Info' : (statusStep === 1) ? 'Waiting' : 'Completed'}
                </Button>
                <Button
									variant={(status === "info_received") ? 'raised' : (status === "customer_review" || status === "agent_review") ? 'raised' : (status === "cancelled") ? 'raised' : 'flat'}
									color="primary" onClick={(statusStep === 2) ? this.handleComplete : () => alert("update status")}>
                  {(statusStep === 0) ? 'Rec Info' : (statusStep === 1) ? 'Review' : 'Cancelled'}
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
