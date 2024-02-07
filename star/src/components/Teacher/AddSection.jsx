import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";

const AddSection = () => {
  return (
    <div className='mt-2 w-full h-12 border-[1px] border-dashed border-black p-2 flex items-center'>
        <button className='flex items-center'>
            <FaCirclePlus className='ml-4'/>
            <p className='ml-2'>Add Section</p>
        </button>
    </div>
  )
}

export default AddSection