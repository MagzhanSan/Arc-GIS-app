import { data } from '../../data'
import SideBar from './SideBar'
import TodoView from './TodoView'
import Graphic from '@arcgis/core/Graphic'
import Map from '@arcgis/core/Map'
import Polygon from '@arcgis/core/geometry/Polygon.js'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js'
import MapView from '@arcgis/core/views/MapView'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { FC, useEffect, useRef, useState } from 'react'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
}

const MapArcGis: FC = () => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const mapRef = useRef(null)
	const [latitude, setLatitude] = useState<number>()
	const [longitude, setLongitude] = useState<number>()
	const [id, setId] = useState<number>()
	const [selectedPolygon, setSelectedPolygon] = useState<null | {
		Latitude: number
		Longitude: number
		Id: number | undefined
	}>(null)

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

	// useEffect(() => {
	// 	if (id && selectedPolygon) {
	// 		setLatitude(selectedPolygon.Latitude)
	// 		setLongitude(selectedPolygon.Longitude)
	// 		setId(selectedPolygon.Id)
	// 	}
	// }, [])

	const onCancel = () => {
		setSelectedPolygon(null)
		handleClose()
	}

	const onOk = () => {
		if (selectedPolygon) {
			setLatitude(selectedPolygon.Latitude)
			setLongitude(selectedPolygon.Longitude)
			setId(selectedPolygon.Id)
		}
		handleClose()
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

		const symbol = new SimpleFillSymbol({
			color: 'pink',
			outline: { color: [255, 255, 255], width: 1 },
		})

		data.forEach(place => {
			const polygon = new Polygon({
				rings: [
					[
						[place.Longitude, place.Latitude],
						[place.Longitude + 0.0005, place.Latitude],
						[place.Longitude + 0.0005, place.Latitude + 0.0005],
						[place.Longitude, place.Latitude],
					],
				],
			})
			const polygonGraphic = new Graphic({
				geometry: polygon,
				symbol,
			})

			view.graphics.add(polygonGraphic)

			view.on('click', function (event) {
				view.hitTest(event).then(function (response) {
					if (response.results[0]?.type === 'graphic') {
						if (response.results[0]?.graphic === polygonGraphic) {
							const polygonGeometry = response.results[0].graphic
								.geometry as __esri.Polygon
							const polygonCoordinates = polygonGeometry.rings[0][0]
							const id = data.find(
								(item: any) =>
									item.Latitude === polygonCoordinates[1] &&
									item.Longitude === polygonCoordinates[0]
							)
							// setSelectedPolygon({
							// 	Latitude: polygonCoordinates[1],
							// 	Longitude: polygonCoordinates[0],
							// 	Id: id?.id,
							// })

							setLatitude(polygonCoordinates[1])
							setLongitude(polygonCoordinates[0])
							setId(id?.id)
						}
					}
				})
			})
		})
	}, [])

	return (
		<div
			className='map-container'
			ref={mapRef}
			style={{ position: 'relative' }}
		>
			<SideBar
				latitude={latitude}
				longitude={longitude}
				index={id}
				handleOpen={handleOpen}
			/>
			<TodoView id={id} />
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='child-modal-title'
				aria-describedby='child-modal-description'
			>
				<Box sx={{ ...style, width: 200 }}>
					<h2 id='child-modal-title'>Вы уверены?</h2>
					<p id='child-modal-description'>
						Ваши данные будут удалены безвозвратно, вы не сохранили!
					</p>
					<Button onClick={onCancel}>Отмена</Button>
					<Button onClick={onOk}>Okay</Button>
				</Box>
			</Modal>
		</div>
	)
}

export default MapArcGis
