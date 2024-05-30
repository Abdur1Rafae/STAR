import React, { useState, useContext, useEffect } from 'react';
import PeopleNavigation from '../../components/Teacher/PeopleNavigation';
import PastCurScore from '../../components/Student/assessment/PastCurScore';
import HorizontalBarChart from '../../components/Teacher/HorizontalBarChart';
import QuizSkilEval from '../../components/Student/assessment/QuizSkilEval';
import ResultSummary from './ResultSummary';
import PeopleTabTile from '../../components/Teacher/PeopleTabTile';
import { ReportContent } from '../../Context/ReportContext';
import _ from 'lodash';
import { GetResponses } from '../../APIS/Teacher/ReportAPI';
import IndividualQuestionPanel from './IndividualQuestionPanel';
import Loader from '../Loader';
import { CgUnavailable } from "react-icons/cg";

const IndividualReport = () => {
  const [loading, setLoading] = useState(true)
  const {topPerformers, requireAttention, selectedSection, totalMarks, assessmentQuestion, avgPerformers } = useContext(ReportContent)
  const [showStudents, setShowStudents] = useState(false); 
  const [activeStudenData, setActiveStudentData] = useState({})
  const [skillMap, setSkillMap] = useState({})
  const [noData, setNoData] = useState(false)

  const [peopleinfo, setPeopleInfo] = useState([]);
  const [studentFetched, setStudentFetched] = useState(false)

  useEffect(()=>{
    const students = []
    topPerformers.map((student) => {
      students.push({
        name: student.name, 
        percentage: student.score,
        erp: student.erp,
        response: student.response
      })
    })
    avgPerformers.map((student)=> {
      students.push({
        name: student.name, 
        percentage: student.score,
        erp: student.erp,
        response: student.response
      })
    })
    requireAttention.map((student) => {
      students.push({
        name: student.name, 
        percentage: student.score,
        erp: student.erp,
        response: student.response
      })
    })
    setPeopleInfo(students)
    setStudentFetched(true)
  }, [selectedSection, topPerformers, requireAttention, avgPerformers])

  const [activePerson, setActivePerson] = useState({});

  useEffect(()=>{
    if(peopleinfo.length > 0 && studentFetched) {
      setActivePerson(peopleinfo[0])
      const getResponseforFiststudent = async()=>{
        try {
          const res = await GetResponses({id: peopleinfo[0].response._id})
          console.log(res)
          if(res.responses.length > 0) {
            setTimeout(() => {
              setActiveStudentData(res)
              setLoading(false)
            }, 500);
            const questionStats = assessmentQuestion.reduce((acc, question, index) => {
              const skill = question.skill;
              if (!acc[skill]) {
                acc[skill] = { totalCount: 0, correct: 0 };
              }
              res.responses.forEach(response => {
                if (response.questionId === question._id) {
                  acc[skill].totalCount++;
                  if (response.score === question.points) {
                    acc[skill].correct++;
                  }
                }
              });
            
              return acc;
            }, {});
            setSkillMap(questionStats)
          }
          else {
            setLoading(false)
            setNoData(true)
          }
        } catch(err) {
          console.log(err)
        }
      }
      getResponseforFiststudent()
    }
    else if(studentFetched) {
      setLoading(false)
      setNoData(true)
    }
  }, [peopleinfo])

  const debouncedApiCall = (response) => _.debounce(async() => {
    try {
      const res = await GetResponses({ id: response});
      setActiveStudentData(res)
      const questionStats = assessmentQuestion.reduce((acc, question, index) => {
        const skill = question.skill;
        if (!acc[skill]) {
          acc[skill] = { totalCount: 0, correct: 0 };
        }
        res.responses.forEach(response => {
          if (response.questionId === question._id) {
            acc[skill].totalCount++;
            if (response.score === question.points) {
              acc[skill].correct++;
            }
          }
        });
      
        return acc;
      }, {});
      setSkillMap(questionStats)
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const handlePersonClick = (person) => {
    setActivePerson(person);
    setShowStudents(false)

    if(activePerson.erp !== person.erp) {
      const debouncedFunction = debouncedApiCall(person.response._id);
      debouncedFunction();
    }
  };


  return (
        <div className='w-full flex-wrap'>
          <button onClick={() => setShowStudents(!showStudents)} className="w-full block lg:hidden h-16 mb-2 border-DarkBlue border-2 rounded mt-4 ">
            <PeopleTabTile singlepersoninfo={activePerson} onClick={()=>{}}/>
          </button>
          <div className={`lg:hidden w-full overflow-y-scroll ${showStudents ? 'h-52' : 'h-0'} transition-all duration-200 ease-in-out bg-LightBlue shadow-md rounded-md`}>
            <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/>
          </div>

          {
            loading ?
            <div className='w-full h-screen flex items-center justify-center'> 
              <Loader/>
            </div>
            :
            noData ? 
            <>
              <div className='w-full h-80 flex flex-col items-center justify-center'>
                <CgUnavailable size={100}/>
                <div className='w-1/2'> 
                <p className='text-gray-800 font-medium'>No Individual Performance data was generated from this assessment.</p>
                <p className='text-gray-400'>This occurs when no student attempted the assessment, or the assessment had no questions</p>
                </div>
              </div>
            </>
            :
            <div className='flex flex-col lg:flex-row justify-between gap-4 mt-4'>
            <div className='hidden w-4/12 lg:flex bg-LightBlue shadow-md rounded-md'>
              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/>
            </div>
            <div className='w-full flex flex-col-reverse lg:flex-col gap-4'>
              <div className='w-full flex lg:flex-row flex-col gap-4 justify-between'>
                <div className='w-full flex flex-col gap-4'>
                  <div className='rounded'>
                    <PastCurScore CurrentScore={activePerson.response.totalScore} totalScore={totalMarks} PrevTotalScore={activeStudenData.previousTotal} PreviousScore={activeStudenData.previousScore}/>
                  </div>
                  <div className='md:h-48 bg-LightBlue shadow-md rounded flex justify-center'>
                    <HorizontalBarChart inputData={activeStudenData.topicBreakDown}/>
                  </div>
                </div>
                <div className='w-full md:max-w-96'>
                  <QuizSkilEval inputData={skillMap}/>
                </div>
              </div>
              <div className=' flex lg:flex-row flex-col-reverse justify-between gap-4'>
                <div className='w-full'>
                  <IndividualQuestionPanel responses={activeStudenData.responses}/>
                </div>
                <div className='min-w-44'>
                  <ResultSummary  
                    obtainedMarks={activePerson.response.totalScore} 
                    totalMarks={totalMarks}
                    responses={activeStudenData.responses}/>                   
                </div>
              </div>
            </div>
          </div>
          }
        </div>
  );
};

export default IndividualReport;
