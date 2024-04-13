import React, { useState , useContext } from 'react';
import MenuBar from '../../components/MenuBar';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import { QuestionContext } from '../../Context/QuestionsContext';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const QuestionSummary = () => {
  const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);
  const data = [{name: 'Top Performers', value: 17},{name: 'Absentees', value: 6},{name: 'Requires Attention', value: 12}];
 
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  
  const handlePrevious = () => {
    setSelectedQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };
  const handleSelectQuestion = (event) => {
    setSelectedQuestionIndex(parseInt(event.target.value) - 1);
  };

  return (
    <div className='flex flex-col'>
      <MenuBar name={"Maaz Shamim"} role={"Student"} />
     
        <div >
          <div className='flex mx-2 p-4 w-full bg-LightBlue shadow-lg rounded-md items-center'>
            <span className=' font-semibold '>Question: </span>
            <select className="block w-fit md:mx-8 mx-1 px-4 md:px-16 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black"  value={selectedQuestionIndex + 1}
            onChange={handleSelectQuestion}>
              {[...Array(questions.length).keys()].map((index) => (
                <option key={index} value={index + 1}>{index + 1}</option>
              ))}
            </select>
            <span className='text-DarkBlue font-bold'>  of {questions.length}</span>
            <div className='flex items-center ml-auto gap-2'>
            <button className='bg-[#829FB6] rounded-tl-full rounded-bl-full px-4 py-2' onClick={handlePrevious}>
            <IoIosArrowBack />
            </button>
            <button className='bg-[#829FB6] rounded-br-full rounded-tr-full px-4 py-2' onClick={handleNext}>
            <IoIosArrowForward />
            </button>
            </div>
            
          </div>
          <div className='bg-LightBlue shadow-lg rounded-md m-2'> 
            <QuesAnswithHorBars question={questions[selectedQuestionIndex]} />
          </div>
         
        </div>  
      </div>
  );
};

export default QuestionSummary;
