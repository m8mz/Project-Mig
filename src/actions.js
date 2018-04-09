import C from './constants'
import axios from 'axios'

export const changePage = (page=0) => ({
	type: C.CHANGE_PAGE,
	payload: page
})

export const changeRowsPerPage = (rows=15) => ({
	type: C.CHANGE_ROWS_PER_PAGE,
	payload: rows
})

export const infoReceived = boolean => ({
	type: C.INFO_RECEIVED,
	payload: !boolean
})

export const inProgress = boolean => ({
	type: C.IN_PROGRESS,
	payload: !boolean
})

export const waitingForCustomer = boolean => ({
	type: C.WAITING_FOR_CUSTOMER,
	payload: !boolean
})

export const agentReview = boolean => ({
	type: C.AGENT_REVIEW,
	payload: !boolean
})

export const customerReview = boolean => ({
	type: C.CUSTOMER_REVIEW,
	payload: !boolean
})

export const projectInfoAPI = proservID => (dispatch, getState) => {

	if (!getState().infoAPI) {
		dispatch({
			type: C.API_INFO
		})
			axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_tinfo&proserv_id=${proservID}`)
					.then(res => {
						let info = res.data.tinfo
						dispatch({
							type: C.PROJECT_INFO,
							payload: info
						})
					})
					.catch(error => {
						console.log("Issue with dispatching Info API.. please report.")
						dispatch({
							type: C.API_INFO_OFF
						})
					})
	}
}

export const projectTasksAPI = proservID => (dispatch, getState) => {
	dispatch({
		type: C.API_TASKS
	})
	axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_task_list&proserv_id=${proservID}`)
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

				console.log("Issue with dispatching Task API.. please report.")

				dispatch({
					type: C.API_TASKS_OFF
				})

			})
}

export const projectNotesAPI = proservID => (dispatch, getState) => {
	dispatch({
		type: C.API_NOTES
	})
	axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=general&get_tickets=1&action=get_proserv_notes&proserv_id=${proservID}`)
			.then(res => {
				let notes = res.data.history
				dispatch({
					type: C.PROJECT_NOTES,
					payload: notes
				})
			})
			.catch(error => {

				console.log("Issue with dispatching Notes API.. please report.")

				dispatch({
					type: C.API_NOTES_OFF
				})

			})
}

export const projectListAPI = () => (dispatch, getState) => {
	dispatch({
		type: C.API_PROJECTS
	})

	axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_service_list`)
			.then(res => {
				let list = res.data.service_list
				dispatch({
					type: C.PROJECT_LIST,
					payload: list
				})
			})
			.catch(error => {

				console.log("Issue with dispatching Project List API.. please report.")

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

export const searchProjects = value => (dispatch, getState) => {
	dispatch({
		type: C.SEARCH
	})

	axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_service_list&search_string=${value}`)
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
					type: C.SEARCH_OFF
				})

			})
}

export const clearSearch = () => (dispatch, getState) => {
	dispatch({
		type: C.SEARCH_OFF
	})
}
