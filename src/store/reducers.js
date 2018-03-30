import C from '../constants'
import { combineReducers } from 'redux'

const state = 10

const action = {
	type: C.FILTER_TOGGLE,
	payload: false
}

export const filter = (state=false, action) => {

	switch(action.type) {
		case C.FILTER_TOGGLE :
			function toggleState(state) {
				var newState = !state
				return newState
			}
			return toggleState(state)

		default:
			return state
	}
}

export default combineReducers({
	filter,
})
