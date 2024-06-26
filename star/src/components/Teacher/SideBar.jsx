import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GiGreekTemple } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { ToggleStore } from '../../Stores/ToggleStore';

const SideBar = ({active}) => {
    const showNav = ToggleStore((store)=> store.TeacherSidebar)
  return (
    <div className={`overflow-hidden order-[2] md:order-first md:sticky md:top-0 md:min-w-[60px] md:max-w-[60px] md:h-screen md:border-r-[1px] bg-LightBlue w-full transition-height ease-out duration-500 ${showNav ? 'h-28' : 'h-0'} border-black flex items-center justify-center font-body`}>
        <div className={`flex flex-row md:flex-col gap-8 items-center md:mb-8`}>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Home" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`} onClick={()=>{window.location.assign('/teacher/home')}}>
                <FaRegCalendarAlt className='text-2xl'/>
                <p className='text-xs'>Home</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Classes" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`} onClick={()=>{window.location.assign('/teacher/classes')}}>
                <LiaChalkboardTeacherSolid className='text-2xl'/>
                <p className='text-xs'>Classes</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Library" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`} onClick={()=>{window.location.assign('/teacher/library')}}>
                <GiGreekTemple className='text-2xl'/>
                <p className='text-xs'>Library</p>
            </button>
            <button className={`w-11/12 flex flex-col items-center p-2 ${active == "Reports" ? 'bg-DarkBlue rounded-lg drop-shadow-md text-white' : ''}`} onClick={()=>{window.location.assign('/teacher/reports')}}>
                <TbReportAnalytics className='text-2xl'/>
                <p className='text-xs'>Reports</p>
            </button>
        </div>
    </div>
  )
}

export default SideBar