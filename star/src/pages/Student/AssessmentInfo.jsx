import React from 'react'
import MenuBar from '../../components/MenuBar'
import SubHeader from '../../components/SubHeader'
import QuizTitleBar from '../../components/assessment/QuizTitleBar'
import Summary from '../../components/assessment/Summary'
import QuizResultScreen from './QuizResultScreen'
import { useSelector } from 'react-redux'


const AssessmentInfo = () => {
  let showTab = useSelector((state)=> state.qrTab.value)

  return (
    <div className='flex flex-col lg:h-full'>
        <MenuBar/>
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
    </div>
  )
}

export default AssessmentInfo