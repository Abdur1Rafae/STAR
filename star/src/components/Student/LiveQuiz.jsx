import React from 'react'
import { FaHourglassEnd } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import QuizStore from '../../Stores/QuizStore';

const LiveQuiz = ({id, teacher, marks, title, className, closeTime, duration, description}) => {
    const date = new Date(closeTime);
    const quizStore = QuizStore()

    const updateQuizDetails = QuizStore(store => store.updateQuizDetails)
    const setTitle = QuizStore(store => store.setTitle)

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
            id: id,
            title: title,
            className: className,
            closeTime: closeTime,
            duration: duration,
            description: description,
            teacher: teacher
        }
        localStorage.setItem('quizDetails', JSON.stringify(quizDetails));
        window.location.assign('/quiz-instructions')
    }
  return (
    <button className='flex border-2 border-grey rounded-lg transition-all duration-200 text-left hover:scale-105' onClick={handleClick}>
        <img src='./liveQuiz.png' className='h-[120px] self-center'></img>
        <div className='infoContainer ml-2 mr-2 flex flex-col justify-between w-[200px] h-full'>
            <h1 className='font-[700] text-md mt-1'>{title}</h1>
            <h2 className='text-xs font-[500] mb-2'>{className}</h2>
            <div className='mt-1 text-xs flex text-slate-400'>
                <FaHourglassEnd className='self-center'/>
                <h3 className='ml-1'>Ends at {formattedDate}</h3>
            </div>
            <div className='mt-2 mb-1 text-xs flex justify-between'>
                <div className='leftContainer flex text-slate-400'>
                    <FaClock className='self-center'/>
                    <h3 className='ml-1'>{duration} minutes</h3>
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