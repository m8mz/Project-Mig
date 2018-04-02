import Tasks from '../ui/Tasks'
import { connect } from 'react-redux'
import { projectTasksAPI } from '../../actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
	return {
		"emailTasks": state.emailTasks,
		"siteTasks": state.siteTasks
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
