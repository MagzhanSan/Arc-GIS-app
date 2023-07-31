import { ICoordinates } from '../../utils/item.interface'
import ShopDetails from '../layout/ShopDetails'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'

const drawerWidth = 352

interface ISideBar extends ICoordinates {
	window?: () => Window
}

const SideBar: FC<ISideBar> = (props: ISideBar) => {
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}

	const drawer = <ShopDetails {...props} />

	const container =
		window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						Arc Gis Test Task
					</Typography>
				</Toolbar>
			</AppBar>
			<Box>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	)
}

export default SideBar
