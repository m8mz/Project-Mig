import UserSelect from '../ui/UserSelect'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"user": state.user
	}
}

const Container = connect(mapStateToProps)(UserSelect)

export default Container
