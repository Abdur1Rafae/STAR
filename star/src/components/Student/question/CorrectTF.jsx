import React, { useState,useEffect } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import { GrRadialSelected } from "react-icons/gr";
import QuizStore from '../../../Stores/QuizStore';

const CorrectTF = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const [correctAnswersMarked, setCAM] = useState([]);
  const [correctAnswersMissed, setCAMissed] = useState([]);


  useEffect(()=> {
      const answer = getSelectedResponse(question.number)
      setSelectedOption(answer ? answer.selectedAnswer : [])
  }, [])

  useEffect(()=> {
      let userSelectedCorrectAnswers = [];
      let correctAnswersNotSelected = [];
      question.options.forEach(option => {
          const isCorrect = option.isCorrect;
          const isSelected = selectedOption == option.text;
          if (isSelected && isCorrect) {
              userSelectedCorrectAnswers.push(option.text);
          } else if (!isSelected && isCorrect) {
              correctAnswersNotSelected.push(option.text);
          }
      });
      setCAM(userSelectedCorrectAnswers)
      setCAMissed(correctAnswersNotSelected)
  }, [selectedOption])

  return (
    <div className="w-full mx-auto bg-white p-4 rounded-md">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              True/False
            </p>
            <div className='flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.points} marks</p>
            </div>
          </div>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      <div className="mb-4">
          <div className="mb-4 flex flex-col items-center">
            {question.imageUrl == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.imageUrl} /></button>}
            <div className='self-start'>
                <p className="text-lg">{question?.question}</p>
            </div>
          </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div className="options flex justify-center">
      <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
              correctAnswersMarked.includes("True") || correctAnswersMissed.includes("True") ? 'bg-emerald-300' : 'bg-rose-300'
            }`}
          >
            {selectedOption === "True" ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>True</p>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
                correctAnswersMarked.includes("False") || correctAnswersMissed.includes("False") ? 'bg-emerald-300' : 'bg-rose-300'
            }`}
          >
            {selectedOption === "False" ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>False</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectTF;
