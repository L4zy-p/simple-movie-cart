import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrdersType } from '../../types'

interface OrdersState {
  data: OrdersType
}

const initialData = {
  id: '',
  orders: [],
  total: 0,
  discount: 0,
  all_price: 0,
  order_time: ''
}

const initialState: OrdersState = {
  data: initialData
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<OrdersType>) {
      state.data = { ...action.payload }
    },
    cancelOrder(state) {
      state.data = initialData
    }
  }
})


export const { createOrder, cancelOrder } = ordersSlice.actions
export default ordersSlice.reducer
