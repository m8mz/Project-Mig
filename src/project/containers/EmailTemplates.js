import EmailTemplates from '../ui/EmailTemplates'
import { projectInfoAPI } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"sites": state.siteTasks,
		"emails": state.emailTasks,
		"user": state.user,
		"proserv_id": state.projectInfo.proserv_id,
		"cust_id": state.projectInfo.cust_id,
		"email": state.projectInfo.email,
		"cpanel_user": state.projectInfo.cpanel_user,
		"domain": state.projectInfo.domain,
		"cust_id": state.projectInfo.cust_id,
		"added": state.projectInfo.added
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
