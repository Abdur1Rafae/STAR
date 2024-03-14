// QuizInstructions.js
import React from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import SubmitButton from '../../components/button/SubmitButton';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';


const QuizInstructions = () => {
  const course = "Introduction to Computer Science";
  const instructor = "Sir Jawwad Farid";
  const instructions = ["The quiz consists of 5 questions carefully designed to help you self-assess your comprehension of the information presented on the topics covered in the module. ", "Select an answer for every question. Unanswered questions will be scored as incorrect." , "If you use a wheel button mouse, take care not to accidentally change your answers. Sometimes scrolling the wheel will rotate through the answers in a selection list, when you might have meant simply to scroll farther down in the quiz window."];
  const date = "22-December-2021"
  const time = "23:00"
  const duration = 120;
  const marks = 50;

  return (
    <div className='flex flex-col mb-8'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
          <h1 className="text-xl md:text-2xl font-bold">Monthly Test</h1>
          <div className='flex flex-col-reverse md:flex-row justify-between'>
              <div className='md:mt-0 mt-2'> 
                <div className='flex'>
                  <p className='text-#5F6368'><strong>Course:</strong>&nbsp;{course}</p> 
                </div>
                <div className='flex'>
                  <p className='text-#5F6368'><strong>Instructor:</strong>&nbsp;{instructor}</p> 
                </div>
              </div>
              <div className=''>
                <div className='flex items-center text-sm md:text-md justify-start md:justify-end'><FaRegHourglassHalf/><p>&nbsp;{date} {time}</p></div>
                <div className='flex md:justify-between justify-center mt-2'>
                  <div className='items-center text-sm flex w-fit h-8 border border-black align-middle pr-2 pl-2  mr-4'><CiClock2 size={20}/>&nbsp; {duration} Mins</div>
                  <div className='items-center text-sm flex w-fit h-8 border border-black align-middle pr-2 pl-2'><CiViewList size={20}/>&nbsp; {marks} Marks</div>
                </div>
              </div>
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
          <SubmitButton label="Begin Assessment" onClick={()=> {window.location.assign('/quiz')}}/>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
