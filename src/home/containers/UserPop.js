import { UserPop } from '../ui/UserPop'
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

const Container = connect(mapStateToProps, mapDispatchToProps)(UserPop)

export default Container
