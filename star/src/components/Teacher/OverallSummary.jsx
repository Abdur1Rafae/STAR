import React from 'react'
import { FaSearch } from 'react-icons/fa';
import RadialTimer from '../RadialTimer';
import Tickers from '../Tickers';
import { GiBullseye } from "react-icons/gi";
import profileimagecircle from '../profile-circle.png'
import greentick from '../tick-green.png'
import redflagged from '../flagged-red.png'
import sandglass from '../sandglass.png'
import LCSearchBar from './LCSearchBar';



const OverallSummary = ({  }) => {
  return (
    <div className='bg-[#F4F9FD] h-96 md:h-64  shadow-inner drop-shadow-lg ' >
   <div className=" md:flex  justify-left items-center h-24 w-full m-2">
     <div className = 'flex'>
      <RadialTimer totalTime={60} className="flex justify-center" />
      <div className='pb-4  m-2 '>
         <div className='font-bold text-xl md:text-2xl pb-2 pt-2 '>Monthly Test</div>
         <div className='font-semibold text-xs md:text-sm text-gray-500 pb-1'>Course : Introduction to Computing </div>
         <div className='font-semibold text-xs md:text-sm text-gray-500'>20 Questions</div>
      </div>
      </div>
      <div className='absolute right-6 '>
         <div className='font-semibold  text-xs md:text-sm text-gray-500 justify-right pb-4 '>21 December 2023 09:00 AM  Till 21 December 2023 12:00 PM</div>
         <div className="flex items-center justify-between">
            <div className="flex items-center ">
               <p className="text-gray-500 bg-white w-fit text-xs md:text-sm lg:text-md font-medium mr-2 border h-12 border-black rounded-md flex items-center">
                  Multiple Choice Question
               </p>
               <div className='flex bg-white justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
                  <div>
                     <GiBullseye className='text-gray-500 text-lg self-center'/>
                  </div>
                  <p className="text-gray-500  text-xs md:text-sm self-center"> 20 marks</p>
               </div>
            </div>
         </div>
      </div>
   
   </div>
   <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:m-4 mt-28'>
   <Tickers image={profileimagecircle} heading={"Total Students"} value = {80}/>
   <Tickers image={greentick} heading={"Submissions"} value = {10}/>
   <Tickers image={sandglass} heading={"Active"} value = {50}/>
   <Tickers image={redflagged} heading={"Flagged"} value = {8}/>
   </div>
   
</div>
  )
}

export default OverallSummary