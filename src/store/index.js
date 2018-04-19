import appReducer from './reducers'
import C from '../constants'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const consoleMessages = store => next => action => {

	let result

	// console.groupCollapsed(`dipatching action => ${action.type}`)

	if ( action.type === C.CHANGE_USER ) {
		if (localStorage.getItem('user') !== action.payload) {
			localStorage.setItem('user', action.payload)
		}
	} else if ( action.type === C.NEW_STATUS ) {
		if (localStorage.getItem('newStatus') !== action.payload) {
			localStorage.setItem('newStatus', (action.payload) ? 'On' : 'Off')
		}
	} else if ( action.type === C.INFO_RECEIVED ) {
		if (localStorage.getItem('infoReceived') !== action.payload) {
			localStorage.setItem('infoReceived', (action.payload) ? 'On' : 'Off')
		}
	} else if ( action.type === C.IN_PROGRESS ) {
		if (localStorage.getItem('inProgress') !== action.payload) {
			localStorage.setItem('inProgress', (action.payload) ? 'On' : 'Off')
		}
	} else if ( action.type === C.WAITING_FOR_CUSTOMER ) {
		if (localStorage.getItem('waitingForCustomer') !== action.payload) {
			localStorage.setItem('waitingForCustomer', (action.payload) ? 'On' : 'Off')
		}
	} else if ( action.type === C.AGENT_REVIEW ) {
		if (localStorage.getItem('agentReview') !== action.payload) {
			localStorage.setItem('agentReview', (action.payload) ? 'On' : 'Off')
		}
	} else if ( action.type === C.CUSTOMER_REVIEW ) {
		if (localStorage.getItem('customerReview') !== action.payload) {
			localStorage.setItem('customerReview', (action.payload) ? 'On' : 'Off')
		}
	}

	result = next(action)

	// let grabState = store.getState()
	//
	// console.log(`
	//
	// 	state: ${JSON.stringify(grabState)}
	//
	// 	`)
	//
	// console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
