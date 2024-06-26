import React from 'react'
import CircularProgressBar from './CircularProgressBar'

const ScoreView = ({avgScore, highestScore, totalScore}) => {


  return (
    <div className='flex-grow flex h-28 bg-LightBlue justify-around drop-shadow-md rounded-lg'>
        <div className='w-24 h-28 rounded-lg flex flex-col'>
            <h3 className='text-xs mt-4 font-medium self-center'>Average Score</h3>
            <div className='h-16 flex justify-center p-1'>
                <CircularProgressBar percentage={avgScore} width={10}/>
            </div>
        </div>
        <div className='separator h-20 border-[1px] border-black self-center'></div>
        <div className='w-24 h-28 rounded-lg flex flex-col'>
            <h3 className='text-xs mt-4 font-medium self-center'>Highest Score</h3>
            <div className='h-16 flex flex-col'>
                <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>{highestScore}</h3>
                <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
            </div>
        </div>
    </div>
  )
}

export default ScoreView

