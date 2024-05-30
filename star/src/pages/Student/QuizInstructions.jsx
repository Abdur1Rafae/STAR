import React, {useState } from 'react';
import { FaRegHourglassHalf } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import SubmitButton from '../../components/button/SubmitButton';
import SubHeader from '../../components/Student/SubHeader';
import { GetAssessmentQuestions } from '../../APIS/Student/AssessmentAPI';
import { SubmitAssessment } from '../../APIS/Student/AssessmentAPI';
import { VscLayersActive } from 'react-icons/vsc';
import CryptoJS from 'crypto-js';
import LoadingButton from '../../components/button/LoadingButton';


const encryptData = (data, key) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};


const QuizInstructions = () => {
  const [quizDetails, setQuizDetails] = useState(JSON.parse(localStorage.getItem('quizDetails'))) 
  const [QuizSubmitted, setQuizSubmitted] = useState(false)
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    hour12: false,
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(quizDetails.closeDate));

  const handleBeginAssessment = async() => {
    try {
      if(!quizDetails.quizConfig.monitoring) {
        const res = await GetAssessmentQuestions({id: quizDetails.id, sectionId: quizDetails.sectionId})
        console.log(res)
        localStorage.setItem('responseId', res.responseId)
        if(res.questions && res.questions.length > 0) {
          const questionSet = [...res.questions]
          if(quizDetails.quizConfig.randomizeQuestions) {
            for (let i = questionSet.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [questionSet[i], questionSet[j]] = [questionSet[j], questionSet[i]];
            }
          }

          if(quizDetails.quizConfig.randomizeAnswers) {
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

          if(quizDetails.quizConfig.adaptiveTesting.active) {
            window.location.assign('adaptive-quiz')
          }
          else {
            window.location.assign('quiz')
          }
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
      else {
        window.location.assign('capture-face')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600 font-body">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
          <h1 className="text-xl md:text-2xl font-medium">{quizDetails.title}</h1>
          <div className='flex flex-col-reverse md:flex-row justify-between'>
              <div className='md:mt-0 mt-2'> 
                <div className='flex'>
                  <p className='text-#5F6368'><strong>Course:</strong>&nbsp;{quizDetails.className}</p> 
                </div>
                <div className='flex'>
                  <p className='text-#5F6368'><strong>Instructor:</strong>&nbsp;{quizDetails.teacher}</p> 
                </div>
              </div>
              <div className=''>
                <div className='flex items-center text-sm md:text-md justify-start md:justify-end'><FaRegHourglassHalf/><p>&nbsp;{formattedDate}</p></div>
                <div className='flex md:justify-between justify-center mt-2'>
                  <div className='items-center text-sm flex w-fit h-8 border border-black align-middle pr-2 pl-2  mr-4'><CiClock2 size={20}/>&nbsp; {quizDetails.duration} Mins</div>
                  <div className='items-center text-sm flex w-fit h-8 border border-black align-middle pr-2 pl-2'><CiViewList size={20}/>&nbsp; {quizDetails.marks} Marks</div>
                </div>
              </div>
          </div>
          {
            quizDetails.description.length > 0 &&
            <>
              <h5 className='font-semibold'>Assessment Description</h5>
              <p>{quizDetails.description}</p>
            </>
          }

          <hr className="h-px my-8 border-[1px] border-background: #5F6368;"></hr>

          <div>
            <h2 className="font-bold mb-4">Instructions:</h2>
            <ul className="list-disc pl-6">
              <li className="mb-2 text-lg">
                The assessment will be <strong>submitted if student tries to refresh or close the page</strong>
              </li>
              
                {
                  quizDetails.quizConfig.adaptiveTesting &&
                  <li>
                  <p>This will be an <strong>adaptive assessment</strong>. Each correct answer would lead you to a tougher question to earn more rewards. Your final score will be scaled out of the above mentioned Marks.</p>
                  </li>
                }
                {
                  !quizDetails.quizConfig.navigation &&
                  <li>
                  <p>Navigation between questions is <strong>disabled</strong>. Please proceed to the next question once you are satisfied with your answer.</p>
                  </li>
                }
            </ul>
          </div>
        </div>
        <div className='mt-8'>
          <LoadingButton label="Begin Assessment" onClick={handleBeginAssessment} active={true}/>
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
