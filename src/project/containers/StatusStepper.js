import StatusStepper from '../ui/StatusStepper'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	let username
	if (state.user === 'Marcus') {
		username = 'mhancock-gaillard'
	} else if (state.user === 'Edward') {
		username = 'emuniz'
	} else if (state.user === 'Miekkal') {
		username = 'mclarkson'
	} else if (state.user === 'Tyler') {
		username = 'toyler'
	} else if (state.user === 'Tony') {
		username = 'aanselmo'
	} else if (state.user === 'Lucas') {
		username = 'lbejarano'
	} else if (state.user === 'Sarah') {
		username = 'shunt'
	} else {
		username = 'agent'
	}
	return {
		"status": state.projectInfo.proserv_status_name,
		"user": username,
		"id": state.projectInfo.proserv_id,
		"refunded": state.notes.find(n => (n.note === "Refund issued and recorded") ? true : false),
		"completed": (state.projectInfo.proserv_status_name === "complete" || state.projectInfo.proserv_status_name === "cancelled") ? true : false,
		"email": state.projectInfo.email,
		"cpanel_user": state.projectInfo.cpanel_user,
		"domain": state.projectInfo.domain,
		"added": state.projectInfo.added
	}
}

const Container = connect(mapStateToProps)(StatusStepper)

export default Container
