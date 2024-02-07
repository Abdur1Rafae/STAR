import React from 'react'
import { FaSearch } from 'react-icons/fa';

const LCSearchBar = ({ value, onChange }) => {
  return (
    <div className='bg-LightBlue flex items-center pl-4 pr-4 py-2 w-9/12 border border-black focus:outline-none focus:border-blue-500'>
        <input
            type="text"
            placeholder="Search Question Bank"
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