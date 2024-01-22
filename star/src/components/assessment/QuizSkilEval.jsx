import React from "react"
import { RadarGraph } from "./RadarGraph"

const QuizSkilEval = () => {
  return (
    <div className='flex-grow flex flex-col h-80 bg-LightBlue mb-4 drop-shadow-md px-4 py-2'>
        <h3 className='font-medium text-sm font-body'>Skill Evaluation</h3>
        <div className='w-full h-72 flex justify-center'>
            <RadarGraph/>
        </div>
    </div>
  )
}

export default QuizSkilEval