
import React, { useState } from 'react';

const AvgScoreHighScoreCard = () => {
  return (
<div className='h-full w-full bg-LightBlue  rounded-md shadow '>
            <div className='grid grid-cols-2 divide-x divide-black h-24 p-2 text-center'>
              <div >
                <h1 className='text-sm font-semibold mb-5'>Highest Score </h1>
                <span className='text-5xl font-bold text-DarkBlue '>1</span>
              </div>
              <div >
                <h1 className='text-sm font-semibold mb-5'>Average Score </h1>
                <span className='text-5xl font-bold text-DarkBlue mt-9'>2</span>
              </div>
            </div>
            <div className='text-center	text-lg text-[#5F6368] m-4'>out of 2</div>
          </div> 
  );
};

export default AvgScoreHighScoreCard;
