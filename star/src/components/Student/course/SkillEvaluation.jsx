import React from 'react'
import HorizontalProgressBar from './HorizontalProgressBar'

const SkillEvaluation = ({skills}) => {
  const colorsArr = [
    "#FF8100", // Original color
    "#0177FB", // Original color
    "#7D88FD", // Original color
    "#EC5491", // Original color
    "#34D399", // New color (green)
    "#FBBF24", // New color (yellow)
    "#10B981", // New color (emerald)
    "#F87171", // New color (red)
    "#6366F1"  // New color (indigo)
  ];
  return (
    <div className='w-full md:w-1/3 h-auto md:h-72 bg-LightBlue rounded-lg drop-shadow-md md:overflow-y-auto'>
        <h2 className='text-md font-semibold p-2 mb-4'>Skill Evaluation</h2>
        {Object.entries(skills).map(([key, value], index) => (
            <div key={index} className='mx-2 mb-4'>
                <HorizontalProgressBar Skill={key} Score={Math.round(value.correct / value.total * 100)} Color={colorsArr[index]}/>
            </div>
        ))}
    </div>
  )
}

export default SkillEvaluation