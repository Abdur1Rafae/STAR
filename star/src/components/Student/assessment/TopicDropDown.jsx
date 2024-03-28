import React, { useState } from 'react'
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import HorizontalProgressBar from '../course/HorizontalProgressBar';

const TopicDropDown = ({topic, score, totalQuestions, correctQuestions}) => {
    let [showDetail, setShowDetail] = useState(false)

    let handleShowDetail = () => {
        setShowDetail(!showDetail)
    }
  return (
    <div className='container w-full'>
        <div className='flex w-full mt-1 items-center justify-between'>
            <button className='w-full flex items-center w-80' onClick={handleShowDetail}>
                {
                    showDetail ? <RiArrowDownSFill className='text-blue-500 text-lg celf-center flex-none'/>
                    : <RiArrowRightSFill className='text-blue-500 text-lg celf-center flex-none'/>

                }
                <h5 className='text-sm ml-2 text-gray-700 text-left'>{topic}</h5>
            </button>
            <div className='mx-2 mb-4 w-80'>
                <HorizontalProgressBar Score={score} Color={"#2C6491"}/>
            </div>
        </div>
        <div className={`mx-auto w-8/12 overflow-hidden transition-all ease-out duration-500 ${
          showDetail ? 'h-12' : 'h-0'
        }`}>
            <div className='flex justify-around w-full'>
                <div className='flex flex-col justify-center items-center'>
                    <h3 className='text-blue-500 font-medium'>10</h3>
                    <p className='text-sm text-gray-700'>Questions</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h3 className='text-green-500 font-medium'>10</h3>
                    <p className='text-sm text-gray-700'>Correct</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h3 className='text-red-500 font-medium'>10</h3>
                    <p className='text-sm text-gray-700'>Missed</p>
                </div>
            </div>
        </div> 
    </div>
    
  )
}

export default TopicDropDown