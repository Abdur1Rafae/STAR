// QuizInstructions.js
import React, { useEffect } from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import QuizStore from '../../Stores/QuizStore';
import { GetAssessmentQuestions } from '../../APIS/Student/AssessmentAPI';
import Webcam from 'react-webcam';


const CaptureScreen = () => {
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
      //pushing any face related data.
      //quiz begins after this.
      window.location.assign('/quiz')
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col mb-8 font-body'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
            <div className='flex gap-8'> 
            <Webcam className='w-80 h-64'/>
            <div className=''>
                <h2 className='font-bold'>This Assessment requires your webcam to be turned on</h2>
                <p>
                    <li>Sit in a well-lit area.</li>
                    <li>Place your device approximately 2 feet away from you.</li>
                    <li>Position your device so your face is centered in the frame.</li>
                    <li>You will not be allowed to start your assessment until only single face is captured in your webcam.</li>
                </p>
            </div>

            </div>
        </div>
        <div className='mt-8'>
          <SubmitButton label="Begin Assessment" onClick={handleBeginAssessment} active={true}/>
        </div>
      </div>
    </div>
  );
};

export default CaptureScreen;
