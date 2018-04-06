import AddNote from '../ui/AddNote'
import { addNote } from '../../actions'
import { connect } from 'react-redux'

// action=add_proserv_note&lib=general&proserv_id="+mig_id+"&visibility="+t+"&note_action=Agent%20Note&note="+encodeURIComponent(q)

const mapStateToProps = state => {
		let username
		if (state.user === 'Marcus') {
			username = 'mhancock-gaillard'
		} else if (state.user === 'Edward') {
			username = 'emuniz'
		} else if (state.user === 'Miekkal') {
			username = 'mclarkson'
		} else if (state.user === 'Tyler') {
			username = 'toyler'
		} else if (state.user === 'Tony') {
			username = 'aanselmo'
		} else if (state.user === 'Lucas') {
			username = 'lbejarano'
		} else if (state.user === 'Sarah') {
			username = 'shunt'
		} else {
			username = 'agent'
		}
	return {
		"id": state.projectInfo.proserv_id,
		"user": username
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
