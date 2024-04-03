import React, { useState } from 'react';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import HorizontalNavigationTab from '../../components/navigations/HorizontalNavigationTab.jsx';

const QuestionSummary = () => {
  const questions = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5'];
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className='flex flex-col'>
      <MenuBar name={"Maaz Shamim"} role={"Student"} />
      <div className='w-1/5 flex h-screen  '>
        <HorizontalNavigationTab
            questions={questions}
            selectedQuestion={selectedQuestion}
            handleQuestionClick={handleQuestionClick}
        />
      </div>
    </div>
  );
};

export default QuestionSummary;
