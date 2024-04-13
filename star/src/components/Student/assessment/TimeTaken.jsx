import React from 'react'
import { FcClock } from "react-icons/fc";

const TimeTaken = () => {
  return (
    <div className='w-full h-full justify-around flex-grow flex p-2 items-center drop-shadow-md'>
        <FcClock size={64}/>
        <div className='flex flex-col justify-center items-center'>
            <h3 className='font-semibold font-body text-xl'>00:22:45</h3>
            <p className='text-sm font-body'>Total Time Taken</p>
        </div>
    </div>
  )
}

export default TimeTaken