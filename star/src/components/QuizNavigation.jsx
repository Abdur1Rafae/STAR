// QuizNavigation.js
import React, { useState } from 'react';
import { BsChevronDown, BsChevronRight } from 'react-icons/bs';
import { AiOutlineFlag, AiFillFlag } from 'react-icons/ai';


const QuizNavigation = ({ currentQuestion, totalQuestions, onNextClick }) => {
  const [expandedGroups, setExpandedGroups] = useState({});

  // Sample categories and questions
  const categories = [
    {
      name: 'Multiple Choice Questions',
      questions: [
        { number: 1, flagged: false },
        { number: 2, flagged: true },
        // Add more MCQ questions as needed
      ],
    },
    {
      name: 'True/False',
      questions: [
        { number: 3, flagged: false },
        { number: 4, flagged: false },
        // Add more True/False questions as needed
      ],
    },
    // Add more categories as needed
  ];

  const handleToggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <div className="w-64 quiz-navigation-box p-4 border rounded-md" style={{ backgroundColor: '#E7ECEF' }}>
      <h2 className="text-lg font-semibold mb-4">Quiz Navigation</h2>

      {categories.map((category, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-center cursor-pointer mb-2">
            <h3 className="text-md font-semibold">
              {category.name} ({category.questions.length})
            </h3>
            <span
              onClick={() => handleToggleGroup(category.name)}
              className="cursor-pointer"
            >
              {expandedGroups[category.name] ? <BsChevronDown /> : <BsChevronRight />}
            </span>
          </div>

          <ul className={`list-none p-0 ${expandedGroups[category.name] ? 'block' : 'hidden'}`}>
            {category.questions.map((question, qIndex) => (
              <li
                key={qIndex}
                className={`flex items-center mb-2 cursor-pointer`}
              >
                <span className="font-semibold text-black">
                  Question {question.number}
                </span>
                <span className='pl-2'>
                {question.flagged ? <AiFillFlag className={`ml-2 text-red-500`} /> : <AiOutlineFlag/>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizNavigation;
