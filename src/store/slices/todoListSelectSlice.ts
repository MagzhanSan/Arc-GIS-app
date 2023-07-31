import { todoListSelect } from '../../sevices/todoListSelectService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface ITodoListSelect {
	todoList: object
	loading: boolean
	error: any
}

const initialState: ITodoListSelect = {
	todoList: {},
	loading: false,
	error: null,
}

export const todoListSelected = createAsyncThunk(
	'todoListSelect/todoListSelected',
	async ({ name, id, data }: { id: number; data: object; name: string }) => {
		const response = await todoListSelect(name, id, data)
		return response
	}
)

export const todoListSelectSlice = createSlice({
	name: 'todoListSelect',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(todoListSelected.pending, state => {
			state.loading = true
			state.error = null
		})
		builder.addCase(todoListSelected.fulfilled, (state, action) => {
			state.loading = false
			state.todoList = action.payload
		})
		builder.addCase(todoListSelected.rejected, (state, action) => {
			state.loading = false
			state.error = action.payload
		})
	},
})

export const selectTodo = todoListSelectSlice.actions
export default todoListSelectSlice.reducer
