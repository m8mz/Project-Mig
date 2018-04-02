import Tasks from '../ui/Tasks'
import { connect } from 'react-redux'
import { projectTasksAPI } from '../../actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {

	return {
		"tasks": state.tasks
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
