import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: {
    width: '100%',
	 maxWidth: 525,
    backgroundColor: theme.palette.background.paper,
	 verticalAlign: "top",
	 overflowY: "auto"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  listDisplay: {
	 display: "inline-block",
  }
})

class NestedList extends React.Component {
  state = { open: true }

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

  render() {
    const { classes, tasks={} } = this.props
	 console.log(tasks)

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
						<List dense={true}>
								<ListItem>
									<ListItemText
										secondary="domain.com"
									/>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem>
                    <ListItemText
                      secondary="bluehost.com"
                    />
                  </ListItem>
              </List>
            </div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem>
                    <ListItemText
                      secondary="endurance.com"
                    />
                  </ListItem>
              </List>
            </div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem>
                    <ListItemText
                      secondary="ipage.com"
                    />
                  </ListItem>
              </List>
            </div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem>
                    <ListItemText
                      secondary="hostgator.com"
                    />
                  </ListItem>
              </List>
            </div>
        </List>
				<List
					component="nav"
					subheader="Emails"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem>
									<ListItemText
										secondary="admin@gmail.com"
									/>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="marcus@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="edward@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="lucas@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="tyler@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
				</List>
				<List
					component="nav"
					subheader={<span style={{opacity:0.0}}>more</span>}
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem>
									<ListItemText
										secondary="admin@gmail.com"
									/>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="marcus@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="edward@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="lucas@gmail.com"
										/>
									</ListItem>
							</List>
						</div>
					<div className={classes.demo}>
							<List dense={true}>
									<ListItem>
										<ListItemText
											secondary="tyler@gmail.com"
										/>
									</ListItem>
							</List>
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
