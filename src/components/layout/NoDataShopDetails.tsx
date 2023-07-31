import Inventory2Icon from '@mui/icons-material/Inventory2'
import { Box, Typography } from '@mui/material'
import { FC } from 'react'

const NoDataShopDetails: FC = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				p: 10,
			}}
		>
			<Inventory2Icon
				style={{ color: 'gray', width: '40px', height: '40px' }}
			/>
			<Typography color={'gray'}>No data</Typography>
		</Box>
	)
}

export default NoDataShopDetails
