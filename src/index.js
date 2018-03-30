import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import HomeMenu from './home/ui/Menu'
import HomeTable from './home/containers/Table'
import storeFactory from './store'
import { Provider } from 'react-redux'
import initialState from './initialState.json'

export const AppStructure = () => {
	return (
		<div>
		<HomeMenu />
		<HomeTable />
		</div>
	)
}

export class App extends Component {
	render() {
		const store = storeFactory(initialState)
		window.React = React
		window.store = store
		return (
			 <Provider store={store}>
			 	<AppStructure />
			 </Provider>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#root'))
