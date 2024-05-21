// QuestionDetails.js

import React from 'react';

const QuestionDetails = ({ score, topic, difficulty, skillTargeted, totalScore }) => {

  const difficultyClasses = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500', 
    Difficult: 'text-red-500',
    Hard: 'text-DarkBlue'
  };

  // Get the corresponding CSS class for the current difficulty
  const difficultyClass = difficultyClasses[difficulty] || 'text-gray-500';

  return (
    <div className="p-4">
      <h2 className="text-lg font-medium font-body pb-4">Question Details</h2>
      
      <div className="mb-4">
        <div className="mb-2">
          <div className='text-sm'>
            <div className='mt-2 w-full'>
              <div className='flex text-xs font-body w-full'>
                  <h4 className='font-medium w-32 md:w-24'>Score:</h4>
                  <div className='w-full flex justify-center'>{score} out of {totalScore}</div>
              </div>

              <div className='flex text-xs mt-2  font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Difficulty:</h4>
                  <div className={`w-full flex justify-center ${difficultyClass}`}>{difficulty}</div>
              </div>

              <div className='flex text-xs mt-2 font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Skill:</h4>
                  <div className='w-full flex justify-center self-center'>{skillTargeted}</div>
              </div>

              <div className='flex text-xs mt-2 font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Topic:</h4>
                  <div className='w-full flex justify-center'>{topic}</div>
              </div>
            </div>
          </div>
        </div>


      </div>

    
    </div>
  );
};

export default QuestionDetails;
