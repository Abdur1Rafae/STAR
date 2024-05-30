import React, { useEffect, useState } from 'react';      
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import SubmitMCQPanel from '../../components/Student/question/SubmitMCQPanel';
import QuestionDetail from '../../components/Student/QuestionDetails';
import FeedbackCard from '../../components/Student/FeedbackCard';
import { GetSubmission } from '../../APIS/Student/AssessmentAPI';
import Loader from '../../components/Loader'

const QuizResultScreen = () => {
  const assessmentInfo = JSON.parse(localStorage.getItem('selectedAssessment'))
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [submission, setSubmission] = useState([])
  const [loading, setLoading] = useState(true)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveForward, setMoveForward] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const GetQuestions = async() => {
      try {
        const res = await GetSubmission({id: assessmentInfo.id})
        console.log(res)
        setTimeout(() => {
          setSubmission(res.submission)
          let count = 0;
          res.submission.forEach((response) => {
            if(response.isCorrect) {
              count++;
            }
          })
          setCorrectAnswers(count)
          setLoading(false)
        }, 500);
        setError(null)
      } catch(err) {
        if(err.response.status == 405) {
          setError('Not Allowed to view your submission. Contact your instructor for permission.')
          setLoading(false)
        }
        console.log(err)
      }
    }
    GetQuestions()
  }, [])
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const obtainedMarks = assessmentInfo.currentScore;
  const totalMarks = assessmentInfo.totalScore;

  const handleQuestionClick = ({questionNumber}) => {
    setCurrentQuestion(questionNumber)
  }  

  useEffect(()=>{
    if(currentQuestion == 0) {
      setMoveBackward(false)
    }
    else {
      setMoveBackward(true)
    }
    if(currentQuestion == submission.length -1) {
      setMoveForward(false)
    }
    else{
      setMoveForward(true)
    }
}, [currentQuestion])

  const handleNext = () => {
    if(currentQuestion != submission.length - 1) {
      setCurrentQuestion((prev)=>prev+1)
    }
  }

  const handlePrevious = () => {
    if(currentQuestion != 0) {
      setCurrentQuestion((prev)=>prev-1)
    }
  }



    return (
        loading ?
        <div className="flex h-80 items-center justify-center gap-4">
          <Loader/>
        </div>
        :
        error == null ? 
        <div className="flex md:flex-row flex-col gap-4">
        <div className="h-auto">
        <div className="p-4 bg-LightBlue h-full drop-shadow-md">
        <h2 className="text-lg font-bold font-body pb-4">Result Summary</h2>

      <div className="flex flex-col justify-center items-center">
        <div className='h-16 w-16 flex flex-col justify-center'>
          <h3 className='text-4xl text-DarkBlue font-body font-semibold self-center'>{obtainedMarks}</h3>
          <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalMarks}</h3>
        </div>
        <div className='text-xs self-center'>
          <span className="flex text-green-500 items-center">
            <span className='pr-[1px]'><GoCheck /></span>  {correctAnswers} Correct
          </span>
          <span className="flex text-red-500 items-center">
            <span className='pr-[1px]'><IoMdClose /></span>
            {submission.length - correctAnswers} Wrong
          </span>
        </div>
      </div>

      <hr class="h-px my-8 border-[1px] border-black"></hr>

      <div className="flex flex-wrap justify-evenly gap-2">
        {submission.map((question, index) => (
          <button key={index} onClick={() => handleQuestionClick({ questionNumber: index })} className={`${question.isCorrect ? 'text-green-500' : 'text-red-500'} ${currentQuestion == index ? 'border-2 border-DarkBlue' : 'hover:border-2 hover:border-DarkBlue'} font-medium w-[30px] h-[30px] border rounded text-center sm:text-sm md:text-md bg-[#E7ECEF]`}>
            {index+1}
          </button>
        ))}
      </div>   
    </div>
      </div>

      <div className="w-full min-h-80">
        <SubmitMCQPanel next={handleNext}  previous={handlePrevious} fwd={moveForward} bkd={moveBackward}  question={submission[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={submission.length}/>
      </div>

      <div className="md:w-1/3 bg-LightBlue drop-shadow-md">
        <QuestionDetail totalScore={submission[currentQuestion]?.questionId.points} score= {submission[currentQuestion]?.score} difficulty = {submission[currentQuestion]?.questionId.difficulty} skillTargeted={submission[currentQuestion]?.questionId.skill} topic={submission[currentQuestion]?.questionId.topic}/>
        <hr class="h-px mt-8 border-[1px] border-black mx-2"></hr>
        <FeedbackCard feedback={submission[currentQuestion]?.feedback}/>
      </div>

      
    </div>

    :
    <div>
      {error}
    </div>

    
  );
};

export default QuizResultScreen;
