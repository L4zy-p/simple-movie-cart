import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { movieApiSlice } from '../features/movies/moive-api-slice'
import cartsReducer from '../features/carts/carts-slice'
import orderReducer from '../features/orders/orders-slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistConfig2 = {
  key: 'root2',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartsReducer)
const persistedReducer2 = persistReducer(persistConfig2, orderReducer)

export const store = configureStore({
  reducer: {
    carts: persistedReducer,
    orders: persistedReducer2,
    [movieApiSlice.reducerPath]: movieApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(movieApiSlice.middleware)
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>