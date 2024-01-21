import React from 'react'
import { FcClock } from "react-icons/fc";

const TimeTaken = () => {
  return (
    <div className='justify-around flex-grow mb-4 md:mb-0 bg-LightBlue h-28 flex p-2 items-center drop-shadow-md'>
        <FcClock className='text-6xl'/>
        <div className='flex flex-col justify-center items-center'>
            <h3 className='font-bold font-body text-2xl'>00:22:45</h3>
            <p className='text-sm font-body'>Total Time Taken</p>
        </div>
    </div>
  )
}

export default TimeTaken