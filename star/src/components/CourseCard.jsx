import React from 'react'

const CourseCard = ({Quiz_Count, Course_Title}) => {
  return (
    <div className='card-container w-56 h-[90px] bg-[#F4F9FD] mt-4 rounded-md'>
        <div className='pl-2 pt-2 pr-2 text-sm'>{Course_Title}</div>
        <div className='h-[25px] bg-[#274C77] text-white relative -bottom-4 rounded-b-lg'>
            {
                Quiz_Count <= 1 ? (<div className='pl-2 pr-2 text-sm font-semibold pb-1'>{Quiz_Count} Quiz</div>) 
                : 
                (<div className='pl-2 pr-2 text-sm font-semibold pb-1'>{Quiz_Count} Quizzes</div>)
            }
            
        </div>
    </div>
  )
}

export default CourseCard