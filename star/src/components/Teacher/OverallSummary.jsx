import React from 'react'
import RadialTimer from '../RadialTimer';
import { BsCardChecklist } from "react-icons/bs";
import profileimagecircle from '../profile-circle.png'
import greentick from '../tick-green.png'
import redflagged from '../flagged-red.png'
import sandglass from '../sandglass.png'
import { RxClock } from "react-icons/rx";
import { StudentTicker } from '../Tickers';
import { SubmissionTicker } from '../Tickers';
import { ActiveTicker } from '../Tickers';
import { FlagTicker } from '../Tickers';



const OverallSummary = ({  }) => {
  return (
   <div className='bg-LightBlue shadow-inner drop-shadow-lg flex flex-col justify-around' >
      <div className='flex flex-col md:flex-row md:justify-between'>
         <div className = 'flex items-center justify-start'>
            <RadialTimer totalTime={60} className="flex justify-center" />
            <div className=''>
               <div className='font-bold text-xl md:text-2xl pb-2 '>Monthly Test</div>
               <div className='font-semibold text-xs md:text-sm text-gray-500'>20 Questions</div>
            </div>
         </div>
         <div className='flex flex-col justify-center items-center md:items-end md:mr-2'>
            <p className='font-semibold  text-xs md:text-sm text-gray-500 justify-right pb-4 '>21 Dec 2023 09:00 AM - 21 Dec 2023 12:00 PM</p>
            <div className="flex items-center justify-end">
               <div className="flex items-center ">
                  <p className="text-gray-500 bg-white w-fit text-xs md:text-sm mr-4 lg:text-md font-medium border h-10 gap-2 border-black flex items-center px-4 py-2">
                     <RxClock className='text-lg'/>
                     120 Mins
                  </p>
                  <p className="text-gray-500 bg-white w-fit text-xs md:text-sm lg:text-md font-medium border h-10 gap-2 border-black flex items-center px-4 py-2">
                     <BsCardChecklist className='text-lg'/>
                     50 Marks
                  </p>
               </div>
            </div>
         </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:m-4 px-4 mt-4 mb-4'>
         <StudentTicker value = {80}/>
         <SubmissionTicker value={50}/>
         <ActiveTicker value={30}/>
         <FlagTicker value={12}/>
      </div>

   </div>
  )
}

export default OverallSummary