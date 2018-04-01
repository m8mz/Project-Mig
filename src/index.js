import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import HomeMenu from './home/ui/Menu'
import HomeTable from './home/containers/Table'
import ProjectPaper from './project/ui/'
import storeFactory from './store'
import { Provider } from 'react-redux'
import initialState from './initialState.json'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export const Home = () => {
	return (
		<div>
		<HomeMenu />
		<HomeTable />
		</div>
	)
}

export const Project = () => {
	return (
		<div>
		<HomeMenu />
		<ProjectPaper />
		</div>
	)
}

export class App extends Component {
	render() {
		const store = storeFactory(initialState)
		return (
			 <Provider store={store}>
			 {(this.props.location.pathname.match(/\/cgi\/admin\/proservice\/?$/)) ?
						 <div>
						 <Home />
						 </div>
				 : (this.props.location.pathname.match(/\/cgi\/admin\/proservice\/project\/\d+\/?$/)) ?
						 <div>
						 <Route path="/cgi/admin/proservice/project/:id" component={Project} />
						 </div>
				 :
						 <div>
						 404 not found
						 </div>}
			 </Provider>
		)
	}
}

ReactDOM.render(
	<Router>
	<Switch>
		<Route path="/cgi/admin/proservice" component={App}/>
		<Route path="/cgi/admin/proservice/project" component={App}/>
	</Switch>
	</Router>, document.querySelector('#root'))
