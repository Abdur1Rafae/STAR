
import React, { useState } from 'react';

const AvgScoreHighScoreCard = ({totalScore, highestScore, avgScore}) => {
  return (
    <div className='max-h-24 w-full bg-LightBlue rounded-md font-body shadow-md'>
      <div className='flex justify-around divide-black h-18 text-center py-1 px-2'>
        <div>
          <h1 className='text-xs lg:text-sm font-medium mb-1 lg:mb-2'>Highest Score </h1>
          <span className='text-lg lg:text-2xl font-bold text-DarkBlue '>{highestScore}</span>
        </div>
        <div>
          <h1 className='text-xs lg:text-sm font-medium mb-1 lg:mb-2'>Average Score </h1>
          <span className='text-lg lg:text-2xl font-bold text-DarkBlue'>{avgScore}</span>
        </div>
      </div>
      <div className='text-center	text-sm lg:text-md text-[#5F6368]'>out of {totalScore}</div>
    </div> 
  );
};

export default AvgScoreHighScoreCard;
