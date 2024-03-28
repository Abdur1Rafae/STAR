import React from 'react'
import QuizCountImp from '../../components/Student/course/QuizCountImp'
import ScoreView from '../../components/Student/course/ScoreView'
import MenuBar from '../../components/MenuBar'
import SubHeader from '../../components/Student/SubHeader'
import UpQuiz from '../../components/Student/course/UpQuiz'
import SkillEvaluation from '../../components/Student/course/SkillEvaluation'
import AssessmentHistory from '../../components/Student/course/AssessmentHistory'
import CourseNameInst from '../../components/Student/course/CourseNameInst'
import PerformanceGraph from '../../components/Student/course/PerformanceGraph'

const CourseInfo = () => {
  const quizzes = 1
  return (
    <div className="flex flex-col mb-2 font-body">
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <SubHeader/>
      <div className='mt-4 ml-auto mr-auto w-11/12'>
        <CourseNameInst Course_Name={"CSE 345 - Introduction to Computing"} Instructor_Name={"Jawwad Farid"}/>
      </div>
      <div className='mt-4 w-11/12 ml-auto mr-auto md:flex gap-4 mb-20'>
        {
          quizzes > 0 ?
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
          :
          <div className='text-xl'>
            No assessments conducted
          </div>
        }
        
      </div>
    </div>
  )
}

export default CourseInfo