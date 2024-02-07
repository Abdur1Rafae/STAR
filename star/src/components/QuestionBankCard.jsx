import React from 'react';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";



const AssessmentCard = ({  }) => {
   

    return (
        <div className={`h-48 w-full rounded bg-#F4F9FD border border-black shadow-DarkBlue shadow-[rgba(0,0,15,0.5)_-5px_5px_4px_0px]`}>
          <div className='flex justify-end '>
          <div  className='  mr-2 mt-2'><MdModeEdit size={21} /></div>
          <div className=' mr-2 mt-2'><MdDelete color='DeleteRed' size={21} /></div>
          </div>
          <h1 className='text-xl font-semibold pl-2 pt-4'>Final Exam</h1>
          <div className='grid grid-cols-2 ml-2 mt-4 '>
            <div>
                <h3 className='text-sm text-DarkBlue font-semibold'>Last Modified</h3>
                <span className='text-xs font-semibold '>23 Jan 2020</span>
            </div>
            <div>
                <h3 className='text-sm text-DarkBlue font-semibold'>Total Number of Questions</h3>
                <span className='text-xs font-semibold'>15</span>
            </div>
          </div>
        </div>
    );
};

export default AssessmentCard;
