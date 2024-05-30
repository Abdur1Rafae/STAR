import React from 'react';


const QuestionTabTile = ({ index, active , onClick, percent}) => {
  const textColor = percent > 60 ? 'text-[#70FF71]' : 'text-[#FF6058]';
  return (
    <div className={`h-full ${active ? 'bg-DarkBlue text-white' : 'bg-transparent'} m-2 rounded-md hover:cursor-pointer`} onClick={onClick}>
      <div className='flex items-center w-full justify-between p-2'>
        <div className='text-sm font-medium'>
           Question {index+1}
        </div>
        <div className={`text-xl font-semibold ${textColor}`}>
        {percent}%
        </div>
      </div>
    </div>
  );
};

export default QuestionTabTile;
