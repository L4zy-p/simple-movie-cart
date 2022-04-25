import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCartIcon } from '@heroicons/react/solid'

import { MovieType } from '../types'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { addMovieToCart, deleteMoiveFromCart } from '../features/carts/carts-slice'


type Props = {
  data: MovieType
}

const Movie: React.FC<Props> = ({ data }: Props) => {
  const carts = useAppSelector((state) => state.carts.data)
  const orders = useAppSelector((state) => state.orders.data)
  const dispatch = useAppDispatch()

  const isAleadyInCart = carts.filter((cart) => cart.id === data.id)?.length

  const addToCart = () => {
    dispatch(addMovieToCart({
      id: data.id,
      data: data,
      price: 100
    }))
  }

  const delFromCart = () => {
    dispatch(deleteMoiveFromCart(data.id))
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      layout
      onClick={() => {
        if (orders.id === '') {
          if (isAleadyInCart > 0) {
            delFromCart()
          } else {
            addToCart()
          }
        }
      }}
      className='w-[240px] h-[280px] m-4 rounded-lg shadow-lg relative cursor-pointer overflow-hidden'
    >
      <div className='absolute top-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        <p className='text-xl font-semibold text-center'>{data?.title}</p>
      </div>
      {
        isAleadyInCart > 0 && <ShoppingCartIcon className='w-[40px] h-[40px] right-4 top-4 absolute z-10' />
      }

      <img
        className={`h-full object-cover ${isAleadyInCart ? `opacity-50` : ''}`}
        src={data?.backdrop_path ? `http://image.tmdb.org/t/p/w500${data?.backdrop_path}`
          : `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80`} alt='movie poster' />
    </motion.div>
  )
}

export default Movie