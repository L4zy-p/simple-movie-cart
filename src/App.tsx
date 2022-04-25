import { useState } from 'react'
import dayjs from 'dayjs'
import { ShoppingCartIcon } from '@heroicons/react/solid'

import { useFetchMoviesQuery } from './features/movies/moive-api-slice'
import { useAppSelector } from './app/hook'

import { MovieList, Search, CartList, Timer } from './components'


function App() {
  const [search, setSearch] = useState('')
  const { data, isFetching } = useFetchMoviesQuery(search)
  const orders = useAppSelector((state) => state.orders.data)
  const [inputVal, setInputVal] = useState('')

  const [showCart, setShowCart] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(inputVal)
  }

  const orderTime = dayjs().diff(dayjs(orders.order_time), 'seconds')

  return (
    <div className='bg-gray-900 h-auto min-h-screen text-[#ddd] '>
      <div className='flex p-10 flex-col sm:flex-row items-center'>
        <span className='flex-1 text-2xl mr-4 mb-4 sm:mb-0'>Simple Movie Cart</span>
        <Search onSubmit={onSubmit} inputVal={inputVal} setInputVal={setInputVal} />
        <ShoppingCartIcon className='w-[30px] h-[30px]' onClick={() => setShowCart(!showCart)} />
      </div>
      <div className='flex px-[5%] justify-center'>
        {
          !showCart && <MovieList data={data} isFetching={isFetching} />
        }
        {
          showCart && <CartList />
        }
      </div>
     
      {
        orders.id !== '' && orderTime < 60
        && <Timer count={orderTime} />
      }
    </div>
  )
}

export default App
