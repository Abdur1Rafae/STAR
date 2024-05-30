import React, { useContext, useEffect, useState } from 'react';
import QuizImage from '../Student/question/QuizImage';
import SubmitButton from '../button/SubmitButton';
import { ReportContent } from '../../Context/ReportContext';
import { GrRadialSelected } from "react-icons/gr";
import Loader from '../Loader';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { baseUrl } from '../../APIS/BaseUrl';

const IndividualQuestionPanel = ({responses}) => {
    const {assessmentQuestion, questionIndex, setQuestionIndex} = useContext(ReportContent)
    const [currentResponse, setCurrentResponse] = useState({})
    const [moveForward, setMoveForward] = useState(true)
    const [moveBackward, setMoveBackward] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(assessmentQuestion[questionIndex]);

    useEffect(()=>{
        const responseIndex = responses.findIndex((response)=> response.questionId == assessmentQuestion[questionIndex]._id)
        setCurrentResponse(responses[responseIndex])
    }, [responses])

    useEffect(()=>{
        if(responses) {
            const responseIndex = responses.findIndex((response)=> response.questionId == assessmentQuestion[questionIndex]._id)
            setCurrentResponse(responses[responseIndex])
        }
        setCurrentQuestion(assessmentQuestion[questionIndex])
        if(questionIndex == 0) {
            setMoveBackward(false)
        }
        else {
            setMoveBackward(true)
        }
        if(questionIndex == assessmentQuestion.length -1) {
            setMoveForward(false)
        }
        else{
            setMoveForward(true)
        }
    }, [questionIndex])

    const handleNext = () => {
        if(questionIndex != assessmentQuestion.length - 1) {
            setQuestionIndex((prev)=>prev+1)
        }
    }

    const handlePrevious = () => {
        if(questionIndex != 0) {
            setQuestionIndex((prev)=>prev-1)
        }
    }
    const modules = {
        toolbar: false
    };
    console.log(currentResponse)

  return (
    <div className="bg-LightBlue flex-grow w-full h-full flex flex-col justify-between mx-auto p-4 shadow-md rounded-md">
        {
            Object.keys(currentResponse).length === 0 ?
            <Loader/>
            :
            <>
                {
        assessmentQuestion[questionIndex].image !== null && assessmentQuestion[questionIndex].image !== undefined? 
        <div className='w-32 h-32 mx-auto mt-4 mb-2'><QuizImage imageUrl={`${baseUrl}teacherhub/`+assessmentQuestion[questionIndex].image} /></div>
        : ''
      }
      <div className="mt-2 mb-2">
        <div className='flex gap-4'>
            <p>{questionIndex + 1}</p>
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
                            <div class="ml-2 ">
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

      {currentQuestion.explanation &&
      <div class="overflow-y-auto h-32 border-black border-[1px] p-2">
        <h2 className="text-l font-bold">Explanation</h2>

        <p className='text-sm font-light'>
            {currentQuestion.explanation}
          </p>
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