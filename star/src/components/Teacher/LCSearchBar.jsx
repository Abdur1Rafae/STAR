import React from 'react'
import { FaSearch } from 'react-icons/fa';

const LCSearchBar = ({ value, onChange }) => {
  return (
    <div className='bg-LightBlue flex items-center pl-2 pr-2 h-8 py-1 w-full md:w-9/12 border rounded-md border-black focus:outline-none'>
        <input
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
            className="focus:outline-none w-full bg-LightBlue"
        />
        <div className="">
            <FaSearch className="text-gray-400" />
        </div> 
    </div>
  )
}

export default LCSearchBar