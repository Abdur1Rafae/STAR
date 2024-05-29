import React, { useEffect, useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import { GiBullseye } from "react-icons/gi";
import AdapQuizStore from '../../../Stores/AdaptiveQuizStore';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { baseUrl } from '../../../APIS/BaseUrl';

const AdapMCQPanel = ({ question }) => {
  const [multiSelect, setMultiSelect] = useState(question.correctOptions.length > 1)
  const questionNumber = AdapQuizStore(store => store.questionAttempt);

  const getSelectedResponse = AdapQuizStore(store => store.getResponseByQuestionNumber);
  const updateResponse = AdapQuizStore(store => store.updateResponse);
  const [selectedOption, setSelectedOption] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const answer = getSelectedResponse(questionNumber);
    setResponse(answer);
    setSelectedOption(answer && answer.answer ? answer.answer : []);
  }, [question, questionNumber, getSelectedResponse]);

  useEffect(() => {
    if (response) {
      const updatedAnswer = {
        ...response,
        answer: selectedOption
      };
      updateResponse(questionNumber, updatedAnswer);
    }
  }, [selectedOption, response, questionNumber, updateResponse]);

  const handleOptionClick = (option) => {
    const index = selectedOption.indexOf(option);
    if(multiSelect) {
      if (index !== -1) {
        const updatedOptions = [...selectedOption];
        updatedOptions.splice(index, 1);
        setSelectedOption(updatedOptions);
        const updatedResponse = {
          questionId: question._id,
          answer: updatedOptions
        };
        setResponse(updatedResponse)
      } else {
        setSelectedOption([...selectedOption, option]);
        const updatedResponse = {
          questionId: question._id,
          answer: [...selectedOption, option]
        };
        setResponse(updatedResponse)
      }
    }
    else {
      if (index !== -1) {
        const updatedOptions = [...selectedOption];
        updatedOptions.splice(index, 1);
        setSelectedOption(updatedOptions);
        const updatedResponse = {
          questionId: question._id,
          answer: updatedOptions
        };
        setResponse(updatedResponse)
      } else {
        setSelectedOption([option]);
        const updatedResponse = {
          questionId: question._id,
          answer: [option]
        };
        setResponse(updatedResponse)
      }
    }
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
            <div className='mr-2 flex justify-between space-x-1 px-2 h-12 border border-black rounded-md items-center font-semibold'>
              <div><GiBullseye className='text-gray-500 text-lg self-center'/></div>
              <p className="text-gray-500 text-sm self-center"> {question?.difficulty === 'Easy' ? 1 : question?.difficulty === 'Medium' ? 2 : 3} marks</p>
            </div>
            <p className="text-gray-500 text-sm lg:text-md font-medium mr-2 p-2 border h-12 border-black rounded-md flex items-center">
              {question?.difficulty}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-black border-2 mt-2 mb-4"></div>
      <div className="mb-4 flex flex-col items-center">
        <div className='self-start w-full'>
          <div className='w-full'>
            <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-lg select-none'/>
          </div>
        </div>
      </div>

      <div className="border-t border-black border-2 mt-2"></div>

      <div className='w-full md:w-1/2 flex items-start'>
        <div className="w-full">
          {question?.options && question.options.map((option, index) => (
            <div
              key={index}
              className={`mt-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              onClick={() => handleOptionClick(option)}
            >
              <div className={`min-h-10 rounded-md flex items-center gap-4 ${selectedOption.includes(option) ? 'bg-DarkBlue text-white' : ''} border-[1px] border-black`}>
                <div className="ml-4">
                  {selectedOption.includes(option) ? <GrRadialSelected /> : String.fromCharCode(65 + index)}
                </div>
                <div>{option}</div>
              </div>
            </div>
          ))}
        </div>
        {question?.image && (
          <button className='h-32 w-40'>
            <QuizImage imageUrl={`${baseUrl}teacherhub/${question.image}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdapMCQPanel;
