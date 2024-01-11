import React, {useState} from 'react'
import Timer from './Timer'
import { CgNotes } from "react-icons/cg";
import QuizNavigation from './QuizNavigation';
import { useMediaQuery } from 'react-responsive'

const QuizSubheader = () => {
  let [showNav, setShowNav] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })

  let handleShowNav = () => {
    setShowNav(!showNav)
  }
    let name = "Monthly Test"
    return (
      <div className='container'>
        <div className="h-12 w-screen lg:max-w-full bg-[#F4F9FD] border-black font-body flex">
            <div className={'w-full border-black border-b-[1px] leftContainer flex items-center'}>
              <h1 className='ml-2 sm:ml-4 font-bold text-sm sm:text-lg'>{name}</h1>
              <Timer initialTime = {60*5}/>
            </div>
            <div className={`rightContainer flex border-black ${showNav ? 'border-b-0' : 'border-b-[1px]'} items-center justify-center`}>
                <button className='ml-2 sm:ml-4 sm:mr-4 flex w-26 justify-around items-center lg:w-56' onClick={handleShowNav}>
                    <div className='sm:text-sm flex'>
                      {!isTabletOrMobile && <span>Quiz Navigation</span>}
                      <CgNotes className='text-xl ml-2 mr-2 self-center'/>
                    </div>
                    
                </button>
            </div>
        </div>
        <div className={`overflow-hidden z-10 dialogue absolute border-l-[1px] border-black right-0 bg-[#F4F9FD] transition-all ease-out duration-500 ${showNav ? 'w-64 h-full lg:h-full' : 'w-0 h-full lg:w-64 lg:h-0'}`}>
          <div className='h-full dropdown-list w-full sm:w-36 lg:w-64 flex items-start justify-around'>
            {showNav && (
              <>
                <QuizNavigation/>
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default QuizSubheader