import React, { useState, useEffect } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import { GrRadialSelected } from "react-icons/gr";
import AdapQuizStore from '../../../Stores/AdaptiveQuizStore';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const AdapTrueFalsePanel = ({ question, Flagged }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const questionNumber = AdapQuizStore(store => store.questionAttempt);

  const getSelectedResponse = AdapQuizStore(store => store.getResponseByQuestionNumber);
  const updateResponse = AdapQuizStore(store => store.updateResponse);
  const modules = { toolbar: false };

  useEffect(() => {
    const answer = getSelectedResponse(questionNumber);
    const initialAnswer = answer && answer.answer ? answer.answer : [];
    setSelectedOption(initialAnswer);
  }, [question, questionNumber, getSelectedResponse]);

  useEffect(() => {
    const updatedResponse = { questionId: question._id, answer: selectedOption };
    updateResponse(questionNumber, updatedResponse);
  }, [selectedOption, question._id, questionNumber, updateResponse]);

  const handleAnswerSelect = (answer) => {
    setSelectedOption([answer]);
  };

  return (
    <div className="w-full mx-auto bg-white p-4 rounded-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              True/False
            </p>
            <div className='mr-2 flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center">
                {question?.points} marks
              </p>
            </div>
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              {question?.difficulty}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col items-center">
        {question.image && (
          <button className='h-32 w-40'>
            <QuizImage imageUrl={question.image} />
          </button>
        )}
        <div className='self-start w-full'>
          <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none' />
        </div>
      </div>
      <div className="options flex justify-center">
        <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${selectedOption.includes('True') ? 'bg-DarkBlue text-white' : ''}`}
            onClick={() => handleAnswerSelect('True')}
          >
            {selectedOption.includes('True') && <GrRadialSelected className='ml-4' />}
            <p className='ml-4'>True</p>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${selectedOption.includes('False') ? 'bg-DarkBlue text-white' : ''}`}
            onClick={() => handleAnswerSelect('False')}
          >
            {selectedOption.includes('False') && <GrRadialSelected className='ml-4' />}
            <p className='ml-4'>False</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdapTrueFalsePanel;
