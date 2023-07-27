import './App.css'
import { data } from './data/index'
import ShopDetails from './layout/screens/ShopDetails'
import { AppDispatch, RootState } from './store'
import Graphic from '@arcgis/core/Graphic'
import Map from '@arcgis/core/Map'
import Point from '@arcgis/core/geometry/Point'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import MapView from '@arcgis/core/views/MapView'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const App: FC = () => {
	const shops = useSelector((state: RootState) => state.shops.shops)
	const dispatch = useDispatch<AppDispatch>()
	const mapRef = useRef(null)
	const [latitude, setLatitude] = useState<number>()
	const [longitude, setLongitude] = useState<number>()
	const [index, setIndex] = useState<number>()

	const getCenterPoint = (
		data: Array<{ Latitude: number; Longitude: number }>
	) => {
		const total = data.reduce(
			(total, val) => {
				return {
					Latitude: total.Latitude + val.Latitude,
					Longitude: total.Longitude + val.Longitude,
				}
			},
			{ Latitude: 0, Longitude: 0 }
		)

		return {
			Latitude: total.Latitude / data.length,
			Longitude: total.Longitude / data.length,
		}
	}

	useEffect(() => {
		const centerPoint = getCenterPoint(data)

		if (!mapRef.current) return

		const map = new Map({
			basemap: 'arcgis-streets-night',
		})
		const view = new MapView({
			map,
			container: mapRef.current,
			center: [centerPoint.Longitude, centerPoint.Latitude],
			zoom: 15,
		})

		const symbol = new SimpleMarkerSymbol({
			color: 'pink',
			outline: { color: [255, 255, 255], width: 2 },
		})

		data.forEach(place => {
			const point = new Point({
				latitude: place.Latitude,
				longitude: place.Longitude,
			})
			const pointGraphic = new Graphic({
				geometry: point,
				symbol,
			})
			view.graphics.add(pointGraphic)
		})

		view.on('click', function (event) {
			view.hitTest(event).then(function (response) {
				if (response.results.length > 0) {
					data.map((place, index) => {
						if (
							place.Latitude.toFixed(4) ==
								response.results[0].mapPoint.latitude.toFixed(4) &&
							place.Longitude.toFixed(4) ==
								response.results[0].mapPoint.longitude.toFixed(4)
						) {
							setLatitude(place.Latitude)
							setLongitude(place.Longitude)
							setIndex(index)
						}
					})
				}
			})
		})
	}, [latitude, longitude])

	return (
		<div className='App' style={{ display: 'flex', flexWrap: 'nowrap' }}>
			<div
				className='map-container'
				style={{ width: '80%' }}
				ref={mapRef}
			></div>
			<ShopDetails latitude={latitude} longitude={longitude} index={index} />
		</div>
	)
}

export default App
