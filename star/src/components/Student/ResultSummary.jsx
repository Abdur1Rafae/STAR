import React, { useState } from 'react';
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const ResultSummary = ({ correctAnswers, wrongAnswers, obtainedMarks, totalMarks  , questionNumbers}) => {
  const [currentQuestion, SetCurrentQuestion] = useState(0);

  const handleQuestionClick = ({questionNumber}) => {
    SetCurrentQuestion(questionNumber)
  }

  return (
    <div className="p-4 bg-LightBlue h-full drop-shadow-md">
      <h2 className="text-lg font-bold font-body pb-4">Result Summary</h2>

      <div className="flex flex-col justify-center items-center">
        <div className='h-16 w-16 flex flex-col justify-center'>
          <h3 className='text-4xl text-DarkBlue font-body font-semibold self-center'>{obtainedMarks}</h3>
          <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalMarks}</h3>
        </div>
        <div className='text-xs self-center'>
          <span className="flex text-green-500 items-center">
            <span className='pr-[1px]'><GoCheck /></span>  {correctAnswers} Correct Answers
          </span>
          <span className="flex text-red-500 items-center">
            <span className='pr-[1px]'><IoMdClose /></span>
            {wrongAnswers} Wrong Answers
          </span>
        </div>
      </div>

      <hr class="h-px my-8 border-[1px] border-black"></hr>
      
      <div className="mt-4">
        <h3 className="text-lg font-bold font-body">Questions</h3>
        <p className='text-sm pb-4'>Click to navigate to specific question</p>
      </div>

      <div className="flex flex-wrap justify-evenly gap-2">
        {questionNumbers.map((questionNumber) => (
          <button key={questionNumber.number} onClick={() => handleQuestionClick({ questionNumber: questionNumber.number })} className={`${questionNumber.status == 0 ? 'text-green-500' : 'text-red-500'} ${currentQuestion == questionNumber.number ? 'border-2 border-DarkBlue' : 'hover:border-2 hover:border-DarkBlue'} font-medium w-[30px] h-[30px] border rounded text-center sm:text-sm md:text-md bg-[#E7ECEF]`}>
            {questionNumber.number}
          </button>
        ))}
      </div>   
    </div>
    

  );
};

export default ResultSummary;
