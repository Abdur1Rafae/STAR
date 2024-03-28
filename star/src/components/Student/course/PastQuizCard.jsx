import React from 'react'
import { MdOutlineArrowForwardIos } from "react-icons/md";

const PastQuizCard = ({Name, Date, Time, AchievedScore, totalScore}) => {
  return (
    <button className='text-left w-full h-24 bg-white rounded-lg drop-shadow-md px-2 py-4 flex justify-between border-transparent border-2 hover:border-DarkBlue' onClick={()=>{window.location.assign(`/courses/assessment/${Name}`)}}>
        <div className='flex'>
            <div className='bg-LightBlue rounded-lg w-16 h-16'>
                <div className='h-16 flex flex-col'>
                    <h3 className='text-lg text-DarkBlue font-body font-semibold mt-2 self-center'>{AchievedScore}</h3>
                    <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
                </div>
            </div>
            <div className='flex flex-col h-full ml-2 self-center'>
                <h2 className='font-medium md:text-sm lg:text-md mt-2 self-start'>{Name}</h2>
                <p className='text-gray-500 text-xs font-body mt-2'>{Date}, {Time}</p>
            </div>
        </div>
        <MdOutlineArrowForwardIos className='self-center text-3xl'/>
    </button>
  )
}

export default PastQuizCard