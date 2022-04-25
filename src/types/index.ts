export type MoviesResponeType = {
  page: number,
  results: MovieType[],
  total_pages: number,
  total_results: number
}

export type MovieType = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export type CartItemType = {
  id: number,
  data: MovieType,
  price: number
}

export type OrdersType = {
  id: string,
  orders: CartItemType[],
  total: number,
  discount: number,
  all_price: number,
  order_time: string
}