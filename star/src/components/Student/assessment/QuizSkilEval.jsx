import React from "react"
import { RadarGraph } from "./RadarGraph"
import { PercentageBarChart } from "../../PercentageBarChart"

const QuizSkilEval = ({inputData}) => {
  console.log(inputData)
  return (
    <div className='flex-grow flex flex-col justify-center h-80 bg-LightBlue drop-shadow-md px-4 py-2'>
        <h3 className='font-medium text-sm font-body'>Skill Evaluation</h3>
        <div className='w-full h-72 flex justify-center items-center'>
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