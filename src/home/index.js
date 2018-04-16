import React from 'react'
import { MuiThemeProvider } from 'material-ui'
import { createMuiTheme } from 'material-ui/styles'
import HomeMenu from './containers/Menu'
import HomeTable from './containers/Table'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export const Home = ({darkTheme}) => {
	return (
		<div>
			<MuiThemeProvider theme={darkTheme ? theme : null}>
				<HomeMenu />
				<HomeTable />
			</MuiThemeProvider>
		</div>
	)
}
