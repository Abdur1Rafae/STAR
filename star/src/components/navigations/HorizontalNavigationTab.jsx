import React from 'react';
import SubmitButton from '../button/SubmitButton.jsx';

const VerticalCenterNavigationTab = ({ questions, selectedQuestion, handleQuestionClick }) => {
  return (
    <div className='w-auto h-screen bg-LightBlue shadow-lg justify-center md:flex-row md:justify-start md:gap-4 gap-y-4 pb-2 border-b-2 border-grey-800'>
      {questions.map((question, index) => (
        <div key={index} className='bg-transparent m-auto my-4'>
          <SubmitButton
            label={question}
            active={selectedQuestion === question}
            onClick={() => handleQuestionClick(question)}
          />
        </div>
      ))}
    </div>
  );
};

export default VerticalCenterNavigationTab;
