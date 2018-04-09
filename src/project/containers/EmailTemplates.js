import EmailTemplates from '../ui/EmailTemplates'
import { projectInfoAPI } from '../../actions'
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
		"sites": state.siteTasks,
		"emails": state.emailTasks,
		"user": username,
		"proserv_id": state.projectInfo.proserv_id
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onComponentWillMount(proservID) {
			dispatch(
				projectInfoAPI(proservID)
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(EmailTemplates)

export default Container
