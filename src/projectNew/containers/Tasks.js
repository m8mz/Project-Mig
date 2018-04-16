import Tasks from '../ui/Tasks'
import { connect } from 'react-redux'
import { projectTasksAPI } from '../../actions'
import { withRouter } from 'react-router-dom'

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
		"emailTasks": state.emailTasks,
		"siteTasks": state.siteTasks,
		"projectInfo": state.projectInfo,
		"user": username
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onComponentWillMount(proservID) {
			dispatch(
				projectTasksAPI(proservID)
			)
		}
	}
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks))

export default Container
