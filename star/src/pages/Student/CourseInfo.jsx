import React, {useEffect, useState} from 'react'
import QuizCountImp from '../../components/Student/course/QuizCountImp'
import ScoreView from '../../components/Student/course/ScoreView'
import MenuBar from '../../components/MenuBar'
import SubHeader from '../../components/Student/SubHeader'
import UpQuiz from '../../components/Student/course/UpQuiz'
import SkillEvaluation from '../../components/Student/course/SkillEvaluation'
import AssessmentHistory from '../../components/Student/course/AssessmentHistory'
import CourseNameInst from '../../components/Student/course/CourseNameInst'
import PerformanceGraph from '../../components/Student/course/PerformanceGraph'
import { GetClassOverview } from '../../APIS/Student/ClassAPI'
import { ddmmyy } from '../../Utils/DateFunctions'
import Loader from '../../components/Loader';

const CourseInfo = () => {
  const [loading, setLoading] = useState(true)
  const classInfo = JSON.parse(localStorage.getItem('selectedClass'))
  const [pastAssessments, setPassAssessments] = useState([]) 
  const [totalAttempted, setTotalAttempted] = useState(0)
  const [avgScore, setAvgScore] = useState(0)
  const [highestScore, setHighestScore] = useState(0)
  const [totalScoreofHighest, setTotalScoreofHighest] = useState(0)
  const [graphData, setGraphData] = useState([])
  const [skillsData, setSkillsData] = useState([])
  const [improvement, setImprovement] = useState(0)
  const [upcomingAssessment, setUpcomingAssessment] = useState({})

  useEffect(()=> {
    const GetInfo = async() => {
      try {
        const res = await GetClassOverview({id: classInfo._id})
        console.log(res)
        setTimeout(() => {
          const pastAsg = []
          let upcomingAsg = {}
          res.assessmentHistory.map((assessment) => {
            if(assessment.status == "Not Started") {
              upcomingAsg = assessment
            }
            else {
              pastAsg.push(assessment)
            }
          })
          setUpcomingAssessment(upcomingAsg)
          setPassAssessments(pastAsg)
          setSkillsData(res.skillsBreakDown)
          setLoading(false)
        }, 500);
      } catch(err) {
        console.log(err)
      }
    }
    
    GetInfo()
  }, [])

  useEffect(()=>{
    let attemptCount = 0;
    let totalCount = 0;
    let totalScore = 0;
    let totalMarks = 0;
    let highestScore = 0;
    let corresTotalScore = 0;
    let totalMarked = 0;
    let data =[]

    if(pastAssessments.length > 0) {
      pastAssessments.map((assessment) => {
        if(assessment.responseId) {
          attemptCount++;
          if(assessment.status == "Published") {
            totalMarked++;
            totalScore += assessment.totalScore;
            if(Math.round(assessment.totalScore/assessment.totalMarks * 100) > Math.round(highestScore/corresTotalScore * 100) || (highestScore == 0 && corresTotalScore == 0)){
              highestScore = assessment.totalScore
              corresTotalScore = assessment.totalMarks
            }
          }
        }
        totalCount++
        totalMarks += assessment.totalMarks
        let obj = {
          title: ddmmyy(assessment.closeDate),
          value: assessment.totalScore ? Math.round(assessment.totalScore / assessment.totalMarks * 100) : 0
        }
        if(assessment.status == "Absent" || assessment.status == "Published") {
          data.push(obj)
        }
      })
    }
    setAvgScore(Math.round(totalScore / totalMarks * 100))
    setTotalAttempted(attemptCount)
    setHighestScore(highestScore)
    setTotalScoreofHighest(corresTotalScore)
    setGraphData(data)
    if(data.length > 1) {
      const lastTwoAsg = data.slice(-2)
      setImprovement(lastTwoAsg[1].value - lastTwoAsg[0].value)
    }
  }, [pastAssessments])

  const quizzes = 1

  return (
    <>
      <SubHeader/>
      <div className={`p-2 font-body ${loading ? 'flex items-center justify-center h-screen' : ''}`}>
        {
          loading ?
          <div className='-mt-8'>
          <Loader/>
          </div>
          :
          <>
            <div className='w-full'>
              <CourseNameInst Course_Name={classInfo.className} Instructor_Name={classInfo.teacher}/>
            </div>
            <div className='mt-4 w-full ml-auto mr-auto md:flex gap-4 mb-20'>
              {
                quizzes > 0 ?
                <div className='flex w-full md:w-full h-full flex-wrap gap-4'>
                  <div className='flex flex-col md:flex-row w-full justify-items-stretch gap-4'>
                    <QuizCountImp totalCount={pastAssessments.length} attempts={totalAttempted} improvement={improvement}/>
                    <ScoreView avgScore={avgScore} highestScore={highestScore} totalScore={totalScoreofHighest}/>
                    <UpQuiz assessment={upcomingAssessment}/>
                  </div>
                  <div className='w-full flex flex-col md:flex-row gap-4'>
                    <PerformanceGraph inputData={graphData}/>
                    <SkillEvaluation skills={skillsData}/>
                    <AssessmentHistory data={pastAssessments}/>
                  </div>
                </div> 
                :
                <div className='text-xl'>
                  No assessments conducted
                </div>
              }
              
            </div>
          </>
        }
      </div>
    </>
  )
}

export default CourseInfo