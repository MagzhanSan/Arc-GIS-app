import shops from './slices/GetAllShops.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		shops,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
