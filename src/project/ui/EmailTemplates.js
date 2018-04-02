import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
	 display: "inline-block",
	 verticalAlign: "top"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
	listDisplay: {
		display: "inline-block",
		verticalAlign: "top"
	}
});

class NestedList extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
				<Typography align="left" variant="display1" style={{marginBottom: 15}}>
					Email Templates:
				</Typography>
        <List
          component="nav"
          subheader={<span style={{opacity:0.2}}>Canned Replies</span>}
					className={classes.listDisplay}
        >
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem disableGutters>
									<ListItemText>
										<Button size="small">Request Info</Button>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button size="small">Start Migration</Button>
										</ListItemText>
                  </ListItem>
              </List>
            </div>
        </List>
				<List
					component="nav"
					subheader="&nbsp;"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem disableGutters>
									<ListItemText>
										<Button size="small">Review Migration</Button>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button size="small">Complete Migration</Button>
										</ListItemText>
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
								<ListItem disableGutters>
									<ListItemText>
										<Button size="small">Refund Migration</Button>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button size="small">Bad Credentials</Button>
										</ListItemText>
                  </ListItem>
              </List>
            </div>
				</List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
