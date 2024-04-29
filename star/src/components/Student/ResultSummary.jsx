import React, { useContext, useEffect, useState } from 'react';
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { ReportContent } from '../../Context/ReportContext';

const ResultSummary = ({ obtainedMarks, totalMarks, responses}) => {
  const {assessmentQuestion, questionIndex, setQuestionIndex} = useContext(ReportContent)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [currentResponse, setCurrentResponse] = useState({})
  const [questionMeta, setQuestionMeta] = useState([])

  const handleQuestionClick = ({questionNumber}) => {
    setQuestionIndex(questionNumber)
  }

  useEffect(()=>{
    const markStatus = []
    let correct= 0;
    let wrong = 0;
    responses.map((response) => {
      const questionIndex = assessmentQuestion.findIndex((question)=>question._id == response.questionId)
      if(response.score == assessmentQuestion[questionIndex].points){
        correct++
      }
      else {
        wrong++
      }
      const obj = {
        questionIndex: questionIndex,
        correct: response.score == assessmentQuestion[questionIndex].points
      }
      markStatus.push(obj)
    })
    setQuestionMeta(markStatus)
    setCorrectAnswers(correct)
    setWrongAnswers(wrong)
  }, [responses])

  return (
    <div className="p-4 bg-LightBlue h-full drop-shadow-md">
      <h2 className="text-lg font-bold font-body pb-4">Result Summary</h2>

      <div className="flex flex-col justify-center items-center">
        <div className='h-16 w-16 flex flex-col justify-center'>
          <h3 className='text-4xl text-DarkBlue font-body font-semibold self-center'>{obtainedMarks}</h3>
          <h3 className='text-xs text-gray-400 font-body font-medium self-center'>out of {totalMarks}</h3>
        </div>
        <div className='text-xs self-center'>
          <span className="flex text-green-500 items-center">
            <span className='pr-[1px]'><GoCheck /></span>  {correctAnswers} Correct Answers
          </span>
          <span className="flex text-red-500 items-center">
            <span className='pr-[1px]'><IoMdClose /></span>
            {wrongAnswers} Wrong Answers
          </span>
        </div>
      </div>

      <hr class="h-px my-4 border-[1px] border-black"></hr>
      
      <div className="">
        <h3 className="text-lg font-bold font-body">Questions</h3>
      </div>

      <div className="flex flex-wrap justify-evenly gap-2 mt-2">
        {assessmentQuestion.map((_,questionNumber) => (
          <button key={questionNumber} onClick={() => handleQuestionClick({ questionNumber })} className={`${questionMeta.find(obj => obj['questionIndex'] === questionNumber) ? 
          (questionMeta.find(obj => obj['questionIndex'] === questionNumber)['correct'] ? 'text-green-500' : 'text-red-500') 
          : 'text-gray-500'} ${questionIndex == questionNumber ? 'border-2 border-DarkBlue' : 'hover:border-2 hover:border-DarkBlue'} font-medium w-[30px] h-[30px] border rounded text-center sm:text-sm md:text-md bg-[#E7ECEF]`}>
            {questionNumber + 1}
          </button>
        ))}
      </div>   
    </div>
    

  );
};

export default ResultSummary;
