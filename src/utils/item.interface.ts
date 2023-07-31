export interface IItem {
	id: number
	grade: number
	Latitude: number
	Longitude: number
	Name: string
	Contacts: string
	Photos: string[]
	Description: string
	category: string
	goods: IGood[]
	Address: string
}

export interface IGood {
	name: string
	price: number
	count?: number
}

export interface IModalOpen {
	handleOpen?: Function | undefined
}

export interface ICoordinates extends IModalOpen {
	latitude: number | undefined
	longitude: number | undefined
	index?: number
}
