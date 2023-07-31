import { ShopService } from '../../sevices/getAllShops/GetAllShops'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface IShopState {
	isLoading: boolean
	shops: any
	error: any
}

export const initialState: IShopState = {
	isLoading: false,
	shops: [],
	error: null,
}

export const getAllShops = createAsyncThunk('shops/getAllShops', async () => {
	const response = await ShopService.GetAllShops()
	return response
})

export const getAllShopsSlice = createSlice({
	name: 'shops',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getAllShops.pending, state => {
			state.isLoading = true
			state.error = null
		})
		builder.addCase(getAllShops.fulfilled, (state, action) => {
			state.isLoading = false
			state.shops = action.payload
		})
		builder.addCase(getAllShops.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload
		})
	},
})

export const shops = getAllShopsSlice.actions
export default getAllShopsSlice.reducer
