import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import HomeMenu from './home/containers/Menu'
import HomeTable from './home/containers/Table'
import ProjectPaper from './project/ui/'
import storeFactory from './store'
import { Provider } from 'react-redux'
import initialState from './initialState.json'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import C from './constants'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import './style.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const Home = () => {
	return (
		<MuiThemeProvider theme={theme}>
		<HomeMenu />
		<HomeTable />
		</MuiThemeProvider>
	)
}

export const Project = () => {
	return (
		<MuiThemeProvider theme={theme}>
		<HomeMenu />
		<ProjectPaper />
		</MuiThemeProvider>
	)
}

export class App extends Component {
	render() {
		const store = storeFactory(initialState)
		store.dispatch({
			type: C.CHANGE_USER,
			payload: (document.getElementsByClassName("menuprov")[0]) ? document.getElementsByClassName("menuprov")[0].nextElementSibling.title : 'none'
		})
		store.dispatch({
			type: C.NEW_STATUS,
			payload: (localStorage.getItem('newStatus') === "On") ? false : false
		})
		store.dispatch({
			type: C.INFO_RECEIVED,
			payload: (localStorage.getItem('infoReceived') === "On") ? true : (localStorage.getItem('infoReceived') === "Off") ? false : true
		})
		store.dispatch({
			type: C.IN_PROGRESS,
			payload: (localStorage.getItem('inProgress') === "On") ? true : false
		})
		store.dispatch({
			type: C.WAITING_FOR_CUSTOMER,
			payload: (localStorage.getItem('waitingForCustomer') === "On") ? true : false
		})
		store.dispatch({
			type: C.AGENT_REVIEW,
			payload: (localStorage.getItem('agentReview') === "On") ? true : false
		})
		store.dispatch({
			type: C.CUSTOMER_REVIEW,
			payload: (localStorage.getItem('customerReview') === "On") ? true : false
		})
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
