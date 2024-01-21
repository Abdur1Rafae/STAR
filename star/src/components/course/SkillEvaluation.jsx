import React from 'react'
import HorizontalProgressBar from './HorizontalProgressBar'

const SkillEvaluation = () => {
  return (
    <div className='w-full md:w-1/3 h-auto md:h-72 bg-LightBlue rounded-lg drop-shadow-md md:overflow-y-auto'>
        <h2 className='text-md font-semibold p-2 mb-4'>Skill Evaluation</h2>
        <div className='mx-2 mb-4'>
            <HorizontalProgressBar Skill={"Critical Thinking"} Score={85} Color={"#FF8100"}/>
        </div>
        <div className='mx-2 mb-4'>
            <HorizontalProgressBar Skill={"Problem Solving"} Score={65} Color={"#0177FB"}/>
        </div>
        <div className='mx-2 mb-4'>
            <HorizontalProgressBar Skill={"Design Basic"} Score={93} Color={"#7D88FD"}/>
        </div>
        <div className='mx-2 mb-10'>
            <HorizontalProgressBar Skill={"Logic"} Score={39} Color={"#EC5491"}/>
        </div>
        
    </div>
  )
}

export default SkillEvaluation