import shops from './slices/GetAllShops.slice'
import todoById from './slices/todoGetByIdSlice'
import todo from './slices/todoListDoneSlice'
import selectTodo from './slices/todoListSelectSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		shops,
		todo,
		selectTodo,
		todoById,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
