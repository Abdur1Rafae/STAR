import React, { useEffect, useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import { GiBullseye } from "react-icons/gi";
import QuizStore from '../../../Stores/QuizStore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const CorrectSA = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState({})
  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const [correctAnswersMarked, setCAM] = useState([]);
  const [correctAnswersMissed, setCAMissed] = useState([]);
    
  const questionNumber = QuizStore(store => store.currentQuestionIndex)


  useEffect(()=> {
    const answer = getSelectedResponse(questionNumber)
    setSelectedOption(answer ? answer : {})
    console.log(answer)
  }, [question])
  const modules = {
    toolbar: false
  };


  return (
    <div className="w-full mx-auto bg-white p-4 rounded-md select-none">
      <div className="flex justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-gray-500 min-w-32 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center justify-center">
              Multiple Choice
            </p>
            <div className='flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.points} marks</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-black border-2 mt-2 mb-4"></div>
      <div className="mb-4 flex flex-col items-center">
        {question.image == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.image} /></button>}
          <div className=' w-full self-start'>
            <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none'/>
          </div>
      </div>

      <div className="border-t border-black border-2 mt-2"></div>

      <div className="options mt-2">
        <textarea
        disabled
          className="w-full h-32 p-2 mb-2 bg-transparent border border-black rounded-md resize-none"
          placeholder="Type your answer here..."
          value={selectedOption.answer ? selectedOption.answer[0] : ''}
        />
      </div>
      
      <p className='mt-4 text-xs'>Response will be checked later by your instructor. Please find help in the explanation(if any) provided by your instructor below</p>
      <div className="options">
        <textarea
          className="w-full h-32 p-2 mb-2 bg-transparent border border-black rounded-md resize-none"
          value={question.explanation}
          disabled
        />
      </div>
    </div>
  );
};

export default CorrectSA;