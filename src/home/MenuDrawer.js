import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Button from 'material-ui/Button'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import MenuIcon from 'material-ui-icons/Menu'

const styles = theme => ({
  list: {
    width: 150,
	 textAlign: "center",
  },
  menuIcon: {
	  minWidth: 40,
	  marginLeft: -12,
     marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
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
		  <List><Button href="https://bigewiki.com/index.php?title=Main_Page#" target="_blank" className={classes.button}>
        	Big E Wiki
        </Button></List>
        <Divider />
		  <List><Button href="https://tempeproserve.com/migwiki/Main_Page" target="_blank" className={classes.button}>
        	Mig Wiki
        </Button></List>
		  <Divider />
		  <List><Button href="https://drive.google.com/drive/folders/0B-bdZE4-eMTnTk93ZE51V0lDWWc" target="_blank" className={classes.button}>
        	Proserve Tools
        </Button></List>
		  <Divider />
        <List><Button href="http://helpdesk.bluehost.com/gui/index.php/tickets/overview/group/3844" target="_blank" className={classes.button}>
        	Cerberus
        </Button></List>
      </div>
    )

    return (
      <div>
        <Button className={classes.menuIcon} onClick={this.toggleDrawer('left', true)}><MenuIcon /></Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
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
