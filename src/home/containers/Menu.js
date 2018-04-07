import Menu from '../ui/Menu'
import { searchProjects, clearSearch } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"data": state.projectList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange(value) {
			dispatch(
				searchProjects(value)
			)
		},
		onSearchOff() {
			dispatch(
				clearSearch()
			)
		}
	}
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Menu)

export default Container
