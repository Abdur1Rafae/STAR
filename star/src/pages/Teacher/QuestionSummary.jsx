import React, { useState , useContext } from 'react';
import MenuBar from '../../components/MenuBar';
import SubheaderBut from '../../components/Teacher/SubheaderBut.jsx';
import { GoListOrdered } from "react-icons/go";
import HorizontalNavigationTab from '../../components/navigations/HorizontalNavigationTab.jsx';
import { StudentDonutGraph } from '../../components/Teacher/StudentDonut';
import AvgScoreHighScoreCard from '../../components/Teacher/avgscorehighscorecard.jsx';
import TimeTaken from '../../components/Student/assessment/TimeTaken.jsx';
import QuestionDetails from '../../components/Student/QuestionDetails.jsx';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import { QuestionContext } from '../../Context/QuestionsContext';
import SubmitButton from '../../components/button/SubmitButton.jsx';
import SideBar from '../../components/Teacher/SideBar.jsx';
import { BiChevronDown, BiChevronLeft } from 'react-icons/bi'
import { GrOverview } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdQueryStats } from "react-icons/md";

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
    <div className='flex flex-col md:flex-row justify-between gap-4 py-4'>
      <div className={`bg-LightBlue w-full md:w-32 shadow-md`}>
        <HorizontalNavigationTab
          questions={questions}
          selectedQuestion={selectedQuestionIndex}
          handleQuestionClick={handleQuestionClick}
        />
      </div>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex md:flex-row flex-col gap-4'>
          <div className='bg-LightBlue shadow-md rounded-md md:w-1/2 h-52'>
            <StudentDonutGraph inputData={data}/>
          </div>
          <div className='md:w-1/3 h-52 flex flex-col justify-between'>
            <div className='h-28 shadow-md'>
              <AvgScoreHighScoreCard/>
            </div>
            <div className='h-26'>
              <TimeTaken/>
            </div>
          </div>
          <div className='md:w-1/3 h-68 bg-LightBlue shadow-md'>
            <QuestionDetails topic="History of Computer" difficulty = "Easy" skillTargeted="Memorization"/>
          </div>          
        </div>
        <div className='bg-LightBlue shadow-md p-2'> 
          <QuesAnswithHorBars question={questions[selectedQuestionIndex]} />
          <div className='flex gap-4 justify-center mt-2'>
            <SubmitButton label="Previous" active={selectedQuestionIndex > 0} onClick={handlePrevious} />
            <SubmitButton label="Next" active={selectedQuestionIndex < questions.length - 1} onClick={handleNext} />
          </div>
        </div>
      </div>  
    </div>
  );
};

export default QuestionSummary;
