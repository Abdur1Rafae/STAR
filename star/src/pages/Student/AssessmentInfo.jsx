import React from 'react'
import SubHeader from '../../components/Student/SubHeader'
import QuizTitleBar from '../../components/Student/assessment/QuizTitleBar'
import Summary from '../../components/Student/assessment/Summary'
import QuizResultScreen from './QuizResultScreen'
import { ToggleStore } from '../../Stores/ToggleStore'


const AssessmentInfo = () => {
  let showTab = ToggleStore((store)=> store.QuizResultTab)
  
  return (
    <>
        <SubHeader/>
        <div className='mt-4 ml-auto mr-auto w-11/12'>
            <QuizTitleBar Course_Name={"Computer Communication and Networking"} assessment_Name={"Monthly Test"}/>
        </div>
        <div className='mt-4 mb-4 w-11/12 ml-auto mr-auto'> 
            {
              showTab ? 
              <Summary/> :
              <QuizResultScreen/>
            }
        </div>
    </>
  )
}

export default AssessmentInfo