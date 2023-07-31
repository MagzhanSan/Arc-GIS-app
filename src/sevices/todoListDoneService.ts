import { ITodoData } from '../utils/item.interface'
import axios from 'axios'

export const todoListDone = async (
	id: number,
	data: ITodoData
): Promise<ITodoData> => {
	const response = await axios.put(`http://localhost:3001/todo/${id}`, data)
	return response.data
}
