import EmailTemplates from '../ui/EmailTemplates'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"sites": state.siteTasks,
		"emails": state.emailTasks,
		"user": state.user
	}
}

const Container = connect(mapStateToProps)(EmailTemplates)

export default Container
