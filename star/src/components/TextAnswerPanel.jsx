import React, { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import QuizImage from './QuizImage';
import FlagButton from './FlagButton';

const TextAnswerPanel = ({ question, onAnswerSubmit, currentQuestion, totalQuestions }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isFlagged, setIsFlagged] = useState(false);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    // You can add any validation or additional logic here before submitting the answer
    onAnswerSubmit(userAnswer);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    // Add logic to handle flag toggling (you can pass this information to the parent component if needed)
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-1/2 mx-auto bg-white p-4 shadow-md rounded-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-2 p-2 box-border h-12 border border-black rounded-md">
              Text Answer Question
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
        <textarea
          className="w-full p-2 mb-2 bg-transparent border border-black rounded-md"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={handleAnswerChange}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAnswerSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default TextAnswerPanel;
