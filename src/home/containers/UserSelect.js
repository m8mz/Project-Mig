import UserSelect from '../ui/UserSelect'
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
