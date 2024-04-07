import React from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from '../Student/question/QuizImage';
import HorizontalProgressBar from '../Student/course/HorizontalProgressBar';

const QuesAnswithHorBars = ({ question }) => {
  console.log(question);
  
  return (
    <div className="flex-grow w-full mx-auto p-4">
      <div className="mb-4">
        <div className='flex items-center'>
          <span className='border border-black mr-4 px-4 py-2 rounded-lg text-md font-bold text-DarkBlue'> 01 </span>
          <p className="text-md">{question?.question}</p>
        </div>
      </div>
      {question.imageUrl && (
        <div className='w-32 h-32 mt-4 mb-2'>
          <QuizImage imageUrl={question.imageUrl} />
        </div>
      )}

      <div className="options">
        {question?.options &&
          question?.options.map((option, index) => (
            <div
              key={index}
              className={`max-md:text-sm flex items-center p-2 mb-2 bg-transparent transition duration-300`}
            >
              <div
                className={`w-1/2 h-10 rounded-md mr-2 flex items-center border border-black ${
                  question.correctOptions.includes(option) ? 'bg-green-300 ' : ''
                }`}
              >
                <div className="relative start-5 inset-y-0 flex">
                  {String.fromCharCode(65 + index)}  
                </div>
                <div className='relative start-10 inset-y-0'>&nbsp;{option}</div>
              </div>
              <div className='w-1/3 ml-2'><HorizontalProgressBar Score='40' Color='#EC5491' /></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuesAnswithHorBars;
