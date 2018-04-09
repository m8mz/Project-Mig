import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import UserPop from '../containers/UserPop'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 240,
    backgroundColor: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

class UserSelect extends React.Component {
  state = {
    open: false,
    value: this.props.user,
  };

  button = undefined;

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="Phone ringtone"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary="User Selection" secondary={this.state.value} />
          </ListItem>
          <UserPop
            classes={{
              paper: classes.dialog,
            }}
            open={this.state.open}
            onClose={this.handleClose}
            value={this.state.value}
          />
        </List>
      </div>
    );
  }
}

UserSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserSelect);
