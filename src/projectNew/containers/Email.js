import Email from '../ui/Email'
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
		"cpUser": state.projectInfo.cpanel_user,
		"user": username,
		"id": state.projectInfo.proserv_id,
		"cust_id": state.projectInfo.cust_id,
		"email": state.projectInfo.email,
		"cpanel_user": state.projectInfo.cpanel_user
	}
}

const Container = connect(mapStateToProps)(Email)

export default Container
