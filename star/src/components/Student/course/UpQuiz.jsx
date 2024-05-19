import React from 'react'
import { FaClock } from "react-icons/fa";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { FaHourglassEnd } from "react-icons/fa";
import { DDMMMMYYYY_HHMM } from '../../../Utils/DateFunctions';

const UpQuiz = ({assessment}) => {
  return (
    <div className={`flex-grow flex flex-col ${assessment ? 'justify-between': ''} bg-LightBlue h-28 min-w-56 rounded-lg drop-shadow-md p-1`}>
        <h1 className='text-xs font-medium font-body'>Upcoming Assessments</h1>
        <div className='w-full border-[1px] border-black'></div>
        {
            assessment ? 
            <div className='flex justify-between px-1 py-1 gap-4'>
            <div className='infoContainer flex flex-col justify-between h-full'>
                <div className='flex items-center gap-4'>
                    <h1 className='font-medium text-DarkBlue font-body text-md md:text-sm self-center'>{assessment.title}</h1>
                    <div className='flex text-slate-400 text-xs self-center'>
                        <FaClock className='self-center'/>
                        <h3 className='ml-1 self-center md:text-[10px] lg:text-xs'>{assessment.duration}</h3>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='text-xs md:text-[10px] lg:text-xs flex text-slate-400'>
                        <AiOutlinePlaySquare className='self-center'/>
                        <h3 className='ml-1'>Begins: {DDMMMMYYYY_HHMM({date: assessment.openDate})}</h3>
                    </div>
                    <div className='text-xs md:text-[10px] lg:text-xs flex text-red-400'>
                        <FaHourglassEnd className='self-center'/>
                        <h3 className='ml-1'>Ends: {DDMMMMYYYY_HHMM({date: assessment.closeDate})}</h3>
                    </div>
                </div>
            </div>
            <img src='../../liveQuiz.png' className='lg:h-[75px] w-[70px] lg:w-[75px] self-center rounded-lg'></img>
        </div>
        :
        <p className='self-center justify-self-center mt-8'>No Upcoming Assessment</p>
        }
        
    </div>
  )
}

export default UpQuiz