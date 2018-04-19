import Tasks from '../ui/Tasks'
import { connect } from 'react-redux'
import { projectTasksAPI, projectInfoAPI } from '../../actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
	return {
		"emailTasks": state.emailTasks,
		"siteTasks": state.siteTasks,
		"projectInfo": state.projectInfo,
		"user": state.user
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onComponentWillMount(proservID) {
			dispatch(
				projectTasksAPI(proservID)
			)
		},
		grabInfo(proservID) {
			dispatch(
				projectInfoAPI(proservID)
			)
		}
	}
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks))

export default Container
