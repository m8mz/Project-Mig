import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FirstPageIcon from 'material-ui-icons/FirstPage'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import LastPageIcon from 'material-ui-icons/LastPage'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import AddNote from '../containers/AddNote'
import Button from 'material-ui/Button'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    )
  }

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
)

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
	 display: "inline-block",
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  divider: {
	  maxWidth: 115,
	  margin: "0 auto"
  },
	button: {
		margin: theme.spacing.unit
	}
})

class CustomPaginationActionsTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      page: 0,
      rowsPerPage: 5,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
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
  addNote(note) {
	  this.props.onAddNote(note)
  }

  render() {
    const { classes, notes=[] } = this.props
    const { rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, notes.length - page * rowsPerPage)
		const changeName = (name) => {
			switch(name) {
			  case "emuniz":
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
			  case "rloader":
				 return "Riley Loader"
			  case "aldunn":
				 return "Alan Dunn"
			 case "customer":
				 return "Customer"
			  default:
				 return "Nobody"
		  }
		}
		const convertNote = (text) => {
			let k = new DOMParser().parseFromString(text, "text/html")
			return k.childNodes[0].textContent
		}

    return (
      <Paper className={classes.root}>
			<Typography variant="title" color="textSecondary" align="center" style={{paddingTop: 5}}>Notes<Divider light className={classes.divider} /></Typography>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow hover={true} style={{borderBottom: "none"}} key={n.proserv_id}>
                    <TableCell style={{width: "15%", borderBottom: "none"}}>{changeName(n.user)}</TableCell>
                    <TableCell padding="none" style={{width: "65%", borderBottom: "none"}}><TextField InputProps={{disableUnderline: true, readOnly: true, style: {fontSize:12}}} inputProps={{style:{overflowX: "auto"}}} multiline fullWidth rowsMax={2} rows={1} defaultValue={(n.action === "Agent Note") ?
											"View Note" : (n.action === "Sent Email") ? "View Email" : convertNote(n.note)} /></TableCell>
                    <TableCell numeric style={{width: "15%", borderBottom: "none"}}>{n.time.replace(/(\d{1,2}:?){3}\w{2}/, '')}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
					 <AddNote />
                <TablePagination
                  colSpan={3}
                  count={notes.length}
                  rowsPerPage={5}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  Actions={TablePaginationActionsWrapped}
						rowsPerPageOptions={[5]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
