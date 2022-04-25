import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItemType } from '../../types'

interface CartsState {
  data: CartItemType[]
}

const initialState: CartsState = {
  data: []
}

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addMovieToCart(state, action: PayloadAction<CartItemType>) {
      state.data.push(action.payload)
    },
    deleteMoiveFromCart(state, action: PayloadAction<number>) {
      state.data = state.data.filter((data) => data.id !== action.payload)
    },
    editMovieInCart(state, action: PayloadAction<CartItemType>) {
      const index = state.data.findIndex((data) => data.id === action.payload.id)
      let newVal = [...state.data]
      newVal[index] = { ...action.payload }
      state.data = newVal
    },
    clearCart(state){
      state.data = []
    }
  }
})

export const { addMovieToCart, deleteMoiveFromCart, editMovieInCart, clearCart } = cartsSlice.actions
export default cartsSlice.reducer