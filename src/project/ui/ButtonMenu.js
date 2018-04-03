import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit / 1.3,
  },
})

class FlatButtons extends Component {
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
		const { classes, projectInfo } = this.props
		const url = '/cgi/admin/user/cpanel/' + projectInfo.domain
		const migrationPage = '/cgi/admin/proservice/websitetransfer?provider=' + projectInfo.provider + '&id=' + projectInfo.proserv_id
		const cpanelPage = '/cgi/admin/user/cpanel_login/' + projectInfo.domain + '?goto_uri=%2Ffrontend%2F' + projectInfo.provider + '%2Findex.html'
		const fmPage = '/cgi/admin//user/cpanel_login/' + projectInfo.domain + '?goto_uri=%2Ffrontend%2F' + projectInfo.provider + '%2Ffilemanager%2Findex.html%3Fdirselect%3Dwebroot%26showhidden%3D1'
		const dmPage = '/cgi/admin/user/account_admin/' + projectInfo.domain + '?bounce_step=dm'
		const pmaPage = '/cgi/admin/user/phpmyadmin_login/' + projectInfo.domain
		const emailPage = '/cgi/admin/user/cpanel_login/' + projectInfo.domain + '?goto_uri=%2Ffrontend%2F' + projectInfo.provider + '%2Fmail%2Fpops.html'
		const dbPage = '/cgi/admin/user/cpanel_login/' + projectInfo.domain + '?goto_uri=%2Ffrontend%2F' + projectInfo.provider + '%2Fsql%2Findex.html'
		const ftpPage = '/cgi/admin/user/cpanel_login/' + projectInfo.domain + '?goto_uri=%2Ffrontend%2F' + projectInfo.provider + '%2Fftp%2Faccounts.html'
		return (
			<div>
			  <Button href={url} target="_blank" variant="raised" color="primary" className={classes.button}>
				  cPM
			  </Button>
			  <Button href={migrationPage} target="_blank" variant="raised" color="primary" className={classes.button}>
				 Migration
			  </Button>
			  <Button href={cpanelPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 cPanel
			  </Button>
				  <Button href={fmPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 File Manager
			  </Button>
				  <Button href={dmPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 Domain Manager
			  </Button>
				  <Button href={pmaPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 phpMyAdmin
			  </Button>
				  <Button href={emailPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 Email
			  </Button>
				  <Button href={dbPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 MySQL
			  </Button>
				  <Button href={ftpPage} target="_blank" variant="flat" color="primary" className={classes.button}>
				 FTP
			  </Button>
				<Button size="small" variant="flat" color="primary" disabled className={classes.button}>
				 Purchased: {projectInfo.added.replace(/(\d{1,2}:?){3} \w{2}/, '')}
				</Button>
				<Button size="small" variant="flat" color="primary" disabled className={classes.button}>
				 Status: {projectInfo.proserv_status}
				</Button>
			</div>
		)
	}
}

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FlatButtons)
