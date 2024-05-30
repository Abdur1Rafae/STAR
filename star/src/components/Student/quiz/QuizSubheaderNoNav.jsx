import React from 'react'
import Timer from '../Timer'
import AdapQuizStore from '../../../Stores/AdaptiveQuizStore';
import { IoSaveOutline } from "react-icons/io5";


const QuizSubheaderNoNav = () => {
  const {title, saveResponses} = AdapQuizStore()
    return (
      <div className=''>
        <div className="h-12 w-screen lg:max-w-full bg-[#F4F9FD] border-black font-body flex">
            <div className={'leftContainer w-full border-black border-b-[1px] flex items-center justify-between'}>
              <div className='flex items-center'>
                <h1 className='ml-2 sm:ml-4 font-bold text-sm sm:text-lg'>{title}</h1>
                <Timer adaptive={true}/>
              </div>
              <button onClick={()=>saveResponses()}><IoSaveOutline className='text-DarkBlue mr-4 text-2xl'/></button>
            </div>
        </div>
      </div>
    )
}

export default QuizSubheaderNoNav