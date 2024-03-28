import React from 'react'
import AssessmentDetiails from './AssessmentDetiails'
import AssessmentResults from './AssessmentResults'
import PastCurScore from './PastCurScore'
import TimeTaken from './TimeTaken'
import TopicBreakdown from './TopicBreakdown'
import QuizSkilEval from './QuizSkilEval'

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