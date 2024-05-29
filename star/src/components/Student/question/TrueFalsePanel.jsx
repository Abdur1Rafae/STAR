import React, { useState,useEffect } from 'react';
import { GiBullseye } from "react-icons/gi";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import { GrRadialSelected } from "react-icons/gr";
import QuizStore from '../../../Stores/QuizStore';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const TrueFalsePanel = ({ question, Flagged}) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [isFlagged, setIsFlagged] = useState(Flagged);
  const flagQuestion = QuizStore(store=> store.flagQuestion)
  const questionNumber = QuizStore(store => store.currentQuestionIndex)

  const filterQuestions = QuizStore(store=> store.filterQuestions)
  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const updateResponse = QuizStore(store=>store.updateResponse)
  const [response, setResponse] = useState(null)
  const modules = {
    toolbar: false
  };

  useEffect(()=> {
    const answer = getSelectedResponse(questionNumber)
    setResponse(answer && answer.answer ? answer.answer : [])
    setSelectedOption(answer && answer.answer ? answer.answer : [])
    setIsFlagged(question.flagged)
  }, [question])

  useEffect(() => {
    setResponse(answer => {
      const updatedAnswer = {
        questionId: question._id,
        answer: answer && answer.answer ? answer.answer : selectedOption
      };
      updateResponse(questionNumber, updatedAnswer);
      return answer;
    });
  }, [selectedOption]);

  const handleAnswerSelect = (answer) => {
    setSelectedOption([answer]);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    flagQuestion(questionNumber)
  };

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
          <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag}/>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      <div className="mb-4">
          <div className="mb-4 flex flex-col items-center">
            {question.image == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.image} /></button>}
            <div className='self-start w-full'>
              <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none'/>
            </div>
          </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div className="options flex justify-center">
      <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
              selectedOption.includes('True') ? 'bg-DarkBlue text-white' : ''
            }`}
            onClick={() => handleAnswerSelect('True')}
          >
            {selectedOption.includes("True") ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>True</p>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300">
          <div
            className={`w-full min-h-10 rounded-md mr-2 flex items-center border-[1px] border-black ${
              selectedOption.includes('False') ? 'bg-DarkBlue text-white' : ''
            }`}
            onClick={() => handleAnswerSelect('False')}
          >
            {selectedOption.includes("False") ?<GrRadialSelected className='ml-4'/> : ""}   
            <p className='ml-4'>False</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalsePanel;
