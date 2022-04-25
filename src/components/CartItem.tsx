import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { editMovieInCart } from '../features/carts/carts-slice'
import { CartItemType } from '../types'

type Props = {
  data: CartItemType
}

const CartItem: React.FC<Props> = ({ data }: Props) => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) =>  state.orders.data)
  const [isEdit, setIsEdit] = useState(false)
  const [price, setPrice] = useState(0)

  const editItemPrice = () => {
    dispatch(editMovieInCart({ ...data, price: price }))
    setIsEdit(false)
  }

  return (
    <li className={`flex justify-between even:bg-gray-700 p-2 cursor-pointer ${isEdit ? 'flex-col' : ''}`}
      onClick={() => {
        if(orders.id === ''){
          setPrice(data.price)
          setIsEdit(true)
        }
      }}
    >
      <span >{data.data.title}</span>  {
        isEdit ? <>
          <input
            className='bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] 
         border border-[#ddd] w-full rounded-full my-2 py-1 pl-2'
            name='price' value={price} onChange={(e) => {
              if(!e?.target?.value){
                setPrice(0)
              }
              if (e?.target?.value?.match(/^[0-9]+$/)) {
                setPrice(Number(e?.target?.value))
              }
            }} />
          <button type='button' onClick={(e) => {
            e.stopPropagation()
            editItemPrice()
          }}>ok</button>
          <button type='button' onClick={(e) => {
            e.stopPropagation()
            setPrice(data.price)
            setIsEdit(false)
          }}>cancel</button>
        </>
          : <span >{data.price} THB</span>
      }
    </li>
  )
}

export default CartItem