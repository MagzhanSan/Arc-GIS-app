import { getAllShops } from './getAllShops.interface'
import axios from 'axios'

interface ShopServiceType {
	GetAllShops: () => Promise<any>
}

export const ShopService: ShopServiceType = {
	GetAllShops: async () => {
		const searchUrl =
			'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'

		const params: getAllShops = {
			f: 'json',
			category: 'Coffee Shop',
			location: [51.1801, 71.446],
			outFields: ['Place_addr', 'PlaceName'],
			maxLocations: 10,
		}

		const paramVals = []
		for (const k in params) {
			if (params.hasOwnProperty(k)) {
				const val =
					encodeURIComponent(k) +
					'=' +
					encodeURIComponent(params[k as keyof typeof params] as string)
				paramVals.push(val)
			}
		}
		const url = `${searchUrl}?${paramVals.join('&')}`

		const response = await axios.get(url)

		return response.data
	},
}
