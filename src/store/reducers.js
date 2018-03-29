import C from '../constants'

export const filter = (state=false, action) => {

	switch(action.type) {
		case C.FILTER_TRUE :
			return true

		case C.FILTER_FALSE :
			return false

		default:
			return state
	}
}
