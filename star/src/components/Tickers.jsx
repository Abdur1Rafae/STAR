import React from 'react'
import { FaSearch } from 'react-icons/fa';

const Tickers = ({  image , heading , value}) => {
  return (
    <div className='flex bg-white border border-gray-300 p-2' >
        <img src={image}  alt="" className='w-fit h-8 m-2' />
        <div className='content-start	'>
            <div className='font-semibold top-0 text-sm text-gray-500'>{heading}</div>
            <div className='font-semibold text-2xl '>{value}</div>
        </div>
   </div>
  )
}

export default Tickers;