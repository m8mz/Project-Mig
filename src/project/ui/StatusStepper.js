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

class HorizontalNonLinearStepper extends React.Component {
  state = {
    activeStep: this.props.statusStep,
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
    return this.state.activeStep === this.totalSteps() - 1
  }

  allStepsCompleted() {
    return (this.state.completed[2] === true)
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    })
  }

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    })
  }

  render() {
    const { classes, status } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
								{(this.state.activeStep === 1 && index === 1) ? <CircularProgress size={24} className={classes.progress}/> :
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
                  disabled={activeStep === 0}
									onClick={() => alert("update status")}
									color={(this.state.refunded) ? 'secondary' : 'primary'}
                  className={classes.button}
                >
                  {(this.state.activeStep === 0) ? '' : (this.state.activeStep === 1) ? 'Working' : (this.state.refunded) ? 'Refunded' : ''}
                </Button>
                <Button
                  variant={(status === "new") ? 'raised' : (status === "waiting_for_customer") ? 'raised' : (status === "completed") ? 'raised' : 'flat'}
                  color="primary"
                  onClick={(this.state.activeStep === 2) ? this.handleComplete : () => alert("update status")}
                  className={classes.button}
                >
                  {(this.state.activeStep === 0) ? 'Need Info' : (this.state.activeStep === 1) ? 'Waiting' : 'Completed'}
                </Button>
                <Button
									variant={(status === "info_received") ? 'raised' : (status === "customer_review") ? 'raised' : (status === "cancelled") ? 'raised' : 'flat'}
									color="primary" onClick={(this.state.activeStep === 2) ? this.handleComplete : () => alert("update status")}>
                  {(this.state.activeStep === 0) ? 'Rec Info' : (this.state.activeStep === 1) ? 'Review' : 'Cancelled'}
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
