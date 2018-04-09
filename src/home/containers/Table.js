import Table from '../ui/Table'
import { changePage, changeRowsPerPage, projectListAPI } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {

	const filterProjects = (projects) => {
		if (state.searching) {
			return projects
		} else {
			let statusFilter = []
			if (state.infoReceived) {
				statusFilter.push("info_received")
			}
			if (state.inProgress) {
				statusFilter.push("in_progress")
			}
			if (state.waitingForCustomer) {
				statusFilter.push("waiting_for_cust")
			}
			if (state.agentReview) {
				statusFilter.push("agent_review")
			}
			if (state.customerReview) {
				statusFilter.push("customer_review")
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
			projects.map(project =>
				(project.status_name.match(rgxp)) ?
				tempList.push(project)
				:
				null
			)
			return tempList
		}
	}

	return {
		"data": state.projectList,
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
		onComponentWillMount() {
			dispatch(
				projectListAPI()
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Table)

export default Container
