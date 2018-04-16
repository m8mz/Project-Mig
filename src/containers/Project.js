import { Project } from '../project'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"darkTheme": state.darkTheme
	}
}

const Container = connect(mapStateToProps)(Project)

export default Container
