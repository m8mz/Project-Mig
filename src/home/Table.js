import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import FirstPageIcon from 'material-ui-icons/FirstPage'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'
import LastPageIcon from 'material-ui-icons/LastPage'
import HomeFilter from './Filter'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
})

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
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
    width: '80%',
    marginLeft: "10%",
	 marginTop: 10,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class CustomPaginationActionsTable extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      data: this.props.appState.service_list,
      page: 0,
      rowsPerPage: 15,
    }

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  }

  render() {
    const { classes } = this.props
    const { data, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
	 const changeName = (name) => {
		 switch(name) {
			 case "edmuniz":
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
			 	return "Marcus Hancock-Gaillard"
			 case "rloader":
			 	return "Riley Loader"
			 case "aldunn":
			 	return "Alan Dunn"
			 default:
			 	return "Take"
		 }
	 }

    return (
      <Paper className={classes.root}>
		  <HomeFilter filterState={this.props.appState.filter} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
				 <TableHead>
		          <TableRow>
		            <TableCell numeric>#</TableCell>
		            <TableCell>Primary Domain</TableCell>
		            <TableCell numeric>Domains</TableCell>
		            <TableCell numeric>Emails</TableCell>
		            <TableCell>Date</TableCell>
		            <TableCell>Status</TableCell>
		            <TableCell>Owner</TableCell>
		          </TableRow>
				 </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n, key) => {
                return (
                  <TableRow key={key}>
						  <TableCell numeric>{n.proserv_id}</TableCell>
                    <TableCell>{n.domain}</TableCell>
                    <TableCell numeric>{n.domain_total}</TableCell>
                    <TableCell numeric>{n.email_total}</TableCell>
						  <TableCell>{n.added.replace(/(\d{2}:?){3}/, '')}</TableCell>
						  <TableCell>{n.status}</TableCell>
						  <TableCell>{changeName(n.assigned_to)}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={7}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  Actions={TablePaginationActionsWrapped}
						rowsPerPageOptions={[5,10,15]}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomPaginationActionsTable)
