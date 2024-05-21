import React from 'react'
import { FaHourglassEnd } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import LiveQuizImage from './LiveQuiz.png';

const LiveQuiz = ({assessment}) => {
    const date = new Date(assessment.configurations.closeDate);


    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC',
        hour12: false,
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);


    const handleClick = () => {
        const quizDetails = {
            sectionId: assessment.sectionId,
            id: assessment.assessmentId,
            title: assessment.title,
            className: assessment.className,
            closeDate: assessment.configurations.closeDate,
            duration:  assessment.configurations.duration,
            description: assessment.description,
            teacher: assessment.teacher,
            questionsCount: assessment.totalQuestions,
            marks: assessment.totalMarks,
            quizConfig: {
                adaptiveTesting: assessment.configurations.adaptiveTesting,
                instantFeedback: assessment.configurations.instantFeedback,
                randomizeQuestions: assessment.configurations.randomizeQuestions,
                randomizeAnswers: assessment.configurations.randomizeAnswers,
                navigation: assessment.configurations.navigation,
                monitoring: assessment.configurations.monitoring,
                finalScore: assessment.configurations.finalScore 
            } 
        }
        localStorage.setItem('quizDetails', JSON.stringify(quizDetails));
        window.location.assign('quiz-instructions')
    }
  return (
    <button className='font-body flex border-2 border-grey rounded-lg transition-all duration-200 text-left hover:scale-105' onClick={handleClick}>
        <img src={LiveQuizImage} className='h-[120px] self-center'></img>
        <div className='infoContainer ml-2 mr-2 flex flex-col justify-between w-[200px] h-full'>
            <h1 className='font-[700] text-md mt-1'>{assessment.title}</h1>
            <h2 className='text-xs font-[500] mb-2'>{assessment.className}</h2>
            <div className='mt-1 text-xs flex text-slate-400'>
                <FaHourglassEnd className='self-center'/>
                <h3 className='ml-1'>Ends at {formattedDate}</h3>
            </div>
            <div className='mt-2 mb-1 text-xs flex justify-between'>
                <div className='leftContainer flex text-slate-400'>
                    <FaClock className='self-center'/>
                    <h3 className='ml-1'>{assessment.configurations.duration} minutes</h3>
                </div>
                <div className='rightContainer flex'>
                    <h3 className='font-[500] mr-1'>Open</h3>
                    <FaCircleArrowRight className='self-center text-lime-500 text-sm'/>
                </div>
            </div>
        </div>
    </button>
  )
}

export default LiveQuiz