import React, { useEffect } from 'react'
import { VscLayersActive } from "react-icons/vsc";
import SubmitButton from '../../components/button/SubmitButton';

const QuizSubmission = () => {
  const score = sessionStorage.getItem('Score')
  useEffect(()=>{
    localStorage.removeItem('quizDetails')
    localStorage.removeItem('responseId')
    localStorage.removeItem('remainingTime');
    localStorage.removeItem('questions')
    localStorage.removeItem('studentResponses')
  }, [])
  return (
    <>
        <div className='flex flex-col items-center justify-center mt-8 h-80'> 
            <VscLayersActive className='text-7xl self-center text-green-600' />
            
            <p className='font-body text-lg mt-4'>Your Assessment has been submitted!</p>
            {score && <p className='font-body text-md mt-4 mb-4'>Achieved Score: <strong>{score}</strong></p>}
            <SubmitButton label={"Home"} onClick={()=>{window.location.assign('home')}} active={true}/>
        </div>
    </>
  )
}

export default QuizSubmission