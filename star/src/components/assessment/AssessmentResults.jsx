import React from 'react'
import CircularProgressBar from '../course/CircularProgressBar'
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { TbPasswordFingerprint } from "react-icons/tb";

const AssessmentResults = () => {
  return (
    <div className='flex-grow bg-LightBlue h-28 md:mb-0 flex p-2 items-center drop-shadow-md md:w-60 w-full'>
        <div className='h-28 flex'>
            <CircularProgressBar percentage={87} width={8}/>
        </div>
        <div className='w-1/2 flex flex-col ml-8'>
            <div className='flex justify-between border-b-[1px] border-black'>
                <h5 className='text-xs font-medium'>Correct</h5>
                <div className='ml-8 flex items-center mb-2'>
                    <FaCheck className='text-green-500 text-xs self-center'/>
                    <h5 className='text-xs font-medium ml-4'>10</h5>
                </div>
            </div>
            <div className='flex justify-between border-b-[1px] border-black mt-2'>
                <h5 className='text-xs font-medium'>Incorrect</h5>
                <div className='ml-6 flex items-center mb-2'>
                    <RxCross2 className='text-red-500 text-xs self-center'/>
                    <h5 className='text-xs font-medium ml-4'>10</h5>
                </div>
            </div>
            <div className='flex justify-between mt-2'>
                <h5 className='text-xs font-medium'>Skipped</h5>
                <div className='ml-7 flex items-center'>
                    <TbPasswordFingerprint className='text-blue-500 text-xs self-center'/>
                    <h5 className='text-xs font-medium ml-4'>10</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AssessmentResults