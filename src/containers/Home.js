import { Home } from '../home/'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		"darkTheme": state.darkTheme
	}
}

const Container = connect(mapStateToProps)(Home)

export default Container
