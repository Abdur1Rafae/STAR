import React from 'react'
import { FaRegCircleQuestion } from "react-icons/fa6";
import { BsCardChecklist } from "react-icons/bs";
import { RxClock } from "react-icons/rx";
import { StudentTicker, SubmissionTicker, ActiveTicker, FlagTicker } from '../Tickers';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';


const OSummary = ({  }) => {
  return (
    <div className='bg-LightBlue flex flex-col justify-around p-4' >
      <div className='flex flex-col md:flex-row justify-between md:gap-0 gap-4'>
        <div className='w-full flex flex-col gap-2'>
            <h2 className='font-bold text-xl'>Monthly Test</h2>
            <p className='font-semibold text-xs md:text-sm text-gray-500'>21 Dec 2023 09:00 - 21 Dec 2023 12:00</p>
            <div className='flex gap-4'>
                <div className="h-10 px-2 py-1 flex items-center text-gray-500 gap-2 bg-white text-xs font-medium border border-black">
                    <RxClock className='text-lg'/><p>120 Mins</p>
                </div>
                <div className="text-gray-500 bg-white text-xs font-medium border h-10 gap-2 border-black flex items-center px-2 py-1">
                    <FaRegCircleQuestion className='text-lg'/><p>20 Questions</p>
                </div>
                <div className="text-gray-500 bg-white text-xs font-medium border h-10 gap-2 border-black flex items-center px-2 py-1">
                    <BsCardChecklist className='text-lg'/><p>50 Marks</p>
                </div>
            </div>
        </div>
        <FlipClockCountdown
        className='self-center'
            to={"2024-03-08T23:55:00.635Z"}
            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
            labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', color:'black' }}
            digitBlockStyle={{ width: 20, height: 30, fontSize: 30, backgroundColor:'white', color:'#2C6491', fontWeight:700 }}
            dividerStyle={{ color: 'white', height: 1 }}
            separatorStyle={{ color: 'red', size: '6px' }}
            duration={0.5}
            />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 mb-4'>
         <StudentTicker value = {80}/>
         <SubmissionTicker value={50}/>
         <ActiveTicker value={30}/>
         <FlagTicker value={12}/>
      </div>
   </div>
  )
}

export default React.memo(OSummary)