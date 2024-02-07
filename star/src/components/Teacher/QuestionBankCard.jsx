import React from 'react';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";



const AssessmentCard = ({  }) => {
   

    return (
        <div className={`w-80 font-body h-44 rounded bg-LightBlue border border-black shadow-[-7px_7px_0px_0px_rgba(44,100,145,1)] px-4`}>
          <div className='flex justify-end '>
            <div  className='mr-2 mt-2'><MdModeEdit size={21} /></div>
            <div className=' mt-2 text-DeleteRed'><MdDelete size={21} /></div>
          </div>
          <h1 className='text-2xl font-medium mt-4'>Final Exam</h1>
          <div className='flex mt-6 w-full justify-between'>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-sm text-DarkBlue font-semibold'>Last Modified</h3>
                <span className='text-xs font-semibold '>23 Jan 2020</span>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h3 className='text-sm text-DarkBlue font-semibold'>No. of Questions</h3>
                <span className='text-xs font-semibold'>15</span>
            </div>
          </div>
        </div>
    );
};

export default AssessmentCard;
