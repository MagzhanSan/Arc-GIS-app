import { todoGetById } from '../../sevices/todoGetByIdService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface ITodoGetById {
	data: object
	isLoading: boolean
	error: any
}

const initialState: ITodoGetById = {
	data: {},
	isLoading: false,
	error: null,
}

export const getById = createAsyncThunk(
	'todoGetById/getById',
	async (id: number) => {
		const response = await todoGetById(id)
		return response
	}
)

export const todoGetByIdSlice = createSlice({
	name: 'todoGetById',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getById.pending, state => {
			state.isLoading = true
		})
		builder.addCase(getById.fulfilled, (state, action) => {
			state.isLoading = false
			state.data = action.payload
		})
		builder.addCase(getById.rejected, (state, action) => {
			state.isLoading = false
			state.error = null
		})
	},
})

export const todoById = todoGetByIdSlice.actions
export default todoGetByIdSlice.reducer
