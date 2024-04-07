
import React, { useState } from 'react';

const AvgScoreHighScoreCard = () => {
  return (
<div className='h-full w-full bg-LightBlue rounded-md font-body'>
            <div className='grid grid-cols-2 divide-x divide-black h-18 p-2 text-center'>
              <div >
                <h1 className='text-sm font-medium mb-2'>Highest Score </h1>
                <span className='text-2xl font-bold text-DarkBlue '>1</span>
              </div>
              <div >
                <h1 className='text-sm font-medium mb-2'>Average Score </h1>
                <span className='text-2xl font-bold text-DarkBlue'>2</span>
              </div>
            </div>
            <div className='text-center	text-md text-[#5F6368]'>out of 2</div>
          </div> 
  );
};

export default AvgScoreHighScoreCard;
