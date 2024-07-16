import React, { useContext, useEffect, useState } from 'react';
import QuizImage from '../Student/question/QuizImage';
import SubmitButton from '../button/SubmitButton';
import { ReportContent } from '../../Context/ReportContext';
import { GrRadialSelected } from "react-icons/gr";
import Loader from '../Loader';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const IndividualQuestionPanel = ({responses}) => {
    const {assessmentQuestion, questionIndex, setQuestionIndex} = useContext(ReportContent)
    const [currentResponse, setCurrentResponse] = useState(responses[0])
    const [moveForward, setMoveForward] = useState(true)
    const [moveBackward, setMoveBackward] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(assessmentQuestion[questionIndex]);
    const [responseIndex, setResponseIndex] = useState(0)

    useEffect(()=>{
        setCurrentResponse(responses[0])
    }, [responses])

    useEffect(()=> {
        console.log(responses)
        console.log(currentResponse)
    }, [currentResponse])

    useEffect(()=>{
        setCurrentQuestion(assessmentQuestion[questionIndex])
        const rIndex = responses.findIndex((res)=>res.questionId == assessmentQuestion[questionIndex]._id)
        setResponseIndex(rIndex)
        if(rIndex == 0) {
            setMoveBackward(false)
        }
        else {
            setMoveBackward(true)
        }
        if(rIndex == responses.length -1) {
            setMoveForward(false)
        }
        else{
            setMoveForward(true)
        }
    }, [questionIndex])

    useEffect(()=>{
        setCurrentResponse(responses[responseIndex])
    }, [responseIndex])

    const handleNext = () => {
        if(responseIndex != responses.length - 1) {
            setQuestionIndex(assessmentQuestion.findIndex((ques)=>ques._id == responses[responseIndex+1].questionId))
        }
    }

    const handlePrevious = () => {
        if(responseIndex != 0) {
            setQuestionIndex(assessmentQuestion.findIndex((ques)=>ques._id == responses[responseIndex-1].questionId))
        }
    }
    const modules = {
        toolbar: false
    };

    console.log(currentResponse)

  return (
    <div className="bg-LightBlue flex-grow w-full h-full flex flex-col justify-between mx-auto p-4 shadow-md rounded-md">
        {
            currentResponse == null || currentResponse == undefined ?
            <Loader/>
            :
            <>
                {
                    assessmentQuestion[questionIndex].image !== null && assessmentQuestion[questionIndex].image !== undefined? 
                    <div className='w-32 h-32 mx-auto mt-4 mb-2'><QuizImage imageUrl={assessmentQuestion[questionIndex].image} /></div>
                    : ''
                }
                <div className="mt-2 mb-2">
                    <div className='flex gap-4'>
                        <p>{responseIndex + 1}</p>
                        <ReactQuill readOnly={true} modules={modules} value={assessmentQuestion[questionIndex].question} className='w-full text-sm'/>
                    </div>
                </div>

                <div className="options">
                    {
                        currentQuestion.type == 'MCQ' ? 
                        <>
                            {currentQuestion.options?.map((option, index) => (
                                <div key={index} className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}>
                                    <div
                                        className={`w-full min-h-10 rounded-md mr-2 flex items-center border-2 ${
                                        currentQuestion.correctOptions?.includes(option) ? 'bg-green-300' : '' 
                                        }`}
                                    
                                    >
                                        <div className="ml-2 ">
                                        {currentResponse.answer?.includes(option) ? <GrRadialSelected/> : String.fromCharCode(65 + index)}  
                                        </div>

                                        <div className='ml-4'>&nbsp;{option}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                        :
                        currentQuestion.type == 'True/False'?
                        <>
                            <div className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100`}>
                                <div
                                    className={`w-full h-10 rounded-md mr-2 flex items-center border-2 ${
                                    currentQuestion.isTrue ? 'bg-green-300' : '' 
                                    }`}
                                
                                >
                                    {currentResponse?.answer.includes('True') ? <GrRadialSelected className='ml-2'/> : ''} 
                                    <p className='ml-4'>&nbsp;True</p>
                                </div>
                                <div
                                    className={`w-full h-10 rounded-md mr-2 flex items-center border-2 ${
                                    !currentQuestion.isTrue ? 'bg-green-300' : '' 
                                    }`}
                                
                                >
                                    {currentResponse.answer?.includes('False') ? <GrRadialSelected className='ml-2'/> : ''} 
                                    <p className='ml-4'>&nbsp;False</p>
                                </div>
                            </div>
                        </>
                        :
                        <div className='mt-2 border-1 border-gray-300 p-2 mb-4'>
                            <h4 className='text-sm font-medium'>Response:</h4>
                            <p className='text-xs'>{currentResponse.answer[0]}</p>
                        </div>
                    }
                </div>

                {
                    currentQuestion.explanation &&
                    <div className="overflow-y-auto h-32 border-black border-[1px] p-2">
                        <h2 className="text-l font-bold">Explanation</h2>

                        <p className='text-sm font-light mt-2'>{currentQuestion.explanation}</p>
                    </div>
                }
                <div className="flex items-center justify-end mt-2 gap-4">
                    <SubmitButton active={moveBackward} label="Previous" onClick={handlePrevious}/>
                    <SubmitButton active={moveForward} label="Next" onClick={handleNext}/>
                </div>
            </>
        }
    </div>
  );
};

export default IndividualQuestionPanel;