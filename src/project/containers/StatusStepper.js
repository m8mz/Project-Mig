import StatusStepper from '../ui/StatusStepper'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"status": state.projectInfo.proserv_status_name
	}
}

const Container = connect(mapStateToProps)(StatusStepper)

export default Container
