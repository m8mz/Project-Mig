import C from '../constants'
import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import initialState from '../initialState.json'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log('State Before', store.getState())
	result = next(action)
	console.log('State After', store.getState())
	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(consoleMessages)(createStore)(appReducer, initialState)
}
