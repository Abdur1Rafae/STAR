import React from 'react'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaPaperclipSolid } from "react-icons/lia";

const QuizTitleBar = ({Course_Name, assessment_Name}) => {
  return (
    <div className='w-full bg-LightBlue drop-shadow-md flex flex-col justify-around md:flex-row md:justify-between'>
        <div className='self-center md:h-auto h-12 flex flex-col w-full md:w-1/2 md:mt-0 mt-2'>
            <div className='flex'>
              <MdOutlineArrowBackIos className='text-2xl self-center'/>
              <div className='flex flex-col'>
                <h1 className="ml-4 font-medium text-md font-body">{assessment_Name}</h1>
                <h1 className="ml-4 font-light text-sm font-body">{Course_Name}</h1>
              </div>
            </div>
        </div>
        <div className='self-center mt-4 md:m-0 md:mr-4 flex justify-around md:justify-end text-sm w-full md:w-1/2 h-12'>
            <button className='flex h-full items-center mr-4 border-b-2 border-DarkBlue'>
              <TbReportAnalytics className='self-center text-xl'/>
              <h3 className='font-medium'>Summmary</h3>
            </button>
            <button className='flex items-center'>
              <LiaPaperclipSolid className='self-center text-xl'/>
              <h3 className='font-medium'>Submission</h3>
            </button>
        </div>
    </div>
  )
}

export default QuizTitleBar