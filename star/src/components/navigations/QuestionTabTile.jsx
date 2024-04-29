import React, { useState , useContext } from 'react';


const QuestionTabTile = ({ key , singlequestioninfo, active , onClick}) => {
  const textColor = singlequestioninfo.points > 60 ? 'text-[#70FF71]' : 'text-[#FF6058]';

  return (
    <div className={`h-full ${active ? 'bg-DarkBlue text-white' : 'bg-transparent'} m-2 rounded-md`} onClick={onClick}>
      <div className='flex items-center w-full justify-between p-2'>
        <div className='text-sm font-medium'>
           {singlequestioninfo.type}
        </div>
        <div className={`text-xl font-semibold ${textColor}`}>
        {singlequestioninfo.points}
        </div>
      </div>
    </div>
  );
};

export default QuestionTabTile;