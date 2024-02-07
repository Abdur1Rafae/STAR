import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiGreekTemple } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { useSelector } from 'react-redux';

const SideBar = ({active}) => {
    const showNav = useSelector((state)=>state.teacherNav.value)
  return (
    <div className={`overflow-hidden order-[2] md:order-first md:sticky md:top-0 md:w-20 md:h-screen md:border-r-[1px] bg-LightBlue w-full transition-all ease-out duration-500 ${showNav ? 'h-28' : 'h-0'} border-b-[1px] border-black flex items-center justify-center font-body`}>
        <div className={`flex flex-row md:flex-col gap-8 items-center md:mb-8`}>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Schedule" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`}>
                <FaRegCalendarAlt className='text-2xl'/>
                <p className='text-xs'>Schedule</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Classes" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`}>
                <LiaChalkboardTeacherSolid className='text-2xl'/>
                <p className='text-xs'>Classes</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Library" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`}>
                <GiGreekTemple className='text-2xl'/>
                <p className='text-xs'>Library</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Reports" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`}>
                <TbReportAnalytics className='text-2xl'/>
                <p className='text-xs'>Reports</p>
            </button>
        </div>
    </div>
  )
}

export default SideBar