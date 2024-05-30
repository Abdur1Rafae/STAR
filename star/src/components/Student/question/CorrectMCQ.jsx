import React, { useEffect, useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import { GiBullseye } from "react-icons/gi";
import QuizStore from '../../../Stores/QuizStore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const CorrectMCQ = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState({})
  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const [correctAnswersMarked, setCAM] = useState([]);
  const [correctAnswersMissed, setCAMissed] = useState([]);
    
  const questionNumber = QuizStore(store => store.currentQuestionIndex)


  useEffect(()=> {
    const answer = getSelectedResponse(questionNumber)
    setSelectedOption(answer ? answer : {})
  }, [question])

  useEffect(()=> {
    let userSelectedCorrectAnswers = [];
    let correctAnswersNotSelected = [];
    if(selectedOption.answer) {
      question.options.forEach(option => {
        const isCorrect = selectedOption.correctOptions.includes(option);
        const isSelected = selectedOption.answer.includes(option);
  
        if (isSelected && isCorrect) {
          userSelectedCorrectAnswers.push(option);
        } else if (!isSelected && isCorrect) {
          correctAnswersNotSelected.push(option);
        }
      });
      setCAM(userSelectedCorrectAnswers)
      setCAMissed(correctAnswersNotSelected)
    }
  }, [selectedOption])
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
      <div className="mb-4 flex flex-col items-center">
        {question.image == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.image} /></button>}
          <div className='self-start w-full  mt-4'>
            <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none'/>
          </div>
      </div>


      <div className="w-full md:w-1/2">
        {question?.options &&
          question?.options.map((option, index) => (
            <div
              key={index}
              className={`mt-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
            >
              <div
                className={`min-h-10 rounded-md flex items-center gap-4  ${
                  correctAnswersMarked.includes(option) || correctAnswersMissed.includes(option) ? 'bg-emerald-300' : ''
                } border-[1px] border-black`}
              >
                <div className="ml-4">
                {(selectedOption.answer && selectedOption.answer.includes(option)) ?<GrRadialSelected /> : String.fromCharCode(65 + index)}   </div>

                <div className=''>{option}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CorrectMCQ;