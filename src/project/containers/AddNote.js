import AddNote from '../ui/AddNote'
import { connect } from 'react-redux'

// action=add_proserv_note&lib=general&proserv_id="+mig_id+"&visibility="+t+"&note_action=Agent%20Note&note="+encodeURIComponent(q)


const mapStateToProps = state => {
	const indexStatus = ["new", "info_received", "in_progress", "waiting_for_customer", "customer_review", "agent_review", "completed", "cancelled"]
	const findStatus = (statusName) => {
		const statusObj = [
			["new", "info_received"],
			["in_progress", "waiting_for_customer", "customer_review", "agent_review"],
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
		"id": state.projectInfo.proserv_id,
		"status": state.projectInfo.proserv_status_name
	}
}

const Container = connect(mapStateToProps)(AddNote)

export default Container
