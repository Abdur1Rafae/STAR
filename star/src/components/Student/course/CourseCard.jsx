import React from 'react'
import { FaCircleArrowRight } from "react-icons/fa6";

const CourseCard = ({classInfo}) => {
  const handleClassClick = () => {
    localStorage.setItem('selectedClass', JSON.stringify(classInfo))
    window.location.assign(`courses/${classInfo.className}`);
  }
  return (
    <button className='font-body text-left w-56 h-[90px] bg-[#F4F9FD] mt-4 rounded-md border-[1px] border-black transition-all duration-200 flex flex-col justify-between hover:scale-105' onClick={handleClassClick}>
        <div className='pl-2 pt-2 pr-2 text-sm md:text-xs'>{classInfo.className}</div>
        <div className='h-[25px] bg-[#2C6491] text-white rounded-b-md flex items-center w-full'>
            {
                classInfo.assessment <= 1 ? (<div className='pl-2 pr-2 h-full text-sm font-semibold flex items-center'>{classInfo.assessment} Quiz</div>) 
                : 
                (<div className='pl-2 pr-2 h-full text-sm font-semibold flex items-center'>{classInfo.assessment} Quizzes</div>)
            }
            <div className='flex text-xs h-full ml-auto mr-2'>
              <FaCircleArrowRight className='self-center text-[#C5D86D] text-sm'/>
            </div>
        </div>
    </button>
  )
}

export default CourseCard