import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  inputVal?: string,
  setInputVal: React.Dispatch<React.SetStateAction<string>>
}

const Search: React.FC<Props> = ({ onSubmit, inputVal, setInputVal }: Props) => {
  return (
    <form onSubmit={onSubmit} className='relative mx-5 mb-4 sm:mb-0'>
      <SearchIcon className='text-[#d9d9d9] h-5 z-50 absolute top-[7px] left-[15px]' />
      <input
        className='bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] 
            p-1 pl-11 border border-[#ddd] w-full rounded-full
            max-w-[230px]'
        type='text'
        value={inputVal}
        placeholder='Search'
        onChange={(e) => setInputVal(e?.target?.value)} />
      {/* <button type='submit'>Search</button> */}
    </form>
  )
}

export default Search