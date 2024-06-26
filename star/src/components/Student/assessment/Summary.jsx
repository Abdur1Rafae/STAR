import React, {useEffect, useState} from 'react'
import AssessmentDetiails from './AssessmentDetiails'
import AssessmentResults from './AssessmentResults'
import PastCurScore from './PastCurScore'
import TimeTaken from './TimeTaken'
import TopicBreakdown from './TopicBreakdown'
import QuizSkilEval from './QuizSkilEval'
import { GetAssessmentSummary } from '../../../APIS/Student/AssessmentAPI'
import { calculateTimeDifference, DDMMMMYYYY_HHMM } from '../../../Utils/DateFunctions'

const Summary = () => { 
  const assessmentInfo = JSON.parse(localStorage.getItem('selectedAssessment'))
  const [duration, setDuration] = useState(0)
  const [responses, setResponses] = useState([])
  const [submissionTime, setSubmissionTime] = useState()
  const [responseTime, setResponseTime] = useState(0)
  const [topicMap, setTopicMap] = useState({})
  const [skillMap, setSkillMap] = useState({})
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalSkipped, setTotalSkipped] = useState(0)


  useEffect(()=>{
    const GetSummary = async() => {
      try {
        const res = await GetAssessmentSummary({id: assessmentInfo.id})
        console.log(res)
        setDuration(res.duration)
        setResponses(res.responses)
        setSubmissionTime(DDMMMMYYYY_HHMM({date:res.submittedAt}))
        setResponseTime(calculateTimeDifference(res.createdAt, res.submittedAt))
      } catch(err) {
        console.log(err)
      }

    }

    GetSummary()
  }, [])

  useEffect(()=> {
    if(responses.length > 0) {
      const topicMap = {};
      const skillMap = {};
      let totalCorrect = 0;
      let totalSkipped = 0;

      responses.forEach(obj => {
        if (!topicMap[obj.topic]) {
          topicMap[obj.topic] = { correct: 0, totalCount: 0 };
        }
        if (obj.correct === 1) {
          topicMap[obj.topic].correct++;
          totalCorrect++;
        }
        if (obj.correct === -1) {
          totalSkipped++;
        }
        topicMap[obj.topic].totalCount++;

        if (!skillMap[obj.skill]) {
          skillMap[obj.skill] = { correct: 0, totalCount: 0 };
        }
        if (obj.correct === 1) {
          skillMap[obj.skill].correct++;
        }
        skillMap[obj.skill].totalCount++;
      });

      setSkillMap(skillMap);
      setTopicMap(topicMap);
      setTotalCorrect(totalCorrect);
      localStorage.setItem('totalCorrect', totalCorrect)
      localStorage.setItem('totalWrong', responses.length - (totalCorrect))
      setTotalSkipped(totalSkipped);
    }
  }, [responses])

  return (
    <div className='md:flex gap-4 mb-2'>
        <AssessmentDetiails questionCount={responses.length} skillMap={skillMap} topicMap={topicMap} duration={duration} submissionTime={submissionTime} skills={Object.keys(skillMap)}/>
        <div className='md:flex gap-4 w-full flex-wrap'>
            <div className='flex md:flex-row flex-col w-full h-auto flex-wrap gap-4 mb-4 md:mb-0'>
                <div className='bg-LightBlue shadow-md rounded-lg'>
                <TimeTaken responseTime={responseTime}/></div>
                <AssessmentResults percent={Math.round(assessmentInfo.currentScore/assessmentInfo.totalScore* 100)} correct={totalCorrect} skipped={totalSkipped} incorrect={responses.length - (totalCorrect + totalSkipped)}/>
                <PastCurScore CurrentScore={assessmentInfo.currentScore} totalScore={assessmentInfo.totalScore} PrevTotalScore={assessmentInfo.prevTotalScore == '-' ? undefined : assessmentInfo.prevTotalScore} PreviousScore={assessmentInfo.previousScore== '-' ? undefined : assessmentInfo.previousScore}/>
            </div>
            <TopicBreakdown topics={topicMap}/>
            <div className='w-full h-80'>
              <QuizSkilEval inputData={skillMap}/>
            </div>
        </div>
    </div>
  )
}

export default Summary