import React from 'react'
import { CgNotes } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";

const MobUpQuiz = ({ name, course, openDate, closeDate, startTime, duration, closeTime }) => {
  return (
    <div className="ml-4 mt-4 w-[300px]">
        <div className="container border-2 flex h-full w-full px-2 py-2 rounded-lg bg-[#F4F9FD]">
            <div className='w-full'>
                <div className="heading flex">
                    <h1 className='font-bold text-md'>{name}</h1>
                    <div className="durationContainer flex text-xs text-slate-400 ml-2">
                        <FaClock className='self-center'/>
                        <h3 className='ml-1 self-center'>{duration} minutes</h3>
                    </div>
                </div>
                <div className='text-sm mb-1'>{course}</div>
                <div className='flex text-slate-400'>
                    <AiOutlinePlaySquare className='text-md self-center'/>
                    <h3 className='text-sm ml-2'>Begins {startTime} {openDate}</h3>
                </div>
                <div className='flex  text-red-400'>
                    <FaHourglassEnd className='self-center'/>
                    <h3 className='ml-2 text-sm'>Ends {closeTime} {closeDate}</h3>
                </div>

            </div>
            <div className="rightContainer text-5xl self-center ml-1">
                <CgNotes/>
            </div>
        </div>
    </div>
  )
}

export default MobUpQuiz