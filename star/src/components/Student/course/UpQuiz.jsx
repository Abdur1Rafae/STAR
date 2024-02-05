import React from 'react'
import { FaClock } from "react-icons/fa";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";

const UpQuiz = () => {
    let name = "Assessment 2"
    let duration = "20 min"
    let startTime = "13:00"
    let closeTime = "15:00"
    let openDate = "23 Jan 2024"
    let closeDate = "23 Jan 2024"
  return (
    <div className='flex-grow bg-LightBlue h-28 min-w-56 rounded-lg drop-shadow-md p-1'>
        <h1 className='text-sm font-medium font-body'>Upcoming Assessments</h1>
        <div className='w-full border-[1px] border-black'></div>
        <div className='flex justify-between mt-1'>
            <div className='infoContainer flex flex-col justify-between h-full'>
                <div className='flex items-center'>
                    <h1 className='font-medium text-DarkBlue font-body text-md md:text-sm self-center'>{name}</h1>
                    <div className='flex text-slate-400 text-xs self-center'>
                        <FaClock className='self-center ml-2'/>
                        <h3 className='ml-1 self-center ml-2 md:text-[10px] lg:text-xs'>{duration}</h3>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='text-xs md:text-[10px] lg:text-xs flex text-slate-400'>
                        <AiOutlinePlaySquare className='self-center'/>
                        <h3 className='ml-1'>Begins: {startTime} {openDate}</h3>
                    </div>
                    <div className='text-xs md:text-[10px] lg:text-xs flex text-red-400'>
                        <FaHourglassEnd className='self-center'/>
                        <h3 className='ml-1'>Ends: {closeTime} {closeDate}</h3>
                    </div>
                </div>
            </div>
            <img src='../../liveQuiz.png' className='lg:h-[80px] w-[70px] lg:w-[80px] self-center rounded-lg'></img>
        </div>
    </div>
  )
}

export default UpQuiz