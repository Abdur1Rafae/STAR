import React, { useEffect } from 'react'
import { VscLayersActive } from "react-icons/vsc";
import SubmitButton from '../../components/button/SubmitButton';

const QuizSubmission = () => {
  useEffect(()=>{
    localStorage.removeItem('quizDetails')
    localStorage.removeItem('responseId')
    localStorage.removeItem('remainingTime');
    localStorage.removeItem('SuccessSubmit');
    localStorage.removeItem('questions')
    localStorage.removeItem('studentResponses')
  }, [])
  return (
    <>
        <div className='flex flex-col items-center justify-center mt-8'>
            <VscLayersActive className='text-7xl self-center text-green-600' />
            <p className='font-body text-lg mt-4'>Your Assessment has been submitted!</p>
            <SubmitButton label={"Home"} onClick={()=>{window.location.assign('home')}} active={true}/>
        </div>
    </>
  )
}

export default QuizSubmission