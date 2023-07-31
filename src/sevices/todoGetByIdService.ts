import axios from 'axios'

export const todoGetById = async (id: number): Promise<object> => {
	const response = await axios.get(`http://localhost:3001/todo/${id}`)
	return response.data
}
