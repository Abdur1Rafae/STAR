import React, { useState, useEffect } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import QuizStore from '../../../Stores/QuizStore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const TextAnswerPanel = ({ question, Flagged }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isFlagged, setIsFlagged] = useState(Flagged);
  const flagQuestion = QuizStore(store=> store.flagQuestion)
  const filter = QuizStore(store=> store.filterQuestions)
  const questionNumber = QuizStore(store => store.currentQuestionIndex)

  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const updateResponse = QuizStore(store=>store.updateResponse)
  const [response, setResponse] = useState(null)

  useEffect(()=> {
    const answer = getSelectedResponse(questionNumber)
    setResponse(answer && answer.answer[0] ? answer.answer[0] : '')
    setUserAnswer(answer && answer.answer[0] ? answer.answer[0] : '')
  }, [question])

  useEffect(() => {
    setResponse(answer => {
      const updatedAnswer = {
        questionId: question._id,
        answer: [answer ? answer : userAnswer]
      };
      updateResponse(questionNumber, updatedAnswer);
      return answer;
    });
  }, [userAnswer]);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    flagQuestion(questionNumber)
    filter()
  };
  const modules = {
    toolbar: false
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
        {question.image == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.image} /></button>}
        <div className='flex justify-between self-start  w-full'>
          <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none'/>
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
