import React, { useEffect, useState } from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import FlagButton from '../../button/FlagButton';
import { GiBullseye } from "react-icons/gi";
import QuizStore from '../../../Stores/QuizStore';

const MCQPanel = ({ question, onOptionSelect, Flagged }) => {
  const [isFlagged, setIsFlagged] = useState(Flagged);
  const flagQuestion = QuizStore(store=> store.flagQuestion)
  const filterQuestions = QuizStore(store=> store.filterQuestions)

  const getSelectedResponse = QuizStore(store=>store.getResponseByQuestionNumber)
  const updateResponse = QuizStore(store=>store.updateResponse)
  const [selectedOption, setSelectedOption] = useState([]);
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    console.log(question.number)
    const answer = getSelectedResponse(question.number)
    setResponse(answer)
    setSelectedOption(answer ? answer.selectedAnswer : [])
  }, [question.number])

  useEffect(() => {
    setResponse(answer => {
      const updatedAnswer = {
        number: question.number,
        type: question.type,
        selectedAnswer: answer ? answer.selectedAnswer : selectedOption
      };
      updateResponse(question.number, updatedAnswer);
      return answer;
    });
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    const index = selectedOption.indexOf(option);

    if (index !== -1) {
      const updatedOptions = [...selectedOption];
      updatedOptions.splice(index, 1);
      setSelectedOption(updatedOptions);
      const updatedResponse = {
        number: question.number,
        type: question.type,
        selectedAnswer: updatedOptions
      };
      setResponse(updatedResponse)
    } else {
      setSelectedOption([...selectedOption, option]);
      const updatedResponse = {
        number: question.number,
        type: question.type,
        selectedAnswer: [...selectedOption, option]
      };
      setResponse(updatedResponse)
    }

    onOptionSelect(option);
  };

  const handleToggleFlag = () => {
    setIsFlagged((prevFlag) => !prevFlag);
    flagQuestion()
    filterQuestions()
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
        <FlagButton flagged={isFlagged} onToggleFlag={handleToggleFlag}/>
      </div>
      <div className="border-t border-black border-2 mt-2 mb-4"></div>
      <div className="mb-4 flex flex-col items-center">
        {question.imageUrl == null ? '' : <button className='h-32 w-40'><QuizImage imageUrl={question?.imageUrl} /></button>}
        <div className='self-start'>
          <div className=''>
            <p className="text-lg">{question?.question}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-black border-2 mt-2"></div>

      <div className="w-full md:w-1/2">
        {question?.options &&
          question?.options.map((option, index) => (
            <div
              key={index}
              className={`mt-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              onClick={() => handleOptionClick(option, index)}
            >
              <div
                className={`min-h-10 rounded-md flex items-center gap-4  ${
                  selectedOption.includes(option) ? 'bg-DarkBlue text-white' : ''
                } border-[1px] border-black`}
              >
                <div className="ml-4">
                {selectedOption.includes(option) ?<GrRadialSelected /> : String.fromCharCode(65 + index)}   </div>

                <div className=''>{option}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MCQPanel;