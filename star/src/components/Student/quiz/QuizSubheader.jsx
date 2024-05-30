import React from 'react'
import Timer from '../Timer'
import { CgNotes } from "react-icons/cg";
import { useMediaQuery } from 'react-responsive'
import { ToggleStore } from '../../../Stores/ToggleStore';
import QuizStore from '../../../Stores/QuizStore';
import { IoSaveOutline } from 'react-icons/io5';


const QuizSubheader = () => {
  const toggleNav = ToggleStore((store) => store.toggleNav)
  const {title, saveResponses} = QuizStore()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })

  let handleShowNav = () => {
    toggleNav()
  }
    return (
      <div className=''>
        <div className="h-12 w-screen lg:max-w-full bg-[#F4F9FD] border-black font-body flex">
        <div className={'leftContainer w-full border-black border-b-[1px] flex items-center justify-between'}>
              <div className='flex items-center'>
                <h1 className='ml-2 sm:ml-4 font-bold text-sm sm:text-lg'>{title}</h1>
                <Timer/>
              </div>
              <button onClick={()=>saveResponses()}><IoSaveOutline className='text-DarkBlue mr-4 text-2xl'/></button>
            </div>
            <div className={`rightContainer border-l-2  flex border-black transition-all duration-200 hover:text-DarkBlue border-b-[1px] items-center justify-center`}>
                <button className='ml-2 sm:ml-4 sm:mr-4 flex w-26 justify-around items-center lg:w-56' onClick={handleShowNav}>
                    <div className='sm:text-sm flex'>
                      {!isTabletOrMobile && <span>Quiz Navigation</span>}
                      <CgNotes className='text-xl ml-2 mr-2 self-center'/>
                    </div>
                    
                </button>
            </div>
        </div>
      </div>
    )
}

export default QuizSubheader