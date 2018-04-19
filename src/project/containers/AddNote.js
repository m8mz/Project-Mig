import AddNote from '../ui/AddNote'
import { addNote } from '../../actions'
import { connect } from 'react-redux'

// action=add_proserv_note&lib=general&proserv_id="+mig_id+"&visibility="+t+"&note_action=Agent%20Note&note="+encodeURIComponent(q)

const mapStateToProps = state => {
	return {
		"id": state.projectInfo.proserv_id,
		"user": state.user
	}
}

const mapDispatchToProps = fullNote => (dispatch, getState) => {
	return {
		onAddNote(fullNote) {
			dispatch(
				addNote(fullNote)
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AddNote)

export default Container
