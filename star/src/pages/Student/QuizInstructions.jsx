import React, { useEffect, useState } from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import SubmitButton from '../../components/button/SubmitButton';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import QuizStore from '../../Stores/QuizStore';
import { GetAssessmentQuestions } from '../../APIS/Student/AssessmentAPI';
import { SubmitAssessment } from '../../APIS/Student/AssessmentAPI';
import { VscLayersActive } from 'react-icons/vsc';
import CryptoJS from 'crypto-js';


const encryptData = (data, key) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};


const QuizInstructions = () => {
  const quizStore = QuizStore()
  const title = QuizStore(store=>store.title);
  const course = QuizStore(store=>store.className);
  const instructor = QuizStore(store=>store.teacher);;
  const instructions = [QuizStore(store=>store.description)];
  const dateTime = QuizStore(store=>store.closeDate);
  const duration = QuizStore(store=>store.duration);
  const marks = QuizStore(store=>store.marks);
  const [QuizSubmitted, setQuizSubmitted] = useState(false)
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
      const res = await GetAssessmentQuestions({id: quizStore.id, sectionId: quizStore.sectionId})
      localStorage.setItem('responseId', res.responseId)
      const storedQuizDetails = JSON.parse(localStorage.getItem('quizDetails'));
      if(res.questions && res.questions.length > 0) {
        const questionSet = [...res.questions]
        console.log(questionSet)
        if(storedQuizDetails.quizConfig.randomizeQuestions) {
          for (let i = questionSet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionSet[i], questionSet[j]] = [questionSet[j], questionSet[i]];
          }
        }

        if(storedQuizDetails.quizConfig.randomizeAnswers) {
          const shuffledQuestionSet = questionSet.map((question) => {
            const options = [...question.options]; 
            for (let i = options.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [options[i], options[j]] = [options[j], options[i]];
            }
            return { ...question, options };
          });
          localStorage.setItem('questions', JSON.stringify(encryptData(shuffledQuestionSet, 'Arete1234')));
        }
        else {
          localStorage.setItem('questions', JSON.stringify(encryptData(questionSet, 'Arete1234')));
        }
        
        window.location.assign('quiz')
      }
      else {
        try {
          const sub = await SubmitAssessment({responses: []})
          setQuizSubmitted(true)
        } catch(err) {
          console.log(err)
        }
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
              <li className="mb-2 text-lg">
                The assessment will be <strong>submitted if student tries to refresh or leave the page</strong>
              </li>
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
        {
          QuizSubmitted &&
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='w-96 h-64 bg-LightBlue border-[1px] border-black rounded-md flex flex-col gap-2 items-center'>
              <div className='flex justify-between w-full bg-DarkBlue'>
                <h3 className='font-body text-white'>Assessment Submitted</h3>
              </div>

              <div className='flex flex-col items-center justify-center mt-2 w-full p-2'>
                <VscLayersActive className='text-5xl self-center text-green-600' />
                <p className='font-body text-lg mt-4 mb-4'>Your Assessment has been submitted. The assessment had 0 questions to answer.</p>
                <SubmitButton label={"Home"} onClick={()=>{window.location.assign('/home')}} active={true}/>
              </div>
            </div> 
          </div>
        }
      </div>
    </>
  );
};

export default QuizInstructions;
