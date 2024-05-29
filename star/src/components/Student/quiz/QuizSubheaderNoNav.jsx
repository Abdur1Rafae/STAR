import React from 'react'
import Timer from '../Timer'
import AdapQuizStore from '../../../Stores/AdaptiveQuizStore';


const QuizSubheaderNoNav = () => {
  const {title} = AdapQuizStore()
    let name = title
    return (
      <div className=''>
        <div className="h-12 w-screen lg:max-w-full bg-[#F4F9FD] border-black font-body flex">
            <div className={'leftContainer w-full border-black border-b-[1px] flex items-center'}>
              <h1 className='ml-2 sm:ml-4 font-bold text-sm sm:text-lg'>{name}</h1>
              <Timer adaptive={true}/>
            </div>
        </div>
      </div>
    )
}

export default QuizSubheaderNoNav