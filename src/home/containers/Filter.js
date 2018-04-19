import Filter from '../ui/Filter'
import { newStatus, infoReceived, inProgress, waitingForCustomer, agentReview, customerReview, projectListAPI } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"newStatus": state.newStatus,
		"infoReceived": state.infoReceived,
		"inProgress": state.inProgress,
		"waitingForCustomer": state.waitingForCustomer,
		"agentReview": state.agentReview,
		"customerReview": state.customerReview
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onNewStatus(state) {
			dispatch(
				newStatus(state)
			)
		},
		onInfoReceived(state) {
			dispatch(
				infoReceived(state)
			)
			dispatch(
				projectListAPI()
			)
		},
		onInProgress(state) {
			dispatch(
				inProgress(state)
			)
			dispatch(
				projectListAPI()
			)
		},
		onWaitingForCustomer(state) {
			dispatch(
				waitingForCustomer(state)
			)
			dispatch(
				projectListAPI()
			)
		},
		onAgentReview(state) {
			dispatch(
				agentReview(state)
			)
			dispatch(
				projectListAPI()
			)
		},
		onCustomerReview(state) {
			dispatch(
				customerReview(state)
			)
			dispatch(
				projectListAPI()
			)
		},
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default Container
