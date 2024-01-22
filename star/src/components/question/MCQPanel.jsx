import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import FlagButton from '../button/FlagButton'; // Import the FlagButton component

const MCQPanel = ({ question, onOptionSelect, currentQuestion, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
  };

  return (
    <div className="w-full mx-auto bg-white p-4 shadow-md rounded-md">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm lg:text-lg font-semibold mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              Multiple Choice Question
            </p>
            <div className='flex justify-between space-x-1 p-2 box-border h-12 border border-black rounded-md text-justify items-center font-semibold'>
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
        {question?.choices &&
          question?.choices.map((option, index) => (
            <div
              key={index}
              className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              onClick={() => handleOptionClick(option, index)}
            >
              <div
                className={`w-80 h-10 rounded-md mr-2 flex items-center justify-between  ${
                  selectedOption === option ? 'bg-blue-500 text-white' : ''
                }`}
                style={{
                  background: selectedOption === option ? '#274C77' : '',
                  border: selectedOption === option ? '1px solid #274C77' : '1px solid #000',
                }}
              >
                <div class="relative start-5 inset-y-0 flex ">
                {selectedOption === option ?<GrRadialSelected /> : String.fromCharCode(65 + index)}   </div>

                <div className='relative end-32'>&nbsp;{option}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MCQPanel;