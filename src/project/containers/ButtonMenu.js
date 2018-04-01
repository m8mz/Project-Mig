import ButtonMenu from '../ui/ButtonMenu'
import { connect } from 'react-redux'
import { projectAPI } from '../../actions'

const mapStateToProps = state => {

	return {
		"projectInfo": state.projectInfo,
		"emailTasks": state.tasks.emailTasks,
		"siteTasks": state.tasks.siteTasks,
		"notes": state.notes
	}
}

const Container = connect(mapStateToProps)(ButtonMenu)

export default Container
