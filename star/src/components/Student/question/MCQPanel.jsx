import React, { useEffect, useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import { GiBullseye } from "react-icons/gi";
import QuizStore from '../../../Stores/QuizStore';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { baseUrl } from '../../../APIS/BaseUrl';

const MCQPanel = ({ question }) => {
  const [multiSelect, setMultiSelect] = useState(question.correctOptions.length > 1);
  const [isFlagged, setIsFlagged] = useState(question.flagged);
  const flagQuestion = QuizStore(store => store.flagQuestion);
  const questionNumber = QuizStore(store => store.currentQuestionIndex);

  const getSelectedResponse = QuizStore(store => store.getResponseByQuestionNumber);
  const updateResponse = QuizStore(store => store.updateResponse);
  const [selectedOption, setSelectedOption] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const answer = getSelectedResponse(questionNumber);
    const initialAnswer = answer && answer.answer ? answer.answer : [];
    setResponse(answer);
    setSelectedOption(initialAnswer);
    setIsFlagged(question.flagged);
    setMultiSelect(question.correctOptions.length > 1);
  }, [question, getSelectedResponse, questionNumber]);

  useEffect(() => {
    const updatedAnswer = {
      questionId: question._id,
      answer: selectedOption
    };
    updateResponse(questionNumber, updatedAnswer);
  }, [selectedOption, question._id, questionNumber, updateResponse]);

  const handleOptionClick = (option) => {
    const index = selectedOption.indexOf(option);
    if (multiSelect) {
      if (index !== -1) {
        const updatedOptions = selectedOption.filter(opt => opt !== option);
        setSelectedOption(updatedOptions);
      } else {
        setSelectedOption([...selectedOption, option]);
      }
    } else {
      setSelectedOption(index !== -1 ? [] : [option]);
    }
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    flagQuestion(questionNumber);
  };

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
              <div><GiBullseye className='text-gray-500 text-lg self-center' /></div>
              <p className="text-gray-500 text-sm self-center"> {question?.points} marks</p>
            </div>
          </div>
        </div>
        <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag} />
      </div>
      <div className="mb-4 flex flex-col items-center">
        <div className='self-start  w-full'>
          <div className=' w-full mt-4'>
            <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none' />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col-reverse md:flex-row items-start'>
        <div className="w-full md:w-1/2">
          {question?.options &&
            question?.options.map((option, index) => (
              <div
                key={index}
                className={`mt-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
                onClick={() => handleOptionClick(option)}
              >
                <div
                  className={`min-h-10 rounded-md flex items-center gap-4  ${
                    selectedOption.includes(option) ? 'bg-DarkBlue text-white' : ''
                  } border-[1px] border-black`}
                >
                  <div className="ml-4">
                    {selectedOption.includes(option) ? <GrRadialSelected /> : String.fromCharCode(65 + index)}
                  </div>
                  <div className=''>{option}</div>
                </div>
              </div>
            ))}
        </div>
        <div className='w-full md:w-1/2 h-44 flex  items-center md:items-start justify-center'>
          {question.image ? <button className='h-44 w-52'><QuizImage imageUrl={question?.image} /></button> : null}
        </div>
      </div>
    </div>
  );
};

export default MCQPanel;
