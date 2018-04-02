import appReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const consoleMessages = store => next => action => {

	let result

	console.groupCollapsed(`dipatching action => ${action.type}`)
	console.log('page', store.getState().page)

	result = next(action)

	let grabState = store.getState()

	console.log(`

		state: ${JSON.stringify(grabState)}

		`)

	console.groupEnd()

	return result

}

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
