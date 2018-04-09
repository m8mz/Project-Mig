import MenuDrawer from '../ui/MenuDrawer'
import { connect } from 'react-redux'

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
		"user": username
	}
}

const Container = connect(mapStateToProps)(MenuDrawer)

export default Container
