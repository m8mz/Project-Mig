import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import ConfirmationDialog from './ConfirmationDialog'

const options = [
  'None',
  'Marcus',
	'Edward',
	'Tyler',
	'Tony',
	'Lucas',
	'Miekkal',
	'Sarah'
];

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

class ConfirmationDialogDemo extends React.Component {
  state = {
    open: false,
		value: this.props.user
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
          <ListItem button divider disabled>
            <ListItemText primary="User Selection" />
          </ListItem>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-label="User Selection"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary="Click to change" secondary={this.state.value} />
          </ListItem>
          <ConfirmationDialog
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

ConfirmationDialogDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialogDemo);
