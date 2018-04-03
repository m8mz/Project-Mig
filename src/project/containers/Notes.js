import Notes from '../ui/Notes'
import { connect } from 'react-redux'
import { projectNotesAPI, addNote } from '../../actions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {

	return {
		"notes": state.notes
	}
}

const mapDispatchToProps = dispatch => {

	return {
		onComponentWillMount(proservID) {
			dispatch(
				projectNotesAPI(proservID)
			)
		},
		onAddNote(fullNote) {
			dispatch(
				addNote(fullNote)
			)
		}
	}
}

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(Notes))

export default Container
