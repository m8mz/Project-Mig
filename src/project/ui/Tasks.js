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

const styles = theme => ({
  root: {
    width: '100%',
		overflowX: "-webkit-paged-x",
	 	maxWidth: 525,
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
		overflow: "-webkit-paged-x",
	}
})

class NestedList extends React.Component {
  state = {
		open: true,
		tasks: {
			site_tasks: [
				{"task_name": "newteasfasdfasdfkk.com"},
				{"task_name": "google.com"},
				{"task_name": "bluehost.com"},
				{"task_name": "ipage.com"},
				{"task_name": "hostgator.com"},
			],
			email_tasks: [
				{"task_name": "admin@gmail.com"},
				{"task_name": "marasdfasdfssacus@gmail.com"},
				{"task_name": "test@gmail.com"},
				{"task_name": "new@gmail.com"},
				{"task_name": "agent@gmail.com"},
				{"task_name": "support@gmail.com"},
				{"task_name": "bluehost@gmail.com"},
				{"task_name": "hostmonster@gmail.com"},
				{"task_name": "shit@gmail.com"},
				{"task_name": "news@gmail.com"},
				{"task_name": "toys@gmail.com"},
				{"task_name": "code@gmail.com"},
				{"task_name": "reply@gmail.com"},
				{"task_name": "web@gmail.com"},
				{"task_name": "sky@gmail.com"},
				{"task_name": "cpanel@gmail.com"},
				{"task_name": "mariah@gmail.com"},
				{"task_name": "tanae@gmail.com"},
				{"task_name": "anthony@gmail.com"},
				{"task_name": "secret@gmail.com"},
			]
		},
		emailPage: 1
	}

  handleClick = () => {
    this.setState({ open: !this.state.open })
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

  render() {
    const { classes, tasks={} } = this.props
	  console.log(tasks)

		const num = (this.state.emailPage === 2) ? 10 : 0

    return (
      <div className={classes.root}>
				<Typography align="left" variant="display1" style={{marginBottom: 15}}>
					Project Tasks:
				</Typography>
        <List
          component="nav"
          subheader="Websites"
					className={classes.listDisplay}
        >
				<div className={classes.demo}>
					{this.state.tasks.site_tasks.map((task, i) =>
						<List style={{maxWidth: 125}} dense={true} key={i}>
								<ListItem>
									<ListItemText
										className={classes.listItemText}
										secondary={task.task_name}
									/>
								</ListItem>
						</List>
					)}
					</div>
        </List>
				<List
					component="nav"
					subheader="Emails"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
					{[...Array(5)].map((_, i) =>
						<List style={{maxWidth: 195}} dense={true} key={i}>
								<ListItem>
									<ListItemText
										className={classes.listItemText}
										secondary={this.state.tasks.email_tasks[i+num].task_name}
									/>
								</ListItem>
						</List>
					)}
					</div>
				</List>
				<List
					component="nav"
					subheader="&nbsp;"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
					{[...Array(5)].map((_, i) =>
						<List style={{maxWidth: 195}} dense={true} key={i}>
								<ListItem>
									<ListItemText
										className={classes.listItemText}
										secondary={this.state.tasks.email_tasks[i+5+num].task_name}
									/>
								</ListItem>
						</List>
					)}
					</div>
					<div style={{position: "relative",right: "40%"}}>
						<Button size="small" variant="flat" aria-label="1-10" disabled={(this.state.emailPage === 1) ? true : false}
							onClick={this.leftClick}>
							<NavigateBefore style={{opacity: 0.5}}/>
						</Button>
						<Button size="small" variant="flat" aria-label="11-20" disabled={(this.state.emailPage === 2) ? true : false}
							onClick={this.rightClick}>
							<NavigateNext style={{opacity: 0.5}}/>
						</Button>
					</div>
				</List>
      </div>
    )
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NestedList)
