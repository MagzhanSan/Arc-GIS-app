import { todoListDone as todoListDoneService } from '../../sevices/todoListDoneService'
import { ITodoData } from '../../utils/item.interface'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface ITodoListDone {
	isLoading: boolean
	todoList: object
	error: any
}

export const initialState: ITodoListDone = {
	isLoading: false,
	todoList: {},
	error: null,
}

export const todoListDone = createAsyncThunk(
	'goods/todoListDone',
	async ({ id, data }: { id: number; data: ITodoData }) => {
		const response = await todoListDoneService(id, data)
		return response
	}
)

export const todoListDoneSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(todoListDone.pending, state => {
			state.isLoading = true
			state.error = null
		})
		builder.addCase(todoListDone.fulfilled, (state, action) => {
			state.isLoading = false
			state.todoList = action.payload
		})
		builder.addCase(todoListDone.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.error
		})
	},
})

export const todo = todoListDoneSlice.actions
export default todoListDoneSlice.reducer
