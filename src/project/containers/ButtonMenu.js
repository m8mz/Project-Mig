import ButtonMenu from '../ui/ButtonMenu'
import { connect } from 'react-redux'
import { projectInfoAPI } from '../../actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
	return {
		"projectInfo": state.projectInfo
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

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonMenu))

export default Container
