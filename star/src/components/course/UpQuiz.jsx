import React from 'react'
import { CgNotes } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";

const UpQuiz = () => {
    let name = "Assessment 2"
    let course = "Computer Architecture and Assessmbly Language"
    let duration = "20 min"
    let startTime = "13:00"
    let closeTime = "15:00"
    let openDate = "23 January 2024"
    let closeDate = "23 January 2024"
  return (
    <div className='flex-grow bg-LightBlue h-28 rounded-lg drop-shadow-md p-2 flex flex-col justify-around'>
        <h3 className='text-xs font-medium mt-2'>Upcoming Assessment</h3>
        <div className='w-full'>
            <div className="heading flex justify-between">
                <div className='flex'>
                    <h1 className='font-medium text-DarkBlue text-md md:text-sm self-center w-auto'>{name}</h1>
                    <div className="durationContainer flex text-gray-400 ml-2">
                        <FaClock className='self-center text-md'/>
                        <h3 className='ml-1 text-xs self-center'>{duration}</h3>
                    </div>
                </div>
                <div className="rightContainer text-5xl self-center ml-1">
                    <CgNotes/>
                </div>
            </div>
            <div className='flex text-gray-400'>
                <AiOutlinePlaySquare className='text-xs self-center'/>
                <h3 className='text-sm md:text-xs ml-2'>Begins {startTime} {openDate}</h3>
            </div>
            <div className='flex text-red-400 mb-2'>
                <FaHourglassEnd className='self-center text-xs'/>
                <h3 className='ml-2 text-sm md:text-xs'>Ends {closeTime} {closeDate}</h3>
            </div>

        </div>
    </div>
  )
}

export default UpQuiz