import React, { useState } from 'react';
import { AiOutlineFlag, AiFillFlag } from 'react-icons/ai';

const TrueFalsePanel = ({ question, onAnswerSelect, currentQuestion, totalQuestions }) => {
  const heading = 'True/False Question:';
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleAnswerClick = (answer) => {
    onAnswerSelect(answer);
    setSelectedAnswer(answer);
  };

  const handleFlagClick = () => {
    setIsFlagged(!isFlagged);
  };

  return (
    <div className="true-false-panel">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        {heading}
        <span className="pl-32 ml-auto">
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

      <div className="answers">
        <div
          className={`flex items-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
          onClick={() => handleAnswerClick('True')}
        >
          <div
            className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center ${
              selectedAnswer === 'True' ? 'bg-blue-500 text-white' : ''
            }`}
            style={{
              background: selectedAnswer === 'True' ? '#274C77' : '',
              border: selectedAnswer === 'True' ? '1px solid #274C77' : '1px solid #000',
            }}
          >
            T
          </div>
          <div>True</div>
        </div>
        <div
          className={`flex items-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
          onClick={() => handleAnswerClick('False')}
        >
          <div
            className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center ${
              selectedAnswer === 'False' ? 'bg-blue-500 text-white' : ''
            }`}
            style={{
              background: selectedAnswer === 'False' ? '#274C77' : '',
              border: selectedAnswer === 'False' ? '1px solid #274C77' : '1px solid #000',
            }}
          >
            F
          </div>
          <div>False</div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalsePanel;
