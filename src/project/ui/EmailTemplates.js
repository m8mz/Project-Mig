import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import StatusStepper from '../containers/StatusStepper'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { FormControl } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'
import axios from 'axios'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
	 	display: "inline-block",
	 	verticalAlign: "top",
		textAlign: "center"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
	listDisplay: {
		display: "inline-block",
		verticalAlign: "top"
	},
	demo: {
		textAlign: "center",
		width: 150
	},
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 220,
		textAlign: "center"
  },
})

class NestedList extends React.Component {
  state = {
		open: false,
    name: 'None',
	}

  handleClick = () => {
    this.setState({ open: !this.state.open })
		{(!this.state.open) ? this.setState({
			name: 'None'
		}) : null}
  }

	handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes, sites, emails, user } = this.props
		const requestInfo = () => {
		let requestInfo =	`Hello,

Thank you for choosing Professional Services and purchasing our website transfer service. We received your migration request but need some information to get started. We prefer you fill out our form:
https://my.${document.location.host.slice(2)}/cgi/services/migration

Alternatively you can reply directly with the information requested below. If you have WordPress please note that the username and password we need will not be your WordPress dashboard login credentials but rather your old hosting provider login credentials.

Old host name:
Old host login link:
Old host user:
Old host pass:

List of sites to be moved:

List of emails to be moved with their passwords and the IMAP mail server address:

# IMPORTANT DISCLAIMER
An email transfer does not include mailing lists, email forwarders, contacts, address books, auto responders or calendars.

Once we have that we'll go ahead and manually move forward with the migration.

Regards,
${user}
Professional Services`
		document.getElementById('bootstrap-input').value = requestInfo
		}
		const startMigration = () => {
		let startMigration =	`Hello,

We were able to start the website transfer. Listed below are the sites and/or emails submitted.

Site(s):
${sites.map(site => site.task_name).join('\n')}

Email(s):
${emails.map(email => email.task_name).join('\n')}

Once we are done mirroring over the data we will let you know so you can review our work to make sure it is correct. Please don't make any changes to the site as this will only delay the migration process.

Also please leave your DNS with your old host until we have final approval that the migration was done correctly. Any custom DNS, such as TXT records, MX records for third party mail providers, etc., will not be migrated.

Sincerely,
${user}
Professional Services`
		document.getElementById('bootstrap-input').value = startMigration
		}
		const reviewMigration = () => {
		let reviewMigration =	`Hello,

We have mirrored over the data and would like you to review our work to make sure everything looks correct to you. Please don't make any changes yet. Once you have reviewed things please reply as soon as possible with any concerns you have. If everything is correct, please send us an approval and we can proceed in helping to make your site live on your new server with us. You can view the sites through these direct URLs:
--TEMP URLS--

There may be issues that show up on the direct urls, but will be fine once the site is live. Please let us know if you see anything out of place.

The existing messages for the following email accounts have been copied to our server as well:
${emails.map(email => email.task_name).join('\n')}

To check the email, first change the passwords by logging into your hosting account > email > Email Manager > view details. After that you can access webmail here:

https://${document.location.host.slice(2)}/webmail

Be aware that you may need to set passwords again later if for any reason we have to try recopying email.

Note that this doesn't mean the migration is finished, so please don't change the DNS yet. At this point you'll have up to 14 days from today to review what has been migrated. You will need to reply to this message to let us know whether or not there are any issues so that we can address them. Once all issues have been addressed we will provide the final steps of the migration.

Sincerely,
${user}
Professional Services`
		document.getElementById('bootstrap-input').value = reviewMigration
		}
		const completeMigration = () => {
		let completeMigration =	`Hello,

Per your request we have copied the files and databases for your websites to our servers. Please take a moment to review the items below.

The following sites were copied and configured:


After the site was moved we did all the testing we could to ensure there were no problems with the site. Optionally, if you wish to verify the move prior to the DNS updates discussed below, you can update your host file to pull our IP address for the domain instead of the current host. This forces your computer to load from our system while the rest of the world still sees the old one. We have included a help article below, but cannot assist with the change itself as it must be performed locally. Again, this is an optional step.

https://www.howtogeek.com/howto/27350/

Add the entry:

${sites.map(site => '127.0.0.1 '+site.task_name.replace(/www\./, '')+' www.'+site.task_name.replace(/www\./, '')).join('\n')}

The existing messages for the following email accounts have been copied to our server as well:
${emails.map(email => email.task_name).join('\n')}

To check the email, first change the passwords by logging into your hosting account > email > Email Manager > view details. After that you can access webmail here:
https://${document.location.host.slice(2)}/webmail

At this point you'll have up to 14 days from today to review what has been migrated. You will need to reply to this message to let us know whether or not there are any issues so that we can address them. Once all issues have been addressed, what you'll need to do to wrap the migration up is change your nameservers to the following:

ns1.${document.location.host.slice(2)}
ns2.${document.location.host.slice(2)}

# IMPORTANT
We must stress that performing these DNS updates should happen immediately after confirming everything looks good. Changes made to your website between when we started your migration and when you update your DNS will not reflect on the migrated version. This means that you are liable to lose updates and will need to recreate them on your end. In these cases, unfortunately, you will not be eligible for re-migration.

Sincerely,
${user}
Professional Services`
		document.getElementById('bootstrap-input').value = completeMigration
		}
		const refundMigration = () => {
		let refundMigration =	`Hello,

We've refunded the website transfer service fee. All credits are being processed and will be sent by the next business day. It may take up to 5 additional business days for your financial institution to place the credit into your account.

Regards,
${user}
Professional Services`
		axios.get(`https://bluehostproservices.com/websitetransfer/apps/migtool/refunds/submit.php?migid=${proserv_id}&reasonid=${reason}&timestamp=${time}&brandname=${document.location.host.slice(2).replace(/\.com/, '')}&comment=${comment}`)
		axios.get(`https://${document.location.host}/cgi/admin/proservice/ajax?user=${user}&provider=${document.location.host.slice(2).replace(/\.com/, '')}&action=update_flag&lib=general&flag=refund&value=1&proserv_id=${proserv_id}&type=websitetransfer`)
		this.handleClick()
		document.getElementById('bootstrap-input').value = refundMigration
		}
		const badCredentials = () => {
		let badCredentials =	`Hello,

We attempted to access your old hosting control panel but were unable to do so using the credentials provided. Please double check your credentials and provide the following:

Old host name:
Old host login link:
Old host user:
Old host pass:
List of sites to be moved:
List of emails to be moved with their passwords and the IMAP mail server address:

Please note that the username and password we need will not be your WordPress dashboard login credentials but rather your old hosting provider login credentials.

# IMPORTANT DISCLAIMER
An email transfer does not include mailing lists, email forwarders, contacts, address books, auto responders or calendars.

Once we have that we'll go ahead and manually move forward with the migration.

Thank you,
${user}
Professional Services`
		document.getElementById('bootstrap-input').value = badCredentials
		}

    return (
      <div className={classes.root}>
				<Typography align="left" variant="display1">
					Email Templates:
				</Typography>
        <List
          component="nav"
					className={classes.listDisplay}
        >
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem disableGutters>
									<ListItemText>
										<Button onClick={requestInfo} size="medium">Request Information</Button>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button onClick={startMigration} size="medium">Start Migration</Button>
										</ListItemText>
                  </ListItem>
              </List>
            </div>
        </List>
				<List
					component="nav"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem disableGutters>
									<ListItemText>
										<Button onClick={reviewMigration} size="medium">Review Migration</Button>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button onClick={completeMigration} size="medium">Complete Migration</Button>
										</ListItemText>
                  </ListItem>
              </List>
            </div>
				</List>
				<List
					component="nav"
					className={classes.listDisplay}
				>
				<div className={classes.demo}>
						<List dense={true}>
								<ListItem disableGutters>
									<ListItemText>
										<Button onClick={this.handleClick} size="medium">Refund Migration</Button>
										<Dialog
											open={this.state.open}
											onClose={this.handleClick}
											aria-labelledby="form-dialog-title"
										>
											<DialogTitle id="form-dialog-title">Process Refund</DialogTitle>
											<DialogContent>
												<DialogContentText>
													<Typography>1. No work was completed</Typography>
													<Typography>2. Customer is requesting a refund</Typography>
													<Typography>* All exceptions must be confirmed by Manager/Team Lead.</Typography>
												</DialogContentText>
												<FormControl className={classes.formControl} error>
								          <InputLabel htmlFor="name-error">Refund Reason</InputLabel>
								          <Select
														native
								            value={this.state.name}
								            onChange={this.handleChange}
								            name="name"
								            input={<Input id="name-error" />}
														inputProps={{id: 'age-native-simple'}}
								          >
								            <option value="None">
															<em>⚠️  - None</em>
								            </option>
								            <option value="olivier">Incompatible</option>
								            <option value="kevin">Proprietary</option>
														<option value="olivier">VPS</option>
								            <option value="kevin">OHWP</option>
														<option value="olivier">No Access</option>
								            <option value="kevin">Customer Completed</option>
														<option value="olivier">Escalated Refund</option>
								            <option value="kevin">Disclaimer</option>
														<option value="olivier">Purchased on Source</option>
								            <option value="kevin">Vague Request</option>
														<option value="olivier">Extra Purchases</option>
								            <option value="kevin">Missold</option>
								          </Select>
								        </FormControl>
												<TextField
													autoFocus
													margin="dense"
													id="name"
													label="Refund Comment"
													type="text"
													fullWidth
												/>
											</DialogContent>
											<DialogActions>
												<Button onClick={this.handleClick} color="primary">
													Cancel
												</Button>
												<Button onClick={refundMigration} disabled={(this.state.name !== 'None') ? false : true} color="primary">
													Refund
												</Button>
											</DialogActions>
										</Dialog>
									</ListItemText>
								</ListItem>
						</List>
					</div>
					<div className={classes.demo}>
              <List dense={true}>
                  <ListItem disableGutters>
										<ListItemText>
											<Button onClick={badCredentials} size="medium">Bad Credentials</Button>
										</ListItemText>
                  </ListItem>
              </List>
            </div>
				</List>
				<StatusStepper />
      </div>
    )
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NestedList)
