import React, { useState } from 'react';
import { AiOutlineFlag, AiFillFlag } from 'react-icons/ai';

const TextAnswerPanel = ({ question, currentQuestion, totalQuestions }) => {
  const heading = 'Text Answer Question:';
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isFlagged, setIsFlagged] = useState(false);

  const handleAnswerChange = (e) => {
    setTypedAnswer(e.target.value);
  };

  const handleFlagClick = () => {
    setIsFlagged(!isFlagged);
  };

  return (
    <div className="text-answer-panel">
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

      <div className="answer">
        <textarea
          value={typedAnswer}
          onChange={handleAnswerChange}
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          style={{borderColor: "black"}} 
       />
      </div>
    </div>
  );
};

export default TextAnswerPanel;
