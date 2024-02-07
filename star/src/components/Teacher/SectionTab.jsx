import React from 'react'
import { MdEdit, MdOutlineGroups, MdOutlineDeleteOutline } from "react-icons/md";

const SectionTab = ({section}) => {
  return (
    <div className='w-full h-12 border-[1px] border-black p-2 bg-LightBlue flex justify-between mt-2'>
        <div className='flex'>
            <h1 className='underline underline-offset-4 self-center md:text-md text-sm'>{section}</h1>
            <button><MdEdit className='text-lg text-gray-400 ml-2'/></button>
        </div>
        <div className='flex'>
            <button className='flex flex-col justify-center items-center mr-4'>
                <MdOutlineGroups className='text-xl'/>
                <p className='text-xs font-body'>Roster</p>
            </button>
            <button className='flex flex-col justify-center items-center'>
                <MdOutlineDeleteOutline className='text-xl'/>
                <p className='text-xs font-body'>Delete</p>
            </button>
        </div>
    </div>
  )
}

export default SectionTab