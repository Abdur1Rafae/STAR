import React, { useState , useContext } from 'react';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import { QuestionContext } from '../../Context/QuestionsContext';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import TimeTaken from '../../components/Student/assessment/TimeTaken.jsx';
import AvgScoreHighScoreCard from '../../components/Teacher/avgscorehighscorecard.jsx';
import { QuestionDonutGraph }  from '../../components/Teacher/QuestionSummaryDonut.jsx';
import QuestionNavigation from '../../components/navigations/QuestionNavigationTab.jsx';
import { MdClose } from 'react-icons/md';
import QuestionTabTile from '../../components/navigations/QuestionTabTile.jsx';

const QuestionSummary = () => {
  const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);
  const data = [{name: 'Correct', value: 17},{name: 'Incorrect', value: 6},{name: 'Skipped', value: 12}];
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [activeQuestion, setactiveQuestion] = useState(questions[0]);
  const [showQuestions , setShowQuestions] = useState(false);

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
    setShowQuestions(false);
  };
  return (
    <div className='flex flex-col'>
      <div >
      <button onClick={() => {setShowQuestions(!showQuestions); console.log(showQuestions)}} className="w-full block md:hidden h-16 mb-2 border-DarkBlue border-2 rounded">
              <QuestionTabTile index = {selectedQuestionIndex} singlequestioninfo={activeQuestion}/>
            </button>
        <div className='md:flex gap-4 items-center md:h-42 '>
        <div className='md:w-1/3 mt-4   overflow-y-scroll bg-LightBlue rounded-lg shadow-md max-md:mb-4' >
        <div className=' max-md:hidden'>
        <QuestionNavigation 
        questions={questions} 
        activeQuestion={questions[selectedQuestionIndex]} 
        onQuestionClick={handleNavSelectQuestion}
        />
      </div>
      {
                showQuestions &&
                <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                    <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                        <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                            <h3 className='my-auto ml-2'>Select Question</h3>
                            <button className='mr-2' onClick={()=>setShowQuestions(false)}><MdClose className='text-lg'/></button>
                        </div>
                        <div className='h-full overflow-y-auto no-scrollbar'>
                            <div className='h-full flex flex-col gap-4'>
                            <QuestionNavigation questions={questions} activeQuestion={questions[selectedQuestionIndex]} onQuestionClick={handleNavSelectQuestion}
        />                            </div>            
                        </div>
                    </div>
                </div>
                }
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
