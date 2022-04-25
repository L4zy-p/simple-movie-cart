import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuid4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '../app/hook'
import { clearCart } from '../features/carts/carts-slice'
import { createOrder } from '../features/orders/orders-slice'

import CartItem from './CartItem'

const CartList: React.FC = () => {
  const [total, setTotal] = useState(0)
  const [discount, setDisCount] = useState(0)
  const carts = useAppSelector((state) => state.carts.data)
  const orders = useAppSelector((state) => state.orders.data)
  const dispatch = useAppDispatch()

  const allItemPrice = carts.reduce((a, b) => a + b.price, 0)
  const orderTime = dayjs().diff(dayjs(orders.order_time), 'seconds')

  const calculatePrice = () => {
    if (carts.length > 5) {
      const discountResult = (20 / 100) * allItemPrice
      const totalResut = allItemPrice - discountResult

      setTotal(totalResut)
      setDisCount(discountResult)
      return
    }
    if (carts.length > 3 && carts.length <= 5) {
      const discountResult = (10 / 100) * allItemPrice
      const totalResut = allItemPrice - discountResult

      setTotal(totalResut)
      setDisCount(discountResult)
      return
    }

    setTotal(allItemPrice)
    setDisCount(0)
  }

  const createOrderFormCarts = () => {
    dispatch(createOrder({
      id: uuid4(),
      orders: carts,
      total: total,
      discount: discount,
      all_price: allItemPrice,
      order_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }))
    // dispatch(clearCart())
  }

  useEffect(() => {
    if (carts) {
      calculatePrice()
    }
  }, [carts])

  return (
    <div className='flex w-full h-auto max-w-[400px]'>
      <div className='w-full '>
        <p className='text-2xl mb-5'>Carts</p>
        {
          carts?.length === 0 && <p>No movie in carts</p>
        }
        {
          carts?.length !== 0 && orders.id === '' &&
          <div className='bg-red-700 rounded-full px-6 py-1 mb-3 inline-block text-xs'>* Click item for update price</div>
        }

        <ul className='border-b mb-5 pb-5'>
          {carts?.map((cart) => <CartItem key={cart.id} data={cart} />)}
        </ul>
        <div className='flex justify-between'>
          <span>all</span>
          <span>{allItemPrice} THB</span>
        </div>
        <div className='flex justify-between'>
          <span>discount</span>
          <span>{discount} THB</span>
        </div>
        <div className='flex justify-between'>
          <span>total</span>
          <span>{total} THB</span>
        </div>
        {
          orders.id === '' && <div className='mt-5'>
            <button
              disabled={carts.length === 0}
              className='bg-red-700 border-none px-4 py-2 rounded text-lg disabled:opacity-50'
              type='button' onClick={createOrderFormCarts}>Order</button>
            <button
              disabled={carts.length === 0}
              className='bg-transparent border border-red-700 text-red-700 px-4 py-2 rounded text-lg ml-3 disabled:opacity-50'
              type='button' onClick={() => dispatch(clearCart())}>Clear cart</button>
          </div>
        }
      </div>
    </div>
  )
}

export default CartList