import React, { useState , useContext } from 'react';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import { QuestionContext } from '../../Context/QuestionsContext';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import TimeTaken from '../../components/Student/assessment/TimeTaken.jsx';
import AvgScoreHighScoreCard from '../../components/Teacher/avgscorehighscorecard.jsx';
import { QuestionDonutGraph }  from '../../components/Teacher/QuestionSummaryDonut.jsx';
import QuestionNavigation from '../../components/navigations/QuestionNavigationTab.jsx';
const QuestionSummary = () => {
  const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);
  const data = [{name: 'Correct', value: 17},{name: 'Incorrect', value: 6},{name: 'Skipped', value: 12}];
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [activeQuestion, setactiveQuestion] = useState(questions[0]);

  const handlePrevious = () => {
    setSelectedQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };
  const handleSelectQuestion = (event) => {
    setSelectedQuestionIndex(parseInt(event.target.value) - 1);
  };
  const handleNavSelectQuestion = (question) => {
    setSelectedQuestionIndex(questions.indexOf(question));
  };
  return (
    <div className='flex flex-col'>
      <div >
     
        <div className='md:flex gap-4 items-center md:h-42 '>
        <div className='md:w-1/3 mt-4   overflow-y-scroll bg-LightBlue rounded-lg shadow-md max-md:mb-4' >
        <div className=' '>
        <QuestionNavigation 
        questions={questions} 
        activeQuestion={questions[selectedQuestionIndex]} 
        onQuestionClick={handleNavSelectQuestion}
        />
      </div>
        </div>
        <div className='md:w-1/3 '>
          <AvgScoreHighScoreCard />
          <div className='mt-4 p-2 bg-LightBlue shadow-md'>
          <TimeTaken />
          </div>
        </div>
        <div className=' md:w-1/2  relative bg-LightBlue shadow-md  '>
          <QuestionDonutGraph inputData={data} />
        </div>
      </div>

        <div className='bg-LightBlue shadow-lg rounded-md mt-2'> 
          <QuesAnswithHorBars question={questions[selectedQuestionIndex]} />
        </div>
        
      </div>  
    </div>
  );
};

export default QuestionSummary;
