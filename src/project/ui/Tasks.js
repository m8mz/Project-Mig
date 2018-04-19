import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Typography from 'material-ui/Typography'
import NavigateBefore from 'material-ui-icons/NavigateBefore'
import NavigateNext from 'material-ui-icons/NavigateNext'
import Button from 'material-ui/Button'
import axios from 'axios'

const styles = theme => ({
  root: {
    width: '100%',
		overflowX: "auto",
	 	maxWidth: 525,
		height: '50%',
    backgroundColor: theme.palette.background.paper,
	 	verticalAlign: "top",
	 	overflowY: "hidden",
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  listDisplay: {
	 	display: "inline-block",
		verticalAlign: "top"
  },
	listItemText: {
		overflowX: "auto",
		fontSize: "11!important"
	},
	listMax: {
		maxWidth: 165,
		paddingRight: 5
	}
})

class NestedList extends React.Component {
  state = {
		emailPage: 1,
		assigned_to: this.props.projectInfo.assigned_to
	}

  componentWillMount() {
	  const splitPath = (path) => {
		  let k
		  k = path.split("/")
		  return (k[k.length-1])
	  }
	  let proservID = splitPath(this.props.location.pathname)
	  this.props.onComponentWillMount(proservID)
  }
  componentWillReceiveProps(nextProps) {
	  this.setState({
		  assigned_to: nextProps.projectInfo.assigned_to
	  })
  }

	leftClick = () => {
		this.setState({
			emailPage: 1
		})
	}

	rightClick = () => {
		this.setState({
			emailPage: 2
		})
	}

	takeTicket = () => {
		const params = {
  		 user: this.props.user,
  		 provider: document.location.host.slice(2).replace(/\.com/, ''),
  		 service_type: 'websitetransfer',
  		 action: 'assign_transfer',
  		 lib: 'general',
  		 proserv_id: this.props.projectInfo.proserv_id,
		 toggle: (this.props.projectInfo.assigned_to === this.props.user) ? 'off' : 'on'
  	 	}
		axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${params.user}&provider=${params.provider}&service_type=${params.service_type}&action=${params.action}&lib=${params.lib}&proserv_id=${params.proserv_id}&on_off=${params.toggle}`).then((res) => {
  		 console.log(`
  				 Exit Code: ${res.data.success}
  				 Response: ${res.data.note}
  			 `)
  			 if (res.data.success === 1) {
  				 this.setState({
  					assigned_to: params.user
  				})
				if (params.toggle === 'off') {
					const splitPath = (path) => {
						let k
						k = path.split("/")
						return (k[k.length-1])
					}
					let proservID = splitPath(this.props.location.pathname)
					this.props.grabInfo(proservID)
				}
  			} else {
  				console.log(`Error: ${res.data.note}`)
  			}
		}).catch((error) => {
  			console.log("Issue with dispatching assigning API.. please report.")
		})
	}
	changeName = (name) => {
	   switch(name) {
		  case "emuniz":
			 return "Edward Muniz"
			case "edmuniz":
				return "Edward Muniz"
		  case "shunt":
			 return "Sarah Hunt"
		  case "mclarkson":
			 return "Miekkal Clarkson"
		  case "toyler":
			 return "Tyler Oyler"
		  case "aanselmo":
			 return "Tony Anselmo"
		  case "lbejarano":
			 return "Lucas Bejarano"
		  case "mhancock-gaillard":
			 return "Marcus HG"
			case "mhancockgaillard":
 			 return "Marcus HG"
		  case "rloader":
			 return "Riley Loader"
		  case "aldunn":
			 return "Alan Dunn"
		  default:
			 return "Take"
	  }
	}

  render() {
     const { classes, emailTasks=[], siteTasks=[], projectInfo } = this.props


	  const emailColumnsOne = (email, key) => {
		  if (this.state.emailPage === 1) {
			  return key < 5
		  } else if (this.state.emailPage === 2) {
			  return key > 9 && key < 15
		  }
	  }
	  const emailColumnsTwo = (email, key) => {
		  if (this.state.emailPage === 1) {
			  return key > 4 && key < 10
		  } else if (this.state.emailPage === 2) {
			  return key > 14 && key < 20
		  }
	  }

    return (
      <div className={classes.root}>
				<Typography align="left" variant="display1">
					Migration Project for {projectInfo.cpanel_user}
				</Typography>
				<Typography align="left" variant="subheading" style={{marginBottom: 15}}>
					Owner: {(this.changeName(this.state.assigned_to) === 'Take') ?
				 	<Button onClick={this.takeTicket} size="small">Take</Button> :
					<Button onClick={this.takeTicket} size="small">{this.changeName(this.state.assigned_to)}</Button>}
				</Typography>
        <List
          component="nav"
          subheader="Websites"
					className={classes.listDisplay}
        >
				<div className={classes.demo}>
					{(siteTasks.length !== 0) ?
						siteTasks.map((task, i) =>
						<List className={classes.listMax} dense={true} key={i}>
								<ListItem disableGutters dense>
									<ListItemText
										className={classes.listItemText}
										secondary={task.task_name.replace("www.", "")}
									/>
								</ListItem>
						</List>) :
						<List className={classes.listMax} dense={true}>
								<ListItem disableGutters dense>
									<ListItemText
										className={classes.listItemText}
										secondary="--None Submitted--"
									/>
								</ListItem>
						</List>
					}
					</div>
        </List>
				<List
					component="nav"
					subheader="Emails"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
					{(emailTasks.length !== 0) ?
						emailTasks.filter(emailColumnsOne).map((task, i) =>
							<List className={classes.listMax} dense={true} key={i}>
									<ListItem disableGutters dense>
										<ListItemText
											className={classes.listItemText}
											secondary={task.task_name.toLowerCase()}
										/>
									</ListItem>
							</List>) :
						<List className={classes.listMax} dense>
								<ListItem disableGutters dense>
									<ListItemText
										className={classes.listItemText}
										secondary="--None Submitted--"
									/>
								</ListItem>
						</List>
					}
					</div>
				</List>
				<List
					component="nav"
					subheader="&nbsp;"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
					{(emailTasks.length > 5) ?
						emailTasks.filter(emailColumnsTwo).map((task, i) =>
							<List className={classes.listMax} dense key={i}>
									<ListItem disableGutters dense>
										<ListItemText
											className={classes.listItemText}
											secondary={task.task_name.toLowerCase()}
										/>
									</ListItem>
							</List>) :
						<List className={classes.listMax} dense={true}>
								<ListItem disableGutters dense>
									<ListItemText
										className={classes.listItemText}
										secondary="&nbsp;"
									/>
								</ListItem>
						</List>
					}
					</div>
				</List>
				<div style={{textAlign:"center"}}>
					<Button size="small" variant="flat" aria-label="1-10" disabled={(this.state.emailPage === 1) ? true : false}
						onClick={this.leftClick}>
						<NavigateBefore style={{opacity: 0.5}}/>
					</Button>
					<Button size="small" variant="flat" aria-label="11-20" disabled={(this.state.emailPage === 2) ? true : (emailTasks.length > 10) ? false : true}
						onClick={this.rightClick}>
						<NavigateNext style={{opacity: 0.5}}/>
					</Button>
				</div>
      </div>
    )
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NestedList)
