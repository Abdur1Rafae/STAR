import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";

const NewButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="h-8 bg-DarkBlue w-fit text-white font-semibold px-3 rounded focus:outline-none focus:shadow-outline flex items-center ml-auto"
    >  
    <FaCirclePlus className='self-center mr-2'/>
      <p className='text-sm md:text-md'>{label}</p>
    </button>
  )
}

export default NewButton