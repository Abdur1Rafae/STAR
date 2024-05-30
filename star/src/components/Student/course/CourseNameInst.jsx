import React from 'react'
import { MdOutlineArrowBackIos } from "react-icons/md";

const CourseNameInst = ({Course_Name, Instructor_Name}) => {
  return (
    <div className='w-full h-12 bg-LightBlue drop-shadow-md flex justify-between'>
        <div className='flex'>
            <button onClick={()=>{window.location.assign('/student/courses')}}><MdOutlineArrowBackIos className='text-2xl self-center'/></button>
            <h1 className="ml-4 self-center font-medium text-sm md:text-xl font-body">{Course_Name}</h1>
        </div>
        <div className='border-l-2 pl-2 border-black self-center md:mr-4 font-body font-medium flex text-xs md:text-sm'>
            <h2>Instructor : {Instructor_Name}</h2> 
        </div>
    </div>
  )
}

export default CourseNameInst