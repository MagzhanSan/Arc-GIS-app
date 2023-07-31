import axios from 'axios'

export const todoListSelect = async (
	name: string,
	id: number,
	data: object
): Promise<object> => {
	const response = await axios.post('http://localhost:3001/todo', {
		name,
		id,
		data,
	})
	return response.data
}
