import React from 'react'
import PastQuizCard from './PastQuizCard'

const AssessmentHistory = () => {
  return (
    <div className='w-full md:w-1/3 h-auto md:h-72 bg-LightBlue rounded-lg drop-shadow-md md:overflow-y-scroll'>
        <h2 className='text-md font-semibold p-2'>Assessment History</h2>
        <div className='px-2 mt-4'>
            <button className='w-full mb-2'>
                <PastQuizCard AchievedScore={54} totalScore={60} Date={"November 14"} Time={"14:00"} Name={"Assessment 1"}/>
            </button>
            <button className='w-full mb-2'>
                <PastQuizCard AchievedScore={54} totalScore={60} Date={"November 14"} Time={"14:00"} Name={"Assessment 1"}/>
            </button>
            <button className='w-full mb-2'>
                <PastQuizCard AchievedScore={54} totalScore={60} Date={"November 14"} Time={"14:00"} Name={"Assessment 1"}/>
            </button>
            <button className='w-full mb-2'>
                <PastQuizCard AchievedScore={54} totalScore={60} Date={"November 14"} Time={"14:00"} Name={"Assessment 1"}/>
            </button>
        </div>
    </div>
  )
}

export default AssessmentHistory