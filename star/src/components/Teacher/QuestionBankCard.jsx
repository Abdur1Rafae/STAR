// QuestionBankCard.js

import React from 'react';
import { MdDelete } from "react-icons/md";

const QuestionBankCard = ({ isselection, onClick, id,  Name, date, count }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <button className={`w-72 font-body h-36 rounded bg-LightBlue border border-black ${isselection ? 'border-DarkBlue' : ''} ${isselection ? 'shadow-[-7px_7px_0px_0px_rgba(44,100,145,1)]' : 'shadow-none'} px-4 text-left`} onClick={onClick}>
      {!isselection && (
        <div className='flex justify-end'>
          <div className='mt-2 text-DeleteRed'><MdDelete size={21} /></div>
        </div>
      )}
      <h1 className='text-2xl font-medium mt-2'>{Name}</h1>
      <div className='flex mt-4 w-full justify-between'>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-sm text-DarkBlue font-semibold'>Last Modified</h3>
          <span className='text-xs font-semibold '>{formatDate(date)}</span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-sm text-DarkBlue font-semibold'>No. of Questions</h3>
          <span className='text-xs font-semibold'>{count}</span>
        </div>
      </div>
    </button>
  );
};

export default QuestionBankCard;
