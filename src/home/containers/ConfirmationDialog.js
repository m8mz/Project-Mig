import ConfirmationDialog from '../ui/ConfirmationDialog'
import { changeUser } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {

	return {
		"user": state.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChangeUser(user) {
			dispatch(
				changeUser(user)
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(UserSelect)

export default Container
