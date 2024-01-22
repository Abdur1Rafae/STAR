// QuestionDetails.js

import React from 'react';

const QuestionDetails = ({ score, topic, difficulty, skillTargeted, currentQuestion, totalQuestions }) => {
  // Define CSS classes for different difficulty levels
  const difficultyClasses = {
    Easy: 'text-green-500', // Adjust color according to your preference
    Medium: 'text-yellow-500', // Adjust color according to your preference
    Hard: 'text-red-500', // Adjust color according to your preference
  };

  // Get the corresponding CSS class for the current difficulty
  const difficultyClass = difficultyClasses[difficulty] || 'text-gray-500'; // Default to gray if difficulty is not recognized

  return (
    <div className="p-4">
      <h2 className="text-l font-bold pb-4">Question Details</h2>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className='font-bold text-sm'>
            <p className='sm:text-sm md:text-md md:flex pb-2 md:pb-2 '>
              Score: 
              &nbsp;
              <div className='flex font-medium'>
                <span>{score} out of 10 </span>
              </div>
            </p>
            <p className={`flex pb-2 `}>
              Difficulty: 
              &nbsp;
              <div className={`flex font-medium  ${difficultyClass}`}>
                <span >{difficulty}</span>
              </div>
            </p>
            <p className='flex pb-2'>
                Skill Targeted:
                &nbsp;
            <div className={`flex font-medium  items-center`}>
                <span>{skillTargeted}</span>
              </div>
            </p>
            <p className='flex pb-2'>
              Topic: 
              &nbsp;
              <div className={`flex font-medium `}>
                <span >{topic}</span>
              </div>
            </p>
          </div>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div>
        <h2 className="text-l font-bold pb-4">Explanation</h2>
        <p className='text-sm font-light'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
        </p>
        </div>
        <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

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
