import StatusStepper from '../ui/StatusStepper'
import { connect } from 'react-redux'

const mapStateToProps = state => {

	return {
	"status": state.projectInfo.proserv_status_name,
	"user": state.user,
	"id": state.projectInfo.proserv_id,
	"refunded": state.notes.find(n => (n.note === "Refund issued and recorded") ? true : false),
	"completed": (state.projectInfo.proserv_status_name === "complete" || state.projectInfo.proserv_status_name === "cancelled") ? true : false
	}
}

const Container = connect(mapStateToProps)(StatusStepper)

export default Container
