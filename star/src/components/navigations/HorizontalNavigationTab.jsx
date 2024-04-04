import React from 'react';
import SubmitButton from '../button/SubmitButton.jsx';

const HorizontalNavigationTab = ({ questions, selectedQuestion, handleQuestionClick }) => {

  return (
    <div className='max-md:grid grid-cols-3  w-full md:h-screen bg-LightBlue shadow-lg rounded-md justify-center md:flex-row md:justify-start md:gap-4 md:gap-y-4 pb-2 border-b-2 border-grey-800'>
      {questions.map((question, index) => (
        <div key={index}   className = " w-max m-auto my-2 pt-4 bg-transparent text-sm px-8 max-md:px-2">
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
