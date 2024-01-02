// MCQPanel.js
import React, { useState } from 'react';
import { AiOutlineFlag, AiFillFlag } from 'react-icons/ai';

const MCQPanel = ({ question, options, onOptionSelect, currentQuestion, totalQuestions }) => {
  const heading = 'Multiple Choice Question:';
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleOptionClick = (option, index) => {
    onOptionSelect(option);
    setSelectedOption(option);
    setSelectedOptionIndex(index);
  };

  const handleFlagClick = () => {
    setIsFlagged(!isFlagged);
  };

  return (
    <div className="mcq-panel">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        {heading}
        <span className="pl-32 ml auto">
          {isFlagged ? (
            <AiFillFlag className="text-red-500 mr-2 cursor-pointer" onClick={handleFlagClick} />
          ) : (
            <AiOutlineFlag className="text-gray-500 mr-2 cursor-pointer" onClick={handleFlagClick} />
          )}
          <span className="text-sm">{isFlagged ? 'Flagged' : 'Flag this question'}</span>
        </span>
      </h2>
      <p className="text-sm">
        Question {currentQuestion + 1} / {totalQuestions}
      </p>

      <h3 className="text-xl mb-4">{question}</h3>

      <div className="options">
        {options &&
          options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              onClick={() => handleOptionClick(option, index)}
            >
              <div
                className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center ${
                  selectedOption === option ? 'bg-blue-500 text-white' : ''
                }`}
                style={{
                  background: selectedOptionIndex === index ? '#274C77' : '',
                  border: selectedOptionIndex === index ? '1px solid #274C77' : '1px solid #000',
                }}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <div>{option}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MCQPanel;
