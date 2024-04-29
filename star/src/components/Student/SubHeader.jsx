import React from 'react'
import { BiSolidDashboard } from "react-icons/bi";
import { PiScrollFill } from "react-icons/pi";

const SubHeader = ({isActive}) => {
    return (
        <div className="h-12 bg-LightBlue border-b-[1px] border-black font-body">
            <div className="h-full flex w-full justify-around md:justify-start md:w-auto text-[#2C6491]">
                <div className="h-full flex md:ml-4 md:mr-8">
                    <button className={`flex items-center w-full ${isActive === 'Dashboard' ? 'text-DarkBlue border-b-2 border-DarkBlue' : 'text-gray-500 group relative inline-block'} justify-center`} onClick={()=>{window.location.assign("/home")}}>
                        <BiSolidDashboard className='mr-1' />
                        <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-DarkBlue transition-all duration-200 group-hover:w-full"></span>
                        Dashboard
                    </button>
                </div>
                <div className="h-full flex">
                    <button className={`flex items-center justify-center w-full ${isActive === 'Courses' ? 'text-DarkBlue border-b-2 border-DarkBlue' : 'text-gray-500 group relative inline-block'}`} onClick={()=>{window.location.assign("/courses")}}>
                        <PiScrollFill className='mr-1'/>
                        <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-DarkBlue transition-all duration-200 group-hover:w-full"></span>
                        <h1>Courses</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubHeader