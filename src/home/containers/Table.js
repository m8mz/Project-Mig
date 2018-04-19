import Table from '../ui/Table'
import { changePage, changeRowsPerPage, projectListAPI } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {

	function filterProjects() {
			let statusFilter = []
			if (state.infoReceived || state.searching) {
				statusFilter.push("info_received")
			}
			if (state.inProgress || state.searching) {
				statusFilter.push("in_progress")
			}
			if (state.waitingForCustomer || state.searching) {
				statusFilter.push("waiting_for_cust")
			}
			if (state.agentReview || state.searching) {
				statusFilter.push("agent_review")
			}
			if (state.customerReview || state.searching) {
				statusFilter.push("customer_review")
			}
			if (state.searching) {
				statusFilter.push("completed", "cancelled", "new")
			}
			let regexExp
			statusFilter.map(status =>
				(!regexExp) ?
					regexExp = '^' + status + '$'
				:
					regexExp += '|^' + status + '$'
			)
			var rgxp = new RegExp(regexExp, "g")
			let tempList = []
			state.projectList.map(project =>
				(project.status_name.match(rgxp)) ?
				tempList.push(project)
				:
				null
			)
			return tempList
		}

	return {
		"data": filterProjects(),
		"page": state.page,
		"rowsPerPage": state.rowsPerPage,
		"infoReceived": state.infoReceived,
		"inProgress": state.inProgress,
		"waitingForCustomer": state.waitingForCustomer,
		"agentReview": state.agentReview,
		"customerReview": state.customerReview,
		"searching": state.searching
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChangePage(page) {
			dispatch(
				changePage(page)
			)
		},
		onChangeRowsPerPage(value) {
			dispatch(
				changeRowsPerPage(value)
			)
		},
		listApi() {
			dispatch(
				projectListAPI()
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Table)

export default Container
