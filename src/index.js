import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import HomeMenu from './home/Menu'
import HomeTable from './home/Table'
import initialState from './initialState.json'
import appReducer from './store/reducers'
import { createStore } from 'redux'

const store = createStore()

export class App extends Component {
	render() {
		return (
		 <div>
		 	<HomeMenu />
			<HomeTable
				appState={state}
			/>
		 </div>
		)
	}
}

ReactDOM.render(<App />, document.querySelector('#root'))
