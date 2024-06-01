import React from "react"
import { RadarGraph } from "./RadarGraph"
import { PercentageBarChart } from "../../PercentageBarChart"

const QuizSkilEval = ({inputData}) => {
  return (
    <div className='flex-grow flex flex-col justify-start h-full bg-LightBlue drop-shadow-md px-4'>
        <h3 className='font-medium text-sm font-body mt-2'>Skill Evaluation</h3>
        <div className='w-full h-72 flex justify-center items-center pt-4'>
          {
            Object.keys(inputData).length > 2 ?
            <RadarGraph inputData={inputData}/>
            :
            <PercentageBarChart inputData={inputData}/>
          }
        </div>
    </div>
  )
}

export default QuizSkilEval