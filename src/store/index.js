import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dipatching action => ${action.type}`)
	console.log('page', store.getState().page)

	result = next(action)

	let { projectList, rowsPerPage, page, infoReceived, inProgress, waitingForCustomer, agentReview, customerReview } = store.getState()

	console.log(`

		projectList: ${projectList.length}
		RowsPerPage: ${rowsPerPage}
		Page: ${page}
		infoReceived: ${infoReceived}
		inProgress: ${inProgress}
		waitingForCustomer: ${waitingForCustomer}
		agentReview: ${agentReview}
		customerReview: ${customerReview}

		`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
