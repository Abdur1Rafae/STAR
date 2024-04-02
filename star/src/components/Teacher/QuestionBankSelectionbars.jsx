import React, { useState } from 'react';
import { FaCheckSquare, FaSquare, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import icons
import DisplayOnlyQuestions from './DisplayOnlyQuestions';

const QuestionBankSelectionbars = ({ bank, bankName, isSelected, onClick }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    onClick(bankName, !isSelected); // Pass the bankName and updated isSelected state to the parent component
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`bg-blue-100  w-full py-2 px-2 bg-[#F4F9FD] shadow-lg rounded-md transition-height ease-out duration-500 ${expanded ? 'h-auto' : 'h-10' }`}>
      <div className="flex items-center justify-between">
        <div onClick={handleSelectAll} className="flex items-center cursor-pointer gap-2 ">
          {selectAll ? <FaCheckSquare color='#2C6491' className='border border-2 border-[#2C6491] rounded' /> : <FaSquare color='white' className='border border-2 border-[#2C6491] rounded'/> } {/* Display the appropriate icon based on selectAll state */}
          <div>{bankName}</div> {/* Display the bank name */}
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleExpand}>
          {expanded ? <FaChevronUp className="mr-1 " /> : <FaChevronDown className="mr-1" />}
        </div>
      </div>
      {expanded && (
        <div className="w-full gap-y-2 my-2">
          {bank.map((question, index) => (
            <div key={index} className='py-2'>
              <DisplayOnlyQuestions
                key={index}
                skill={question.skill}
                difficulty={question.difficulty}
                point={question.point}
                question={question.question}
                explanation={question.explanation}
                options={question.options}
                image={question.imageUrl}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionBankSelectionbars;
