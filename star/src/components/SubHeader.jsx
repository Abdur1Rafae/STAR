import React from 'react'
import { BiSolidDashboard } from "react-icons/bi";
import { PiScrollFill } from "react-icons/pi";
import { ImStatsBars } from "react-icons/im";

const SubHeader = ({isActive}) => {
    return (
        <div className="h-12 bg-[#F4F9FD] border-b-[1px] border-black font-body">
            <div className="Container h-full w-full flex justify-around text-[#2C6491] lg:w-6/12">
                <div className="container ml-4 h-full flex">
                <button className={`dashboard flex items-center w-full ${isActive === 'Dashboard' ? 'text-[#2C6491]' : 'text-black'} justify-center`} onClick={()=>{window.location.assign("/home")}}>
                    <BiSolidDashboard className='mr-2' />
                    Dashboard
                </button>
                </div>
                <div className="container ml-4 h-full flex">
                    <button className={`dashboard flex items-center justify-center w-full ${isActive === 'Courses' ? 'text-[#2C6491]' : 'text-black'}`} onClick={()=>{window.location.assign("/courses")}}>
                        <PiScrollFill className='mr-2'/>
                        <h1>Courses</h1>
                    </button>
                </div>
                <div className="container ml-4 mr-2 h-full flex">
                    <button className={`dashboard flex items-center justify-center w-full ${isActive === 'Reports' ? 'text-[#2C6491]' : 'text-black'}`} onClick={()=>{window.location.assign("/reports")}}>
                        <ImStatsBars className='mr-2'/>
                        Reports
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubHeader