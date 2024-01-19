import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import QuizImage from './QuizImage';
import FlagButton from '../button/FlagButton';

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
            <p className="text-lg font-semibold mr-2 p-2 box-border h-12 border border-black rounded-md">
              True/False Question
            </p>
            <div className='flex justify-between space-x-1 p-2 box-border h-12 border border-black rounded-md text-justify font-semibold'>
              <span><CiViewList /></span>
              <p className="text-sm"> {question?.marks} marks</p>
            </div>
          </div>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      <div className="mb-4">
        <div className='flex justify-between'>
          <p className="text-lg">{question?.text}</p>
          <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag} />
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div><QuizImage imageUrl={question?.imageurl} /></div>

      <div className="options">
        <div className="flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-80 h-10 rounded-md mr-2 flex items-center justify-center ${
              selectedAnswer === 'True' ? 'bg-blue-500 text-white' : ''
            }`}
            style={{
              background: selectedAnswer === 'True' ? '#274C77' : '',
              border: selectedAnswer === 'True' ? '1px solid #274C77' : '1px solid #000',
            }}
            onClick={() => handleAnswerSelect('True')}
          >
            <div class="relative inset-y-0 right-20 flex justify-between align-middle	">
              <p>True</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-80 h-10 rounded-md mr-2 flex items-center justify-center ${
              selectedAnswer === 'False' ? 'bg-blue-500 text-white' : ''
            }`}
            style={{
              background: selectedAnswer === 'False' ? '#274C77' : '',
              border: selectedAnswer === 'False' ? '1px solid #274C77' : '1px solid #000',
            }}
            onClick={() => handleAnswerSelect('False')}
          >
            <div class="relative inset-y-0 right-20 flex justify-between align-middle	">
              <p>False</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalsePanel;
