import React from 'react';
import QuizImage from '../Student/question/QuizImage';
import HorizontalProgressBar from '../Student/course/HorizontalProgressBar';

import { SkillBox } from './StoredQuestion';
import { DifficultyBox } from './StoredQuestion';
import { PointBox } from './StoredQuestion';

const data = [{ name: 'Top Performers', value: 17 }, { name: 'Absentees', value: 6 }, { name: 'Requires Attention', value: 12 }];

const QuesAnswithHorBars = ({ question }) => {

  return (
    <div className="flex-grow w-full p-4">
      <div className='flex gap-2 m-2 w-full'>
        <SkillBox skill={question.skill} />
        <DifficultyBox difficulty={question.difficulty} />
        <PointBox point={question.point} />
      </div>
      <div className="my-4">
        <div className='flex items-center'>
          <span className='border border-black mr-4 px-4 py-2 rounded-lg text-md font-bold text-DarkBlue'> 01 </span>
          <p className="text-md">{question?.question}</p>
        </div>
      </div>
      
      <div className=' md:flex justify-around gap-4'>
        <div className="options flex-grow ">
          {question?.options &&
            question?.options.map((option, index) => (
              <div
                key={index}
                className={`max-md:text-xs flex items-center p-2 mb-2 bg-transparent transition duration-300`}
              >
                <div
                  className={`w-full   h-10 rounded-md mr-2 flex items-center border border-black ${
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
        {question.imageUrl && (
          <div className='w-64 h-64 mx-auto my-auto'>
            <QuizImage imageUrl={question.imageUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuesAnswithHorBars;
