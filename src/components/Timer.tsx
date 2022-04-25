import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '../app/hook'
import { cancelOrder } from '../features/orders/orders-slice'

type Props = {
  count: number
}

const Timer: React.FC<Props> = ({ count }: Props) => {
  const [time, setTime] = useState<any>()
  const dispatch = useAppDispatch()

  let formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  useEffect(() => {
    let duration = (60 - count)
    let min = 0
    let sec = duration

    let interval = setInterval(() => {
      sec--
      if (sec === -1) {
        sec = 59
        min--
      }
      let newValue = <><span className='minutes'>{formatNumber(min)}</span>
        <span className='divider'>:</span>
        <span className='seconds'>{formatNumber(sec)}</span></>
      if ((min === 0) && (sec === 0)) {
        dispatch(cancelOrder())
        clearInterval(interval)
      }
      setTime(newValue)
    }, 1000)
  }, [])


  return <div className='flex flex-col bg-gray-700 rounded items-center 
  mt-12 p-5 fixed bottom-10 right-10 z-[200] shadow-sm'>
    <span className='text-2xl mb-5'>You must pay within 1 minute.</span>
    <span className='text-2xl mb-5'>time left </span>
    <span className='text-2xl mb-5 text-red-600 font-bold'>{time}</span>
  </div>
}

export default Timer