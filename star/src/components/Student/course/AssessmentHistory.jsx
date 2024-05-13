import React from 'react'
import PastQuizCard from './PastQuizCard'
import { DDMMM_HHMM } from '../../../Utils/DateFunctions'

const AssessmentHistory = ({data}) => {
  return (
    <div className='w-full md:w-1/3 h-auto md:h-72 bg-LightBlue rounded-lg drop-shadow-md md:overflow-y-scroll'>
        <h2 className='text-md font-semibold p-2'>Assessment History</h2>
        <div className='px-2 mt-4'>
            {
                data.map((assessment, index) => {
                    return (
                        <div className='w-full mb-2'>
                            <PastQuizCard previousScore={index > 0 ? data[index - 1].totalMarks : '-'} prevTotalScore={index > 0 ? (data[index-1].status == "Published" || data[index - 1].status == "Absent" ? (data[index - 1].totalScore ? data[index-1].totalScore : '-') : 0) : '-'} showReport={assessment.totalScore} id={assessment.responseId} AchievedScore={assessment.status == "Published" ? assessment.totalScore : assessment.status == "Under Review" ? 'pending' : 0} totalScore={assessment.totalMarks} Date={assessment.submitted ? DDMMM_HHMM(assessment.submitted) : '-'} Name={assessment.title}/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AssessmentHistory