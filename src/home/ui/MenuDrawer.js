import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'
import UserSelect from '../containers/UserSelect'

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
