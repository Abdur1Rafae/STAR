import React from 'react'
import { PiStudentLight } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { FcReadingEbook } from "react-icons/fc";
import { AiFillAlert } from "react-icons/ai";

export const StudentTicker = ({value}) => {
  return (
    <div className='flex bg-white border border-gray-300 p-2 gap-4 md:gap-8 h-12 md:h-16 justify-center' >
        <PiStudentLight className='text-4xl self-center' />
        <div className='self-center flex flex-col'>
            <div className='font-semibold text-xs sm:text-sm text-gray-500'>Students</div>
            <div className='font-semibold text-md md:text-2xl self-center'>{value}</div>
        </div>
   </div>
  )
}

export const SubmissionTicker = ({value}) => {
  return (
    <div className='flex bg-white border border-gray-300 p-2 gap-4 md:gap-8 h-12 md:h-16 justify-center' >
        <VscLayersActive className='text-4xl self-center text-green-600' />
        <div className='self-center flex flex-col'>
            <div className='font-semibold text-xs sm:text-sm text-gray-500'>Submissions</div>
            <div className='font-semibold text-md md:text-2xl self-center'>{value}</div>
        </div>
   </div>
  )
}

export const ActiveTicker = ({value}) => {
  return (
    <div className='flex bg-white border border-gray-300 p-2 gap-4 md:gap-8 h-12 md:h-16 justify-center' >
        <FcReadingEbook className='text-4xl self-center' />
        <div className='self-center flex flex-col'>
            <div className='font-semibold text-xs sm:text-sm text-gray-500'>Attempting</div>
            <div className='font-semibold text-md md:text-2xl self-center'>{value}</div>
        </div>
   </div>
  )
}

export const FlagTicker = ({value}) => {
  return (
    <div className='flex bg-white border border-gray-300 p-2 gap-4 md:gap-8 h-12 md:h-16 justify-center' >
        <AiFillAlert className='text-4xl self-center text-red-600' />
        <div className='self-center flex flex-col'>
            <div className='font-semibold text-xs sm:text-sm text-gray-500'>Flagged</div>
            <div className='font-semibold text-md md:text-2xl self-center'>{value}</div>
        </div>
   </div>
  )
}
