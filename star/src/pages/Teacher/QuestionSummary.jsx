import React, { useState , useContext } from 'react';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import { GoListOrdered } from "react-icons/go";
import HorizontalNavigationTab from '../../components/navigations/HorizontalNavigationTab.jsx';
import { StudentDonutGraph } from '../../components/Teacher/StudentDonut';
import AvgScoreHighScoreCard from '../../components/Teacher/avgscorehighscorecard.jsx';
import TimeTaken from '../../components/Student/assessment/TimeTaken.jsx';
import QuestionDetails from '../../components/Student/QuestionDetails.jsx';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import { QuestionContext } from '../../Context/QuestionsContext';
import SubmitButton from '../../components/button/SubmitButton.jsx';
const QuestionSummary = () => {
  const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);
  const data = [{name: 'Top Performers', value: 17},{name: 'Absentees', value: 6},{name: 'Requires Attention', value: 12}];
 
  const [horizontalNavVisible, setHorizontalNavVisible] = useState(false); // State to control the visibility of HorizontalNavigationTab
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const toggleHorizontalNav = () => {
    setHorizontalNavVisible(!horizontalNavVisible);
  };
  
  const handlePrevious = () => {
    setSelectedQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setSelectedQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handleQuestionClick = (questionIndex) => {
    setSelectedQuestionIndex(questionIndex);
  };
  return (
    <div className='flex flex-col'>
      <MenuBar name={"Maaz Shamim"} role={"Student"} />
      <div className='md:grid grid-cols-5 gap-3 ml-4'>
      <div className="md:hidden flex justify-end m-2 bg-LightBlue rounded-md">
        <button onClick={toggleHorizontalNav}>
          <GoListOrdered size={36} color='#2C6491' />
        </button>
      </div>
        <div className={`${horizontalNavVisible ? 'md:block' : 'max-md:hidden'}`}>
          <HorizontalNavigationTab
            questions={questions}
            selectedQuestion={selectedQuestionIndex}
            handleQuestionClick={handleQuestionClick}
          />
        </div>
        <div className=' col-span-4'>
          <div className='w-full md:flex'>
            <div className='bg-LightBlue shadow-lg rounded-md md:w-1/2  h-64 m-2'>
              <StudentDonutGraph inputData={data}/>
            </div>
            <div className='md:w-1/3  m-2'>
              <div className='h-36 shadow-lg'>
                <AvgScoreHighScoreCard/>
              </div>
              <div className='h-24 mt-2'>
                <TimeTaken/>
              </div>
            </div>
            <div className='md:w-1/3  h-64 bg-LightBlue shadow-lg m-2'>
              <QuestionDetails topic="History of Computer" difficulty = "Easy" skillTargeted="Memorization"/>
            </div>          
          </div>
          <div className='bg-LightBlue shadow-lg m-2'> 
            <QuesAnswithHorBars question={questions[selectedQuestionIndex]} />
          </div>
          <div className='flex gap-4 justify-center m-4'>
            <SubmitButton label="Previous" active={selectedQuestionIndex > 0} onClick={handlePrevious} />
            <SubmitButton label="Next" active={selectedQuestionIndex < questions.length - 1} onClick={handleNext} />
          </div>
        </div>  
      </div>
    </div>
  );
};

export default QuestionSummary;
