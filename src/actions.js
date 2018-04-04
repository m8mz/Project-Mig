import C from './constants'
import axios from 'axios'

function toggleFilter(boolean) {
	return !boolean
}

export const changePage = (page=0) => ({
	type: C.CHANGE_PAGE,
	payload: page
})

export const changeRowsPerPage = (rows=15) => ({
	type: C.CHANGE_ROWS_PER_PAGE,
	payload: rows
})

export const infoReceived = (toggleState) => ({
	type: C.INFO_RECEIVED,
	payload: toggleFilter(toggleState)
})

export const inProgress = (toggleState) => ({
	type: C.IN_PROGRESS,
	payload: toggleFilter(toggleState)
})

export const waitingForCustomer = (toggleState) => ({
	type: C.WAITING_FOR_CUSTOMER,
	payload: toggleFilter(toggleState)
})

export const agentReview = (toggleState) => ({
	type: C.AGENT_REVIEW,
	payload: toggleFilter(toggleState)
})

export const customerReview = (toggleState) => ({
	type: C.CUSTOMER_REVIEW,
	payload: toggleFilter(toggleState)
})

export const projectInfoAPI = proservID => (dispatch, getState) => {

	dispatch({
		type: C.API_INFO
	})

	axios.get(`https://i.bluehost.com/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_tinfo&proserv_id=${proservID}`)
			.then(res => {
				let info = res.data.tinfo
				dispatch({
					type: C.PROJECT_INFO,
					payload: info
				})
			})
			.catch(error => {

				console.log(error)

				dispatch({
					type: C.API_INFO_OFF
				})

			})

}

export const projectTasksAPI = proservID => (dispatch, getState) => {
	dispatch({
		type: C.API_TASKS
	})
	axios.get(`https://i.bluehost.com/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_task_list&proserv_id=${proservID}`)
			.then(res => {
				let emails = res.data.email_tasks
				let sites = res.data.site_tasks
				dispatch({
					type: C.EMAIL_TASKS,
					payload: emails
				})
				dispatch({
					type: C.SITE_TASKS,
					payload: sites
				})
			})
			.catch(error => {

				console.log(error)

				dispatch({
					type: C.API_TASKS_OFF
				})

			})
}

export const projectNotesAPI = proservID => (dispatch, getState) => {
	dispatch({
		type: C.API_NOTES
	})
	axios.get(`https://i.bluehost.com/cgi/admin/proservice/ajax?lib=general&action=get_proserv_notes&proserv_id=${proservID}`)
			.then(res => {
				let notes = res.data.history
				dispatch({
					type: C.PROJECT_NOTES,
					payload: notes
				})
			})
			.catch(error => {

				console.log(error)

				dispatch({
					type: C.API_NOTES_OFF
				})

			})
}

export const projectListAPI = () => (dispatch, getState) => {
	dispatch({
		type: C.API_PROJECTS
	})

	axios.get(`https://i.bluehost.com/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_service_list`)
			.then(res => {
				let list = res.data.service_list
				dispatch({
					type: C.PROJECT_LIST,
					payload: list
				})
			})
			.catch(error => {

				console.log(error)

				dispatch({
					type: C.API_PROJECTS_OFF
				})

			})
}

export const addNote = fullNote => (dispatch, getState) => {
	dispatch({
		type: C.ADD_NOTE,
		payload: fullNote
	})
}

export const changeUser = user => (dispatch, getState) => {
	dispatch({
		type: C.CHANGE_USER,
		payload: user
	})
}
