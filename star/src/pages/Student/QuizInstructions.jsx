// QuizInstructions.js
import React, { useEffect } from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import SubmitButton from '../../components/button/SubmitButton';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import QuizStore from '../../Stores/QuizStore';
import { GetAssessmentQuestions } from '../../APIS/Student/AssessmentAPI';


const QuizInstructions = () => {
  const quizStore = QuizStore()
  const title = QuizStore(store=>store.title);
  const course = QuizStore(store=>store.className);
  const instructor = QuizStore(store=>store.teacher);;
  const instructions = [QuizStore(store=>store.description)];
  const dateTime = QuizStore(store=>store.closeDate);
  const duration = QuizStore(store=>store.duration);
  const marks = QuizStore(store=>store.marks);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateTime));

  useEffect(()=> {
    const storedQuizDetails = JSON.parse(localStorage.getItem('quizDetails'));
    quizStore.updateQuizDetails(storedQuizDetails)
  }, [])

  const handleBeginAssessment = async() => {
    try {
      const res = await GetAssessmentQuestions(quizStore.id)
      localStorage.setItem('questions', JSON.stringify(res));
      window.location.assign('/quiz')
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col mb-8'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
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
                <div className='flex items-center text-sm md:text-md justify-start md:justify-end'><FaRegHourglassHalf/><p>&nbsp;{formattedDate}</p></div>
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
          <SubmitButton label="Begin Assessment" onClick={handleBeginAssessment} active={true}/>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;
