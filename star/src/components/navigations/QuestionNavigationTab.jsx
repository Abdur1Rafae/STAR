import React, { useState, useContext } from 'react';
import LCSearchBar from '../../components/Teacher/LCSearchBar';
import { CiFilter } from "react-icons/ci";
import QuestionTabTile from './QuestionTabTile';

const QuestionNavigation = ({ questions, activeQuestion, onQuestionClick }) => {
    console.log(questions.length)
  return (
    <div className='h-full'>
      <div className='sticky top-0 bg-LightBlue'>
        <div className='flex items-center pl-2 pt-4 gap-4 bg-LightBlue'>
          <LCSearchBar  placeholder="Search" />
          <CiFilter size={28} />
        </div>
        <div className='border border-gray-300 my-4 mx-2'></div>
      </div>
      <div className=''>
        {questions.map((question, index) => (
          <QuestionTabTile
            key= {index}
            singlequestioninfo= {question } // {question}
            active={question === activeQuestion} // Set active to true if person matches the activePerson
            onClick={() => onQuestionClick(question)} // Pass the onClick handler to handle click event
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionNavigation;