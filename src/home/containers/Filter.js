import Filter from '../ui/Filter'
import { toggleFilter } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"infoReceived": state.filter.infoReceived,
		"inProgress": state.filter.inProgress,
		"waitingForCustomer": state.filter.waitingForCustomer,
		"agentReview": state.filter.agentReview,
		"customerReview": state.filter.customerReview
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFilterToggle(index) {
			dispatch(
				toggleFilter(index)
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default Container
