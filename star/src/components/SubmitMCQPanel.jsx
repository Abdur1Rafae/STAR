import React, { useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import SubmitButton from './SubmitButton';

const SubmitMCQPanel = ({ question }) => {

  return (
    <div className="w-full mx-auto bg-white p-4 shadow-md rounded-md">
      <div className="">
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      <div className="mb-4">
        <div className='flex justify-between'>
          <p className="text-lg">{question?.text}</p>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div><QuizImage imageUrl={question?.imageurl} /></div>

      <div className="options">
        {question?.choices &&
          question?.choices.map((option, index) => (
            <div
              key={index}
              className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
            >
              <div
                className={`w-80 h-10 rounded-md mr-2 flex items-center justify-between border border-2 ${
                  question?.correctAnswer === option ? 'bg-green-300 ' : question?.selectedAnswer === option
                  ? 'bg-red-300 ' // Selected but incorrect answer
                  : ''
                }`}
              
              >
                <div class="relative start-5 inset-y-0 flex ">
                {question?.selectedAnswer === option ?<GrRadialSelected /> : String.fromCharCode(65 + index)}   </div>

                <div className='relative end-32'>&nbsp;{option}</div>
              </div>
            </div>
          ))}
      </div>

      
      <div className="flex items-center justify-between">
  <SubmitButton label="Previous" />
  <SubmitButton label="Next" />
</div>
      

    </div>
  );
};

export default SubmitMCQPanel;