import React from 'react';
import { MdDelete } from "react-icons/md";

const AssessmentCard = ({  }) => {
  
  return (
      <button className={`w-72 font-body h-36 rounded bg-LightBlue border border-black shadow-[-7px_7px_0px_0px_rgba(44,100,145,1)] px-4 text-left`} onClick={()=>{window.location.assign("/teacher/library/MonthlyTest")}}>
        <div className='flex justify-end '>
          <div className=' mt-2 text-DeleteRed'><MdDelete size={21} /></div>
        </div>
        <h1 className='text-2xl font-medium mt-2'>Final Exam</h1>
        <div className='flex mt-4 w-full justify-between'>
          <div className='flex flex-col justify-center items-center'>
              <h3 className='text-sm text-DarkBlue font-semibold'>Last Modified</h3>
              <span className='text-xs font-semibold '>23 Jan 2020</span>
          </div>
          <div className='flex flex-col justify-center items-center'>
              <h3 className='text-sm text-DarkBlue font-semibold'>No. of Questions</h3>
              <span className='text-xs font-semibold'>15</span>
          </div>
        </div>
      </button>
  );
};

export default AssessmentCard;
