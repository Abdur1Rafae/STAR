import React from 'react'
import { FaHourglassEnd } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";

const LiveQuiz = () => {
  return (
    <button className='flex border-2 border-grey mt-4 ml-4 rounded-lg transition-all duration-200 text-left hover:scale-105'>
        <img src='./liveQuiz.png' className='h-[120px] self-center'></img>
        <div className='infoContainer ml-2 mr-2 flex flex-col w-[200px] h-full'>
            <h1 className='font-[700] text-md mt-1'>Monthly Test</h1>
            <h2 className='text-xs font-[500] mb-2'>CSE - 105 Computer Communication and Networking</h2>
            <div className='mt-1 text-xs flex text-slate-400'>
                <FaHourglassEnd className='self-center'/>
                <h3 className='ml-1'>Ends at 22:00 15 January 2023</h3>
            </div>
            <div className='mt-2 mb-1 text-xs flex justify-between'>
                <div className='leftContainer flex text-slate-400'>
                    <FaClock className='self-center'/>
                    <h3 className='ml-1'>20 minutes</h3>
                </div>
                <div className='rightContainer flex'>
                    <h3 className='font-[500] mr-1'>Open</h3>
                    <FaCircleArrowRight className='self-center text-lime-500 text-sm'/>
                </div>
            </div>
        </div>
    </button>
  )
}

export default LiveQuiz