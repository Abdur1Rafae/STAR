// QuizInstructions.js
import React from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import SubmitButton from '../../components/button/SubmitButton';


const QuizInstructions = () => {
  const course = "Introduction to Computer Science";
  const instructor = "Sir Jawwad Farid";
  const instructions = ["The quiz consists of 5 questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. ", "Select an answer for every question. Unanswered questions will be scored as incorrect." , "If you use a wheel button mouse, take care not to accidentally change your answers. Sometimes scrolling the wheel will rotate through the answers in a selection list, when you might have meant simply to scroll farther down in the quiz window."];
  const date = "22-December-2021"
  const time = "23:00"
  const duration = 120;
  const marks = 50;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full bg-white p-8 rounded shadow-md w-96 shadow-outline">
        <div className='flex justify-between '>
            <h1 className="sm:text-xl md:text-2xl font-bold mb-4">Monthly Test</h1>
            <div className=''>
            <span className='pb-4 flex items-center text-md'><FaRegHourglassHalf /> &nbsp;{date} {time}</span>
            <div className='flex '>
            <div className='items-center text-sm flex w-fit min-[320px]:h-fit sm:h-8 border border-black align-middle pr-2 pl-2  mr-4'><CiClock2 size={20}/>&nbsp; {duration} Mins</div>
            <div className='items-center text-sm flex w-fit min-[320px]:h-fit sm:h-8 border border-black align-middle pr-2 pl-2'><CiViewList size={20}/>&nbsp; {marks} Marks</div>
            </div>
            </div>
        </div>
        <div className='flex'>
        <h3 className='text-#5F6368 font-semibold'>Course:&nbsp;</h3> <p>{course}</p>
        </div>
        <div className='flex'>
        <h3 className='text-#5F6368 font-semibold'>Instructor:&nbsp;</h3> <p>{instructor}</p>
        </div>
        <hr className="h-px my-8 border-[1px] border-background: #5F6368;"></hr>
        <div>
          <h2 className="font-bold mb-4">Instructions:</h2>
          <ul className="list-disc pl-6">
            {instructions.map((instruction, index) => (
              <li key={index} className="mb-2">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-8'>
        <SubmitButton label="Begin Assessment" />
      </div>
    </div>
  );
};

export default QuizInstructions;
