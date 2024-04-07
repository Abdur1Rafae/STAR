import React from 'react'
import { AiOutlineBarChart } from "react-icons/ai";

const PastCurScore = () => {
    let CurrentScore = 36;
    let totalScore = 40;
    let PreviousScore = 30;
    let PrevTotalScore = 35;

    let improvement = 20;
  return (
    <div className='flex-grow w-full md:mb-0 bg-LightBlue h-28 flex p-2 items-center justify-around shadow-md'>
        <div className='w-24 h-20 flex flex-col'>
            <h3 className='text-xs font-medium self-center'>Previous Score</h3>
            <div className='h-12 mt-2 flex flex-col justify-end'>
                <h3 className='text-xl font-body font-semibold mt-2 self-center'>{PreviousScore}</h3>
                <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {PrevTotalScore}</h3>
            </div>
        </div>
        <div className='h-16 border-black border-[1px]'></div>
        <div className='w-24 h-20 flex flex-col'>
            <h3 className='text-xs font-medium self-center'>Current Score</h3>
            <div className='h-16 flex flex-col justify-end'>
                <h3 className='text-4xl text-DarkBlue font-body font-semibold mt-2 self-center'>{CurrentScore}</h3>
                <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
            </div>
        </div>
        <div className='w-24 h-20 flex flex-col justify-center'>
            <h3 className='text-xs font-medium self-center'>Improvement</h3>
            <div className='h-16 flex flex-col justify-center items-center'>
                <AiOutlineBarChart  className='text-orange-500 text-3xl'/>
                <h1 className={`text-DarkBlue text-xl md:text-2xl ${improvement>0 ? 'text-green-500' : 'text-red-500'}`}>+{improvement}%</h1>
            </div>
        </div>
    </div>
  )
}

export default PastCurScore