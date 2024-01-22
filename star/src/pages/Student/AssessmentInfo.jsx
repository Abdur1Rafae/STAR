import React from 'react'
import MenuBar from '../../components/MenuBar'
import SubHeader from '../../components/SubHeader'
import QuizTitleBar from '../../components/assessment/QuizTitleBar'
import AssessmentDetiails from '../../components/assessment/AssessmentDetiails'
import AssessmentResults from '../../components/assessment/AssessmentResults'
import PastCurScore from '../../components/assessment/PastCurScore'
import TimeTaken from '../../components/assessment/TimeTaken'
import TopicBreakdown from '../../components/assessment/TopicBreakdown'
import QuizSkilEval from '../../components/assessment/QuizSkilEval'

const AssessmentInfo = () => {
  return (
    <div className='flex flex-col lg:h-full'>
        <MenuBar/>
        <SubHeader/>
        <div className='mt-4 ml-auto mr-auto w-11/12'>
            <QuizTitleBar Course_Name={"Computer Communication and Networking"} assessment_Name={"Monthly Test"}/>
        </div>
        <div className='mt-4 w-11/12 ml-auto mr-auto md:flex gap-4 mb-20'>
            <AssessmentDetiails/>
            <div className='md:flex gap-4 w-full flex-wrap'>
              <div className='flex md:flex-row flex-col flex-col-reverse w-full h-auto flex-wrap gap-4'>
                <TimeTaken/>
                <AssessmentResults/>
                <PastCurScore/>
              </div>
              <TopicBreakdown/>
              <QuizSkilEval/>
            </div>
        </div>
    </div>
  )
}

export default AssessmentInfo