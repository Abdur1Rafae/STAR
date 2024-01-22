import React from 'react'
import QuizCountImp from '../../components/course/QuizCountImp'
import ScoreView from '../../components/course/ScoreView'
import MenuBar from '../../components/MenuBar'
import SubHeader from '../../components/SubHeader'
import UpQuiz from '../../components/course/UpQuiz'
import SkillEvaluation from '../../components/course/SkillEvaluation'
import AssessmentHistory from '../../components/course/AssessmentHistory'
import PerformanceGraph from '../../components/course/PerformanceGraph'
import CourseNameInst from '../../components/course/CourseNameInst'

const CourseInfo = () => {
  return (
    <div className="flex flex-col mb-20 h-screen lg:h-full overflow-y-auto">
      <MenuBar/>
      <SubHeader/>
      <div className='mt-4 ml-auto mr-auto w-11/12'>
        <CourseNameInst Course_Name={"CSE 345 - Introduction to Computing"} Instructor_Name={"Jawwad Farid"}/>
      </div>
      <div className='mt-4 w-11/12 ml-auto mr-auto md:flex gap-4 mb-20'>
        <div className='flex w-full md:w-full h-full flex-wrap gap-4'>
          <div className='flex flex-col md:flex-row w-full justify-items-stretch gap-4'>
            <QuizCountImp/>
            <ScoreView/>
            <UpQuiz/>
          </div>
          <div className='w-full flex flex-col md:flex-row gap-4'>
            <PerformanceGraph/>
            <SkillEvaluation/>
            <AssessmentHistory/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseInfo