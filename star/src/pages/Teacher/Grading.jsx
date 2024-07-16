import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import { GetAssessmentResponses, GradeResponse } from '../../APIS/Teacher/GradingAPI'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const Grading = () => {
    const modules = {
        toolbar: false
    };
    const [loading, setLoading] = useState(true)
    const assessmentTitle = useParams('assessmentName')
    const assessment = JSON.parse(sessionStorage.getItem('GradeAssessment'))
    const question = JSON.parse(sessionStorage.getItem('Response'))
    const [responses, setResponses] = useState([])
    const [responseIndex, setResponseIndex] = useState(0)
    const [selectedResponse, setSelectedResponse] = useState(responses[responseIndex])
    const [score, setScore] = useState(selectedResponse ? selectedResponse.score ? selectedResponse.score : 0 : 0);
    const [feedback, setFeedback] = useState(selectedResponse ? selectedResponse.feedback ? selectedResponse.feedback : '' : '')

    const handleScore = (event) => {
        let newValue = parseInt(event.target.value, 10);
        if(isNaN(newValue)) {
            setScore(0)
        }
        else {
            newValue = Math.max(Math.min(newValue, question.points), -1);
            setScore(newValue);
        }
    };

    const handleResponseSubmission = async() => {
        try {
            const SubmitGrade = await GradeResponse({submissionId: selectedResponse.submissionId, responseId: selectedResponse.responseId, score: score, feedback: feedback})
            if(responseIndex == question.totalResponses - 1) {
                window.location.assign('/teacher/grading-table')
            }
            else {
                setResponseIndex(responseIndex + 1)
                setSelectedResponse(responses[responseIndex + 1]);
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        const GetResponses = async()=>{
            try{
                const res = await GetAssessmentResponses({id:question._id, assessmentId: assessment._id})
                console.log(res)
                setTimeout(() => {
                    setResponses(res)
                    setLoading(false);
                }, 1000);
            } catch(err) {
                console.log(err)
            }
        }

        GetResponses()
    }, [])

    useEffect(()=> {
        setSelectedResponse(responses[0])
    }, [responses])

    useEffect(()=> {
        setScore(selectedResponse ? selectedResponse.score ? selectedResponse.score : 0 : 0)
        setFeedback(selectedResponse ? selectedResponse.feedback ? selectedResponse.feedback : '' : '')
    }, [selectedResponse])

    const handleChange = (event) => {
        const selectedIndex = parseInt(event.target.value, 10) - 1;
        setResponseIndex(selectedIndex);
        setSelectedResponse(responses[selectedIndex]);
    };

  return (
    <>
            <SideBar active={"Reports"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Grading"}/>
                <div className={`p-2 md:p-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                    {
                        loading ?
                        <Loader/>
                        :
                        <>
                            <div className='w-full bg-LightBlue flex p-2 items-center shadow-md'>
                                <div className='flex items-center self-start'>
                                    <button onClick={()=>{window.location.assign('/teacher/grading-table')}}><BiChevronLeft className='text-3xl'/></button>
                                    <h4 className='font-semibold'>{assessmentTitle.assessmentName} / Question {question.num}</h4>
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col w-full gap-4'>
                                <div className='w-full gap-4 flex flex-col'>
                                    <div className='w-full border-[1px] border-black'>
                                        <div className='bg-LightBlue h-10 flex items-center p-2'>
                                            <h3 className='font-semibold'>Question</h3>
                                        </div>
                                        <div className='p-1'>
                                            <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-md'/>
                                        </div>
                                    </div>
                                    <div className='border-[1px] border-black'>
                                        <div className='bg-LightBlue h-10 flex justify-between items-center p-2'>
                                            <h3 className='font-semibold'>Response</h3>
                                            <div className='flex gap-2 text-sm items-center'>
                                                <p>#</p>
                                                <select 
                                                    name="res" 
                                                    className='bg-LightBlue w-12' 
                                                    value={responseIndex + 1} 
                                                    onChange={(e) => {handleChange(e)}}
                                                >
                                                    {Array.from({ length: question.totalResponses }, (_, index) => (
                                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                    ))}
                                                </select>
                                                <p>/ {question.totalResponses}</p>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <p className='p-4 text-sm'>{selectedResponse ? selectedResponse.answer[0] : ''}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full md:w-96 border-[1px] border-black font-body'>
                                    <div className='bg-LightBlue h-10 flex items-center justify-center p-2'>
                                        <h3 className='font-semibold'>Marking</h3>
                                    </div>
                                    <div className='w-full p-2'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='font-medium text-sm'>Score</h3>
                                            <div className='flex gap-2'>
                                                <input type='number' onChange={handleScore} value={score} className='border-[1px] border-black w-16 h-6 pl-2'></input>
                                                <p className='text-sm'>out of {question.points}</p>
                                            </div>
                                        </div>
                                        <div className='mt-4'>
                                            <h3 className='font-medium text-sm'>Feedback</h3>
                                            <textarea type="text" value={feedback} onChange={(e)=>{setFeedback(e.target.value)}} className='resize-none p-1 w-full h-48 border-[1px] border-black text-xs'/> 
                                        </div>
                                        <div className='flex gap-4 mt-4 justify-center items-center md:mt-0 h-6 w-full'>
                                            <button onClick={handleResponseSubmission}
                                                className={`font-body font-medium flex items-center text-sm pl-2 gap-2 active:shadow-lg relative h-6 ${true ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black' } w-fit px-3 rounded focus:outline-none focus:shadow-outline`}
                                                >
                                                    Save & Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
  )
}

export default Grading