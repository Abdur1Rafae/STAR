import React from "react"
import { RadarGraph } from "./RadarGraph"

const QuizSkilEval = ({inputData}) => {
  return (
    <div className='flex-grow flex flex-col h-80 bg-LightBlue drop-shadow-md px-4 py-2'>
        <h3 className='font-medium text-sm font-body'>Skill Evaluation</h3>
        <div className='w-full h-72 flex justify-center'>
            <RadarGraph inputData={inputData}/>
        </div>
    </div>
  )
}

export default QuizSkilEval