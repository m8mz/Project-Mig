import C from '../constants'
import { combineReducers } from 'redux'

export const projectList = (state=[], action) => {
	switch(action.type) {
		case C.PROJECT_LIST :
			return action.payload
		default :
			return state
	}
}

export const projectAPI = (state=false, action) => {
	switch(action.type) {
		case C.API_PROJECTS :
			return true
		case C.API_PROJECTS_OFF :
			return false
		case C.PROJECT_LIST :
			return false
		default :
			return state
	}
}

export const rowsPerPage = (state=15, action) => {
	if (action.type === "CHANGE_ROWS_PER_PAGE") {
		return parseInt(action.payload, 10)
	} else {
		return state
	}
}

export const page = (state=0, action) => {
	if (action.type === "CHANGE_PAGE") {
		return parseInt(action.payload, 10)
	} else {
		return state
	}
}

export const infoReceived = (state=false, action) => {
	switch(action.type) {
		case C.INFO_RECEIVED :
			return action.payload
		default :
			return state
	}
}

export const inProgress = (state=false, action) => {
	switch(action.type) {
		case C.IN_PROGRESS :
			return action.payload
		default :
			return state
	}
}

export const waitingForCustomer = (state=false, action) => {
	switch(action.type) {
		case C.WAITING_FOR_CUSTOMER :
			return action.payload
		default :
			return state
	}
}

export const agentReview = (state=false, action) => {
	switch(action.type) {
		case C.AGENT_REVIEW :
			return action.payload
		default :
			return state
	}
}

export const customerReview = (state=false, action) => {
	switch(action.type) {
		case C.CUSTOMER_REVIEW :
			return action.payload
		default :
			return state
	}
}

export const projectInfo = (state={}, action) => {
	switch(action.type) {
		case C.PROJECT_INFO :
			return action.payload
		default :
			return state
	}
}

export const emailTasks = (state=[], action) => {
	switch(action.type) {
		case C.EMAIL_TASKS :
			return action.payload
		default :
			return state
	}
}

export const siteTasks = (state=[], action) => {
	switch(action.type) {
		case C.SITE_TASKS :
		return action.payload
		default :
			return state
	}
}

export const notes = (state=[], action) => {
	switch(action.type) {
		case C.PROJECT_NOTES :
			return action.payload
		case C.ADD_NOTE :
			return [
				...state,
				action.payload
			]
		default :
			return state
	}
}

export const infoAPI = (state=false, action) => {
	switch(action.type) {
		case C.API_INFO :
			return true
		case C.API_INFO_OFF :
			return false
		case C.PROJECT_INFO :
			return false
		default :
			return state
	}
}

export const tasksAPI = (state=false, action) => {
	switch(action.type) {
		case C.API_TASKS :
			return true
		case C.API_TASKS_OFF :
			return false
		case C.SITE_TASKS :
			return false
		default :
			return state
	}
}

export const notesAPI = (state=false, action) => {
	switch(action.type) {
		case C.API_NOTES :
			return true
		case C.API_NOTES_OFF :
			return false
		case C.PROJECT_NOTES :
			return false
		default :
			return state
	}
}

export const userSelect = (state="", action) => {
	if ( action.type === C.CHANGE_USER ) {
		return action.payload
	} else {
		return state
	}
}

export default combineReducers({
	projectList,
	projectAPI,
	rowsPerPage,
	page,
	infoReceived,
	inProgress,
	waitingForCustomer,
	agentReview,
	customerReview,
	projectInfo,
	emailTasks,
	siteTasks,
	notes,
	infoAPI,
	tasksAPI,
	notesAPI,
	userSelect
})
