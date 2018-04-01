import Filter from '../ui/Filter'
import { infoReceived, inProgress, waitingForCustomer, agentReview, customerReview } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"infoReceived": state.infoReceived,
		"inProgress": state.inProgress,
		"waitingForCustomer": state.waitingForCustomer,
		"agentReview": state.agentReview,
		"customerReview": state.customerReview
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onInfoReceived(state) {
			dispatch(
				infoReceived(state)
			)
		},
		onInProgress(state) {
			dispatch(
				inProgress(state)
			)
		},
		onWaitingForCustomer(state) {
			dispatch(
				waitingForCustomer(state)
			)
		},
		onAgentReview(state) {
			dispatch(
				agentReview(state)
			)
		},
		onCustomerReview(state) {
			dispatch(
				customerReview(state)
			)
		},
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default Container
