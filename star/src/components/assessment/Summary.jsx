import React from 'react'
import AssessmentDetiails from '../../components/assessment/AssessmentDetiails'
import AssessmentResults from '../../components/assessment/AssessmentResults'
import PastCurScore from '../../components/assessment/PastCurScore'
import TimeTaken from '../../components/assessment/TimeTaken'
import TopicBreakdown from '../../components/assessment/TopicBreakdown'
import QuizSkilEval from '../../components/assessment/QuizSkilEval'

const Summary = () => {
  return (
    <div className='md:flex gap-4 mb-20'>
        <AssessmentDetiails/>
        <div className='md:flex gap-4 w-full flex-wrap'>
            <div className='flex md:flex-row flex-col flex-col-reverse w-full h-auto flex-wrap gap-4 mb-4 md:mb-0'>
                <TimeTaken/>
                <AssessmentResults/>
                <PastCurScore/>
            </div>
            <TopicBreakdown/>
            <QuizSkilEval/>
        </div>
    </div>
  )
}

export default Summary