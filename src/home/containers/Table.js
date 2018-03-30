import Table from '../ui/Table'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		data: state.service_list
	}
}

const Container = connect(mapStateToProps)(Table)

export default Container
