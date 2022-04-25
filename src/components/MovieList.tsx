import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Movie from './Movie'
import Spin from './Spin'
import { MoviesResponeType } from '../types'

type Props = {
  data?: MoviesResponeType,
  isFetching?: boolean
}

const MovieList: React.FC<Props> = ({ data, isFetching }: Props) => {
  return (
    <motion.div
      className='flex-1 flex flex-wrap justify-center'
      layout
    >
      <AnimatePresence>
        {
          !isFetching && data?.results?.map((movie) => (
            <Movie key={movie?.id} data={movie} />
          ))
        }
        {
          isFetching && <Spin/>
        }
        {
          !isFetching && data?.results?.length === 0 && <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl'>No movies</span>
        }
      </AnimatePresence>
    </motion.div>
  )
}

export default MovieList