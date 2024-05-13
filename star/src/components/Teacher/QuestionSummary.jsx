import React, { useState , useContext, useEffect } from 'react';
import QuesAnswithHorBars from '../../components/Teacher/QuesAnswithHorBars.jsx';
import AvgScoreHighScoreCard from '../../components/Teacher/avgscorehighscorecard.jsx';
import { QuestionDonutGraph }  from '../../components/Teacher/QuestionSummaryDonut.jsx';
import QuestionNavigation from '../../components/navigations/QuestionNavigationTab.jsx';
import { ReportContent } from '../../Context/ReportContext.js';
import { GetQuestionStats } from '../../APIS/Teacher/ReportAPI.js';
import { FcClock } from "react-icons/fc";
import Loader from '../Loader.jsx';
import QuestionTabTile from '../navigations/QuestionTabTile.jsx';

const QuestionSummary = () => {
  const [loading, setLoading] = useState(true)
  const { assessmentQuestion, questionIndex, setQuestionIndex , setQuestionData, questionStats, totalMarks, allQuestionPercent} = useContext(ReportContent);
  const data = [{name: 'Correct', value: questionStats.totalCorrect},{name: 'Incorrect', value: (questionStats.totalResponses - (questionStats.totalCorrect + questionStats.totalSkipped))},{name: 'Skipped', value: questionStats.totalSkipped}];
  const [activeQuestion, setactiveQuestion] = useState(assessmentQuestion[0]);
  const [showQuestions , setShowQuestions] = useState(false);

  const findPercent = (id) =>{
    const foundQuestion = allQuestionPercent.find(item => item.question === id);
    return foundQuestion != undefined ? Math.round(foundQuestion.totalCorrect / foundQuestion.totalResponses) * 100 : 0;
  }

  useEffect(()=>{
    const GetStats = async() => {
      try {
        const report = localStorage.getItem('ReportId')
        const res = await GetQuestionStats({id: report})
        console.log(res)
        if(res[0].questions.length > 0) {
          setTimeout(() => {
            setQuestionData(res)
            setLoading(false)
          }, 500);
        }
      } catch(err) {
        console.log(err)
      }
    }

    GetStats()
  }, [activeQuestion])

  const handleNavSelectQuestion = (question) => {
    setQuestionIndex(assessmentQuestion.indexOf(question));
    setShowQuestions(false)
  };

  return (
    <div className={`flex flex-col-reverse lg:flex-col  ${loading ? 'items-center justify-center h-screen': ''}`}>
      {
        loading ? 
        <Loader/>
        :
        <>
        <div className={`md:w-1/3 md:hidden ${showQuestions ? 'h-52' : 'h-0'} order-last transition-all duration-200 ease-in-out overflow-y-scroll bg-LightBlue rounded-lg shadow-md`} >
            <div className=''>
              <QuestionNavigation 
              questions={assessmentQuestion} 
              activeQuestion={assessmentQuestion[questionIndex]} 
              onQuestionClick={handleNavSelectQuestion}
              />
            </div>
          </div>
          <button onClick={() => {setShowQuestions(!showQuestions); console.log(showQuestions)}} className="order-last mt-4 w-full block md:hidden h-16 mb-2 border-DarkBlue border-2 rounded">
          <QuestionTabTile index = {questionIndex} singlequestioninfo={activeQuestion} percent={findPercent(activeQuestion._id)}/>
        </button>
        <div className='md:flex gap-4 items-center md:h-42 mt-4'>
          <div className={`md:w-1/3 lg:h-full ${showQuestions ? 'h-52' : 'h-0'} hidden md:block transition-all duration-200 ease-in-out overflow-y-scroll bg-LightBlue rounded-lg shadow-md`} >
            <div className=''>
              <QuestionNavigation 
              questions={assessmentQuestion} 
              activeQuestion={assessmentQuestion[questionIndex]} 
              onQuestionClick={handleNavSelectQuestion}
              />
            </div>
          </div>
          <div className='md:w-1/3 mt-2 md:mt-0'>
            <AvgScoreHighScoreCard avgScore={questionStats.avgScore} highestScore={questionStats.highestScore} totalScore={questionStats.totalScore}/>
            <div className='mt-4 p-2 h-24 bg-LightBlue shadow-md'>
              <div className='w-full h-full justify-around flex-grow flex p-2 items-center'>
                <FcClock size={64}/>
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='font-semibold font-body text-md lg:text-xl'>{questionStats.avgResponseTime}</h3>
                  <p className='text-xs lg:text-sm font-body'>Average Time Taken</p>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:w-1/2 mt-4 md:mt-0  relative bg-LightBlue shadow-md  '>
            <QuestionDonutGraph inputData={data} totalResponses={questionStats.totalResponses} />
          </div>
        </div>

        <div className='bg-LightBlue shadow-md rounded-md mt-2'> 
          <QuesAnswithHorBars index={questionIndex} question={assessmentQuestion[questionIndex]} />
        </div>
        </>
      }
       
    </div>
  );
};

export default QuestionSummary;
