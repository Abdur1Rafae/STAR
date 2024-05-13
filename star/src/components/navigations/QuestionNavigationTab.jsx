import React, { useContext, useEffect, useState } from 'react';
import QuestionTabTile from './QuestionTabTile';
import { ReportContent } from '../../Context/ReportContext';

const QuestionNavigation = ({ questions, activeQuestion, onQuestionClick }) => {
  const {allQuestionPercent} = useContext(ReportContent)
  const [QuestionSetup, setQuestionSetup] = useState([])

  useEffect(()=>{
    setQuestionSetup(allQuestionPercent)
  }, [allQuestionPercent])

  const findPercent = (id) =>{
    const foundQuestion = allQuestionPercent.find(item => item.question === id);
    if(foundQuestion.question == '6640ce2dd40bb4605e2b6003'){
      console.log(foundQuestion.totalCorrect, foundQuestion.totalResponses,Math.round(foundQuestion.totalCorrect / foundQuestion.totalResponses) * 100)
    }
    return Math.round((foundQuestion.totalCorrect / foundQuestion.totalResponses) * 100)
  }
  return (
    <div className='h-52'>
      <div className='sticky top-0 bg-LightBlue'>
      </div>
      <div className=''>
        {questions.map((question, index) => (
          <QuestionTabTile
            index= {index}
            singlequestioninfo= {question }
            active={question === activeQuestion} 
            onClick={() => onQuestionClick(question)}
            percent={QuestionSetup.length > 0 ? findPercent(question._id): 0}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
