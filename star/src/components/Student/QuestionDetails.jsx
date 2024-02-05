// QuestionDetails.js

import React from 'react';

const QuestionDetails = ({ score, topic, difficulty, skillTargeted, currentQuestion, totalQuestions }) => {

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
      <h2 className="text-lg font-bold font-body pb-4">Question Details</h2>
      
      <div className="mb-4">
        <div className="mb-2">
          <div className='text-sm'>
            <div className='mt-2 w-full'>
              <div className='flex text-xs font-body w-full'>
                  <h4 className='font-medium w-32 md:w-24'>Score:</h4>
                  <div className='w-full flex justify-center'>{score} out of 10</div>
              </div>

              <div className='flex text-xs mt-2  font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Difficulty:</h4>
                  <div className={`w-full flex justify-center ${difficultyClass}`}>{difficulty}</div>
              </div>

              <div className='flex text-xs mt-2 font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Skill Targeted:</h4>
                  <div className='w-full flex justify-center self-center'>{skillTargeted}</div>
              </div>

              <div className='flex text-xs mt-2 font-body'>
                  <h4 className='font-medium w-32 md:w-24'>Topic:</h4>
                  <div className='w-full flex justify-center'>{topic}</div>
              </div>
            </div>
          </div>
        </div>

        <hr class="h-px my-8 border-[1px] border-black"></hr>

        <div>
        <h2 className="text-l font-bold pb-4">Feedback</h2>

        <p className='text-sm font-light'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
        </p>

        </div>
      </div>

    
    </div>
  );
};

export default QuestionDetails;
