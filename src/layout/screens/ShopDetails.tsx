import { data } from '../../data'
import { FC } from 'react'

interface IShopDetails {
	latitude: number | undefined
	longitude: number | undefined
	index: number | undefined
}

const ShopDetails: FC<IShopDetails> = ({ latitude, longitude, index }) => {
	if (!latitude && !longitude) {
		return <div>No data</div>
	}

	// useEffect(() => {}, [latitude, longitude])

	return (
		<div>
			{index && (
				<div>
					{/* <div>Latitude: {data[index].Latitude}</div>
					<div>Longitude: {data[index].Longitude}</div> */}
					<div>Shop: {data[index].Name}</div>
					<div>Address: {data[index].Address}</div>
					<div>Contacts: {data[index].Contacts}</div>
					<div>Description: {data[index].Description}</div>
				</div>
			)}
		</div>
	)
}

export default ShopDetails
