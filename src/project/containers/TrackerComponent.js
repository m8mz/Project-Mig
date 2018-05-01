import TrackerComponent from '../ui/TrackerComponent'

import { connect } from 'react-redux'

const mapStateToProps = state => {

	return {
		"status": state.projectInfo.proserv_status_name,
		"user": state.user,
		"id": state.projectInfo.proserv_id,
		"refunded": state.notes.find(n => (n.note === "Refund issued and recorded") ? true : false),
		"completed": (state.projectInfo.proserv_status_name === "complete" || state.projectInfo.proserv_status_name === "cancelled") ? true : false,
		"email": state.projectInfo.email,
		"cpanel_user": state.projectInfo.cpanel_user,
		"domain": state.projectInfo.domain,
		"added": state.projectInfo.added,
		"cust_id": state.projectInfo.cust_id,
		"domain_complete": state.projectInfo.domain_complete,
		"email_complete": state.projectInfo.email_complete
	}
}

const Container = connect(mapStateToProps)(TrackerComponent)

export default Container
