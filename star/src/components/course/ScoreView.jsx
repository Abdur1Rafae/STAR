import React from 'react'
import CircularProgressBar from './CircularProgressBar'

const ScoreView = () => {
    
    let HighestScore = 24
    let totalScore = 30

  return (
    <div className='flex-grow flex h-28 bg-LightBlue justify-around drop-shadow-md rounded-lg'>
        <div className='w-24 h-28 rounded-lg flex flex-col'>
            <h3 className='text-xs mt-4 font-medium self-center'>Average Score</h3>
            <div className='h-16 flex justify-center'>
                <CircularProgressBar percentage={80}/>
            </div>
        </div>
        <div className='separator h-20 border-[1px] border-black self-center'></div>
        <div className='w-24 h-28 rounded-lg flex flex-col'>
            <h3 className='text-xs mt-2 mt-4 font-medium self-center'>Highest Score</h3>
            <div className='h-16 flex flex-col'>
                <h3 className='text-2xl text-DarkBlue font-body font-semibold mt-2 self-center'>{HighestScore}</h3>
                <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalScore}</h3>
            </div>
        </div>
    </div>
  )
}

export default ScoreView

