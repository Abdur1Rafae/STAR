import React, { useContext } from 'react';
import QuestionTabTile from './QuestionTabTile';
import { ReportContent } from '../../Context/ReportContext';

const QuestionNavigation = ({ questions, activeQuestion, onQuestionClick }) => {
  const {allQuestionPercent} = useContext(ReportContent)
  const findPercent = (id) =>{
    const foundQuestion = allQuestionPercent.find(item => item.question === id);
    return Math.round(foundQuestion.totalCorrect / foundQuestion.totalResponses) * 100;
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
            percent={findPercent(question._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;
