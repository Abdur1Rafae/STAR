import React from 'react'
import { GiPapers } from "react-icons/gi";
import { IoPencilOutline } from "react-icons/io5";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const QuizCountImp = () => {
    var totalCOunt = 2;
    var attempts = 2;
    var improvement = 20
  return (
    <div className='w-full md:w-80 lg:w-6/12 bg-LightBlue h-28 rounded-lg flex justify-around font-medium drop-shadow-md'>
        <div className="totalQuiz flex flex-col justify-center items-center w-auto">
            <div className='flex items-center'>
                <GiPapers className='text-violet-700'/>
                <p className='text-xs ml-[1px]'>Assessments</p>
            </div>
            <div>
                <h1 className='text-DarkBlue text-xl md:text-3xl'>{totalCOunt}</h1>
            </div>
            <p className='text-xs ml-[1px]'>Conducted</p>
        </div>
        <div className="attemptedQuiz flex flex-col justify-center items-center w-auto">
        <div className='flex items-center'>
                <IoPencilOutline className='text-orange-400'/>
                <p className='text-xs ml-[1px]'>Assessments</p>
            </div>
            <div>
                <h1 className='text-red-400 text-xl md:text-3xl'>{attempts}</h1>
            </div>
            <p className='text-xs ml-[1px]'>Attempted</p>
        </div>
        <div className="imp flex flex-col justify-center items-center w-auto">
            <div className='flex items-center'>
                <AiOutlineBarChart  className='text-DarkBlue'/>
                <p className='text-xs ml-[1px]'>Achieved</p>
            </div>
            <div className='flex'>
                {
                    improvement>0 ?
                    <FaArrowTrendUp className={`self-center text-lg text-green-500 mr-2`}/> :
                    <FaArrowTrendDown className={`self-center text-lg text-red-500 mr-2`}/>
                }
                <h1 className={`text-DarkBlue text-xl md:text-3xl ${improvement>0 ? 'text-green-500' : 'text-red-500'}`}>{improvement} %</h1>
            </div>
            <p className='text-xs ml-[1px]'>Improvement</p>
        </div>
    </div>
  )
}

export default QuizCountImp