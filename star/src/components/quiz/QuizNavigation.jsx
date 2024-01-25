import React, { useState } from 'react';



const QuizNavigation = ({ currentQuestion, totalQuestions, onNextClick }) => {
  const [ setExpandedGroups] = useState({});

  const categories = [
    {
      name: '',
      questions: [
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
        { number: 1},
        { number: 2},
      ],
    },
    {
      name: 'True/False',
      questions: [
        { number: 3},
        { number: 4},
      ],
    },
  ];

  const handleToggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  return (
    <div className='flex flex-col h-screen items-center w-full overflow-y-auto no-scrollbar'>
      <select name="cars" id="cars" className='mt-4 w-32 border-b-2 border-black h-8 bg-LightBlue font-semibold mb-4'>
          <option value="All">All Questions</option>
          <option value="Unanswered">Unanswered</option>
          <option value="Flagged">Flagged</option>
      </select>
      {categories.map((category, index) => (
        <div key={index} className="">
            {category.questions.map((question) => (
              <button className={`flex items-center justify-center w-32 h-8 bg-[#2C6491] text-white mb-4 p-2`}>
                <h3 className="self-center">
                  Question {question.number}
                </h3>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default QuizNavigation;
