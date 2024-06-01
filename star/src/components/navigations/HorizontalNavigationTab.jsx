import React from 'react';
import SubmitButton from '../button/SubmitButton.jsx';

const HorizontalNavigationTab = ({ questions, selectedQuestion, handleQuestionClick }) => {

  return (
    <div className='w-full h-full rounded-md flex flex-col justify-start items-center'>
      {questions.map((question, index) => (
        <div key={index}   className = "w-full pt-4 text-sm flex justify-center ">
          <SubmitButton
            label={"Question " + index}
            active={selectedQuestion === index}
            onClick={() => handleQuestionClick(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default HorizontalNavigationTab;
