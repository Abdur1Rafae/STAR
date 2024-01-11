import React from 'react'
import { FaCircleArrowRight } from "react-icons/fa6";

const CourseCard = ({Quiz_Count, Course_Title}) => {
  return (
    <div className='card-container w-56 h-[90px] bg-[#F4F9FD] mt-4 rounded-md border-[1px] border-black flex flex-col justify-between'>
        <div className='pl-2 pt-2 pr-2 text-sm md:text-xs'>{Course_Title}</div>
        <div className='h-[25px] bg-[#2C6491] text-white rounded-b-lg flex items-center'>
            {
                Quiz_Count <= 1 ? (<div className='pl-2 pr-2 h-full text-sm font-semibold flex items-center'>{Quiz_Count} Quiz</div>) 
                : 
                (<div className='pl-2 pr-2 h-full text-sm font-semibold flex items-center'>{Quiz_Count} Quizzes</div>)
            }
            <div className='rightContainer flex text-xs h-full ml-auto mr-2'>
              <FaCircleArrowRight className='self-center text-[#C5D86D] text-sm'/>
            </div>
        </div>
    </div>
  )
}

export default CourseCard