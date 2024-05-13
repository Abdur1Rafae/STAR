import React from 'react';

const QuestionBankCard = ({ onClick, className, id,  Name, date, count }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <button className={`w-52 h-24 font-body rounded bg-LightBlue border border-DarkBlue shadow-[-5px_5px_0px_0px_rgba(44,100,145,1)] px-2 text-left`} onClick={onClick}>
      <p className='text-sm mt-2 font-medium'>{Name}</p>
      <span className='text-[8px] font-normal'>{className}</span>
      <div className='flex mt-2 w-full justify-between mb-2 gap-4 items-center'>
        <div className='flex flex-col justify-center items-center w-1/2'>
          <p className='text-[10px] text-DarkBlue font-semibold'>Scheduled</p>
          <span className='text-[8px] font-normal'>{formatDate(date)}</span>
        </div>
        <div className='flex flex-col justify-center items-center w-1/2'>
          <p className='text-[10px] text-DarkBlue font-semibold'>Questions</p>
          <span className='text-[8px] font-normal'>{count}</span>
        </div>
      </div>
    </button>
  );
};

export default QuestionBankCard;
