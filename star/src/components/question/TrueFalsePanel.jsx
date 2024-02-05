import React, { useState } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import FlagButton from '../button/FlagButton';
import { GrRadialSelected } from "react-icons/gr";

const TrueFalsePanel = ({ question, onAnswerSelect, currentQuestion, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelect(answer);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    // Add logic to handle flag toggling (you can pass this information to the parent component if needed)
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-3/4 mx-auto bg-white p-4 shadow-md rounded-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              Multiple Choice Question
            </p>
            <div className='flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.marks} marks</p>
            </div>
          </div>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      <div className="mb-4">
        <div className='flex justify-between'>
          <div className='w-11/12'>
            <p className="text-lg">{question?.text}</p>
          </div>
          <div className='flex justify-center w-1/12'>
            <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag}/>
          </div>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div><QuizImage imageUrl={question?.imageurl} /></div>

      <div className="options flex justify-center">
      <div className="flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-80 h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
              selectedAnswer === 'True' ? 'bg-DarkBlue text-white' : ''
            }`}
            onClick={() => handleAnswerSelect('True')}
          >
            {selectedAnswer === "True" ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>True</p>
          </div>
        </div>

        <div className="flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-80 h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
              selectedAnswer === 'False' ? 'bg-DarkBlue text-white' : ''
            }`}
            onClick={() => handleAnswerSelect('False')}
          >
            {selectedAnswer === "False" ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>False</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalsePanel;
