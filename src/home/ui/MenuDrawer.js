import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import FindReplace from 'material-ui-icons/FindReplace'
import UserSelect from '../containers/UserSelect'
import Tooltip from 'material-ui/Tooltip'
import axios from 'axios'

const styles = theme => ({
  list: {
    width: "100%",
	  textAlign: "left",
  },
  menuIcon: {
	  minWidth: 50,
	  marginLeft: -12,
    marginRight: -5,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  scanProjects = () => {
	  const checkAge = age => {
		  const k = Math.round(new Date().getTime() / 1000)
		  let result = Math.round((k - age) / 60 / 60 / 24)
		  return result
	  }
	  const params = {
		user: this.props.user,
		provider: document.location.host.slice(2).replace(/\.com/, ''),
		service_type: 'websitetransfer',
		action: 'update_status',
		lib: 'general',
		new_status: 'agent_review'
	  }
	  axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_service_list&get_new=1`).then(res => {
		  let newProjects = res.data.service_list
		  // TODO perform the check for new projects older than 14 days
		  let oldProjects = newProjects.filter(project => checkAge(project.age_sec) >= 7)
		  oldProjects.map(project =>
			  axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&new_status=${params.new_status}&proserv_id=${project.proserv_id}`)
			  .then((res) => {
				console.log(`
						Exit Code: ${res.data.success}
						Response: ${res.data.note}
					`)
					if (res.data.success === 1) {
						console.log(`Sent Project ID: ${project.proserv_id} to Agent Review.`)
				  } else {
					  console.log(`Error: ${res.data.note}`)
				  }})
				  .catch((error) => {
			  console.log(`Issue with the status API for ${project.proserv_id}.. please report.`)
			 })
		 )
	  })
	  .catch(error => {
		  console.log("Issue with scanning new projects.. please report.")
	  })
	  axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=websitetransfer&action=get_service_list`).then(res => {
		  let projects = res.data.service_list
		  // TODO perform the check for the rest of the projects older than 14 days from last response
		  let newList = projects.filter(project => project.status_name === "customer_review" || project.status_name === "waiting_for_cust")
		  const newArray = []
		  newList.map(project => newArray.push(project.proserv_id))
		  newArray.map(id =>
			  axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?lib=general&get_tickets=1&action=get_proserv_notes&proserv_id=${id}`)
		  			.then(res => {
		  				let notes = res.data.history
						if (checkAge(notes[0].utime) >= 7) {
								axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&new_status=${params.new_status}&proserv_id=${id}`)
						  	 	.then((res) => {
						  		 console.log(`
						  				 Exit Code: ${res.data.success}
						  				 Response: ${res.data.note}
						  			 `)
						  			 if (res.data.success === 1) {
						  				 console.log(`Sent Project ID: ${id} to Agent Review.`)
						  		   } else {
						  			   console.log(`Error: ${res.data.note}`)
						  		   }})
						  			.catch((error) => {
						  		console.log(`Issue with the status API for ${id}.. please report.`)
						     })
						}
		  			})
		  			.catch(error => {

		  				console.log(`Issue with dispatching Notes API for ${id}.. please report.`)

		  			})
		  )
	  })
	  .catch(error => {
		  console.log("Issue with scanning the rest of the projects.. please report.")
	  })
  }

  render() {
    const { classes } = this.props

    const sideList = (
      <div className={classes.list}>
		  <Button href="https://bigewiki.com/index.php?title=Main_Page#" target="_blank" className={classes.button}>
        	Big E Wiki
        </Button>
		  <Button href="https://tempeproserve.com/migwiki/Main_Page" target="_blank" className={classes.button}>
        	Mig Wiki
        </Button>
		  <Button href="https://drive.google.com/drive/folders/0B-bdZE4-eMTnTk93ZE51V0lDWWc" target="_blank" className={classes.button}>
        	Proserve Tools
        </Button>
        <Button href="http://helpdesk.bluehost.com/gui/index.php/tickets/overview/group/3844" target="_blank" className={classes.button}>
        	Cerberus
        </Button>
		  <Tooltip id="tooltip-fab" title="Scan for Agent Review">
		  <Button mini variant="fab" className={classes.button}
		  onClick={this.scanProjects}><FindReplace /></Button>
		  </Tooltip>
			<Divider />
      </div>
    )

    return (
      <div>
        <Button className={classes.menuIcon} onClick={this.toggleDrawer('top', true)}><MenuIcon /></Button>
        <Drawer variant="persistent" anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
				onKeyDown={this.toggleDrawer('top', false)}
          >
            {sideList}
				<UserSelect />
          </div>
        </Drawer>
      </div>
    )
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TemporaryDrawer)
