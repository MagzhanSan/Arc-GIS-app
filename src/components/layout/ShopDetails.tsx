import { data } from '../../data'
import { ICoordinates, IItem } from '../../utils/item.interface'
import NoDataShopDetails from './NoDataShopDetails'
import Todo from './Todo'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import {
	Box,
	CircularProgress,
	Rating,
	Tab,
	Toolbar,
	Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'

const ShopDetails: FC<ICoordinates> = ({ latitude, longitude, handleOpen }) => {
	const [tab, setTab] = useState('1')
	const [detailInfo, setDetailInfo] = useState({} as IItem | undefined)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		// setIsLoading(true)
		// setTimeout(() => {
		const detailInfo = data.find(
			(item: IItem) =>
				item.Latitude === latitude && item.Longitude === longitude
		)
		setDetailInfo(detailInfo)
		// setIsLoading(false)
		// }, 1000)
	}, [latitude, longitude])

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setTab(newValue)
	}

	if (detailInfo === undefined) {
		return <NoDataShopDetails />
	}

	return (
		<Box
			sx={{
				pr: 2,
				pl: 2,
			}}
		>
			{isLoading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '200px',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<>
					<Toolbar />
					<Carousel>
						{detailInfo.Photos
							? detailInfo.Photos.map((photo: string, index: number) => (
									<Box
										key={index}
										component='img'
										alt={detailInfo.Name}
										src={photo}
										width={'100%'}
										height={'157px'}
										borderRadius={2}
									/>
							  ))
							: null}
					</Carousel>

					<Box sx={{ p: 1 }}>
						<Typography variant='h6' color='black' fontWeight={'bold'}>
							{detailInfo.Name}
						</Typography>
						<Typography color='black'>{detailInfo.Address}</Typography>

						<Typography fontSize={'13px'} color='black'>
							{detailInfo.category}
						</Typography>

						<Box display={'flex'} marginTop={1} gap={1} alignItems={'center'}>
							<Rating
								readOnly={true}
								size='small'
								name='simple-controlled'
								value={detailInfo.grade}
								style={{ color: 'gray' }}
							/>
							<Typography color='black'>{detailInfo.grade}</Typography>
						</Box>

						<TabContext value={tab}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<TabList onChange={handleChange}>
									<Tab label='Инфо' value='1' />
									<Tab label='Контакты' value='2' />
								</TabList>
							</Box>
							<TabPanel value='1'>{detailInfo.Description}</TabPanel>

							<TabPanel
								value='2'
								style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
							>
								<LocalPhoneIcon style={{ color: '#1976d2' }} />{' '}
								{detailInfo.Contacts}
							</TabPanel>
						</TabContext>

						<Typography variant='h6' color='black' fontWeight={'bold'}>
							Todo
						</Typography>

						<Todo
							id={detailInfo.id}
							name={detailInfo.Name}
							data={detailInfo.goods}
							handleOpen={handleOpen}
						/>
					</Box>
				</>
			)}
		</Box>
	)
}

export default ShopDetails
