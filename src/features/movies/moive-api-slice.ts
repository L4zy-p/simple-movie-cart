import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { MoviesResponeType } from '../../types'

const MOVIE_API_KRY = '0570ee5b4017b2920d6c0e852de90cc2'

export const movieApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3`,
  }),
  endpoints(builder){
    return {
      fetchMovies: builder.query<MoviesResponeType, string|void>({
        query(search=''){
          if(search){
            return `/search/movie?api_key=${MOVIE_API_KRY}&language=en-US&page=1&include_adult=false&query=${search}`
          }
          return `/movie/popular?api_key=${MOVIE_API_KRY}&language=en-US&page=1`
        }
      })
    }
  }
})

export const  { useFetchMoviesQuery } = movieApiSlice
