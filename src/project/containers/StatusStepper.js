import StatusStepper from '../ui/StatusStepper'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	const findStatus = (statusName) => {
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
	return {
		"statusStep": findStatus(state.projectInfo.proserv_status_name),
		"status": state.projectInfo.proserv_status_name
	}
}

const Container = connect(mapStateToProps)(StatusStepper)

export default Container
