import React from 'react'
import { BiSolidDashboard } from "react-icons/bi";
import { PiScrollFill } from "react-icons/pi";
import { ImStatsBars } from "react-icons/im";

const SubHeader = ({isActive}) => {
    return (
        <div className="h-12 bg-[#F4F9FD] border-b-[1px] border-black font-body">
            <div className="h-full flex w-full justify-around md:justify-start md:w-auto text-[#2C6491]">
                <div className="h-full flex md:ml-4 md:mr-8">
                    <button className={`dashboard flex items-center w-full ${isActive === 'Dashboard' ? 'text-[#2C6491]' : 'text-black'} justify-center`} onClick={()=>{window.location.assign("/home")}}>
                        <BiSolidDashboard className='mr-1' />
                        Dashboard
                    </button>
                </div>
                <div className="h-full flex">
                    <button className={`dashboard flex items-center justify-center w-full ${isActive === 'Courses' ? 'text-[#2C6491]' : 'text-black'}`} onClick={()=>{window.location.assign("/courses")}}>
                        <PiScrollFill className='mr-1'/>
                        <h1>Courses</h1>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubHeader