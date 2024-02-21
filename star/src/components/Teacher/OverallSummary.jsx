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
import CardFlipTimer from '../CardFlipTimer'


const OverallSummary = ({  }) => {
  return (
   <div className='w-full bg-LightBlue shadow-inner drop-shadow-lg  justify-around border border-black' >
      <div className=' md:grid grid-cols-2 md:flex-row md:justify-between '>
         <div className = 'flex items-center justify-start'>
            <div className=''>
               <div className='ml-4'>
               <div className='flex items-center '>
                  <div className='font-bold text-xl md:text-2xl pb-2 '>Monthly Test</div>
                  <p className="text-gray-500 bg-white w-fit text-xs  mr-4 lg:text-md font-medium border h-fit gap-2 border-black flex items-center px-2 py-1 ml-2">
                     <RxClock className='text-sm'/>
                     120 Mins
                  </p>
               
                  <p className="text-gray-500 bg-white w-fit text-xs  mr-4 lg:text-md font-medium border h-fit gap-2 border-black flex items-center px-2 py-1 ">
                     <BsCardChecklist className='text-sm'/>
                     50 Marks
                  </p>
                  
               </div>   
               
               
               <div className='font-semibold text-xs md:text-sm text-gray-500'>20 Questions</div>
               <p className='font-semibold  text-xs md:text-sm text-gray-500 justify-right pb-4 '>21 Dec 2023 09:00 AM - 21 Dec 2023 12:00 PM</p>
               </div>
              
            </div>
         
         </div>
         <div className='grid grid-cols-2 md:grid-cols-2 gap-4 md:m-4 px-4 mt-4 mb-4'>
                  <StudentTicker value = {80}/>
                  <SubmissionTicker value={50}/>
                  <ActiveTicker value={30}/>
                  <FlagTicker value={12}/>
         </div>
         
      </div>
      
   </div>
  )
}

export default OverallSummary