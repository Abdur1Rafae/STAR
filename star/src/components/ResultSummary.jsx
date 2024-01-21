// ResultSummary.js

import React from 'react';
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const ResultSummary = ({ correctAnswers, wrongAnswers, obtainedMarks, totalMarks  , questionNumbers}) => {
  return (
    <div className="p-4">
      <h2 className="text-l font-bold pb-4">Result Summary</h2>

      <div className="flex">
        <div className='w-4/5 '>
          <span className="flex text-sm text-green-500 items-center">
            <span className='pr-2'><GoCheck /></span>  {correctAnswers} Correct Answers
          </span>
          <span className="flex text-sm text-red-500 items-center">
            <span className='pr-2'><IoMdClose /></span>
            {wrongAnswers} Wrong Answers
          </span>
        </div>
        <div className='w-1/3 flex flex-col items-center justify-center'>
  <span className="sm:text-l md:text-2xl text-brand-blue">
    <strong>{obtainedMarks}</strong>
  </span>
  <span className='sm:text-sm pl-4 text-sm text-gray-500'>out of {totalMarks}</span>
</div>

      </div>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* Questions section */}
      <div className="mt-4">
        <h3 className="text-l font-bold">Questions</h3>
        <p className='text-sm pb-4'>Click to navigate to specific question</p>
        {/* Add your questions content here */}
      </div>

        <div class="grid grid-rows-2 grid-flow-col gap-2">
        <div className="flex flex-wrap">
          {questionNumbers.map((questionNumber) => (
            <div key={questionNumber} className="w-1/5 sm:h-1/4 md:h-1/3 p-2 border rounded mr-2 mb-2 text-center sm:text-sm md:text-md  bg-gray-300">
              {questionNumber}
            </div>
          ))}
        </div>   
        </div>
    </div>
    

  );
};

export default ResultSummary;
