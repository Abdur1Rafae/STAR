import React, { useState, useEffect } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import QuizStore from '../../../Stores/QuizStore';

const TextAnswerPanel = ({ question, onAnswerSubmit, Flagged }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isFlagged, setIsFlagged] = useState(Flagged);
  const flagQuestion = QuizStore(store=> store.flagQuestion)
  const filter = QuizStore(store=> store.filterQuestions)

  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const updateResponse = QuizStore(store=>store.updateResponse)
  const [response, setResponse] = useState(null)

  useEffect(()=> {
    const answer = getSelectedResponse(question.number)
    setResponse(answer ? answer.selectedAnswer : '')
    setUserAnswer(answer ? answer.selectedAnswer : '')
  }, [])

  useEffect(() => {
    setResponse(answer => {
      const updatedAnswer = {
        number: question.number,
        type: question.type,
        selectedAnswer: answer ? answer : userAnswer
      };
      updateResponse(question.number, updatedAnswer);
      return answer;
    });
  }, [userAnswer]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    onAnswerSubmit(userAnswer);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    flagQuestion()
    filter()
    // Add logic to handle flag toggling (you can pass this information to the parent component if needed)
  };

  return (
    <div className="w-full mx-auto bg-white p-4 rounded-md mb-4">
      <div className="mb-4 flex justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              Short Question
            </p>
            <div className='flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.points} marks</p>
            </div>
          </div>
        </div>
        <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag}/>
      </div>
      <div className="border-t border-black border-2 mt-2 mb-4"></div>
      <div className="mb-4 flex flex-col items-center">
        {question.imageUrl == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.imageUrl} /></button>}
        <div className='flex justify-between self-start'>
            <p className="text-lg select-none">{question?.question}</p>
        </div>
      </div>

      <div className="border-t border-black border-2 mb-4 "></div>

      <div className="options">
        <textarea
          className="w-full h-32 p-2 mb-2 bg-transparent border border-black rounded-md resize-none"
          placeholder="Type your answer here..."
          value={userAnswer}
          onChange={handleAnswerChange}
        />
      </div>
    </div>
  );
};

export default TextAnswerPanel;
