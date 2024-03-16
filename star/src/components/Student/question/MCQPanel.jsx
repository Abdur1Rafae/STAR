import React, { useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import { GiBullseye } from "react-icons/gi";

const MCQPanel = ({ question, onOptionSelect }) => {
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
    <div className="w-full mx-auto bg-white p-4 rounded-md select-none">
      <div className="flex justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 min-w-32 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              Multiple Choice Question
            </p>
            <div className='flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.point} marks</p>
            </div>
          </div>
        </div>
        <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag}/>
      </div>
      <div className="border-t border-black border-2 mt-2 mb-4"></div>
      <div className="mb-4 flex flex-col items-center">
        <button className='h-32 w-40'><QuizImage imageUrl={question?.imageUrl} /></button>
        <div className='self-start'>
          <div className=''>
            <p className="text-lg">{question?.question}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-black border-2 mt-2"></div>

      <div className="options">
        {question?.options &&
          question?.options.map((option, index) => (
            <div
              key={index}
              className={`mt-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              onClick={() => handleOptionClick(option, index)}
            >
              <div
                className={`h-10 rounded-md flex items-center gap-4  ${
                  selectedOption === option ? 'bg-DarkBlue text-white' : ''
                } border-[1px] border-black`}
              >
                <div className="ml-4">
                {selectedOption === option ?<GrRadialSelected /> : String.fromCharCode(65 + index)}   </div>

                <div className=''>{option.text}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MCQPanel;