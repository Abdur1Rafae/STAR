import React, { useState, useContext, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import PeopleNavigation from '../../components/Teacher/PeopleNavigation';
import PastCurScore from '../../components/Student/assessment/PastCurScore';
import HorizontalBarChart from '../../components/Teacher/HorizontalBarChart';
import QuizSkilEval from '../../components/Student/assessment/QuizSkilEval';
import ResultSummary from '../../components/Student/ResultSummary';
import PeopleTabTile from '../../components/Teacher/PeopleTabTile';
import { ReportContent } from '../../Context/ReportContext';
import _ from 'lodash';
import { GetResponses } from '../../APIS/Teacher/ReportAPI';
import IndividualQuestionPanel from './IndividualQuestionPanel';
import Loader from '../Loader';

const IndividualReport = () => {
  const [loading, setLoading] = useState(true)
  const {topPerformers, requireAttention, selectedSection, totalMarks, assessmentQuestion } = useContext(ReportContent)
  const [showStudents, setShowStudents] = useState(false); 
  const [activeStudenData, setActiveStudentData] = useState({})
  const [skillMap, setSkillMap] = useState({})

  const [peopleinfo, setPeopleInfo] = useState([]);

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
    requireAttention.map((student) => {
      students.push({
        name: student.name, 
        percentage: student.score,
        erp: student.erp,
        response: student.response
      })
    })
    setPeopleInfo(students)
  }, [selectedSection])

  const [activePerson, setActivePerson] = useState({});

  useEffect(()=>{
    if(peopleinfo.length > 0) {
      setActivePerson(peopleinfo[0])
      const getResponseforFiststudent = async()=>{
        try {
          const res = await GetResponses({id: peopleinfo[0].response._id})
          console.log(res)
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
        } catch(err) {
          console.log(err)
        }
      }
      getResponseforFiststudent()
    }
  }, [peopleinfo])

  const debouncedApiCall = (response) => _.debounce(async() => {
    try {
      const res = await GetResponses({ id: response});
      setActiveStudentData(res)
      console.log(res);
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
    console.log('API call debounced');
  }, 500);

  const handlePersonClick = (person) => {
    console.log("here")
    setActivePerson(person);
    setShowStudents(false)

    if(activePerson.erp !== person.erp) {
      const debouncedFunction = debouncedApiCall(person.response._id);
      debouncedFunction();
    }
  };


  return (
        <div className='w-full flex-wrap'>
          <button onClick={() => setShowStudents(!showStudents)} className="w-full block lg:hidden h-16 mb-2 border-DarkBlue border-2 rounded">
            <PeopleTabTile singlepersoninfo={activePerson} onClick={()=>{}}/>
          </button>

          {
            loading ?
            <div className='w-full h-screen flex items-center justify-center'> 
              <Loader/>
            </div>
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
                <div className=''>
                  <QuizSkilEval inputData={skillMap}/>
                </div>
              </div>
              <div className=' flex lg:flex-row flex-col-reverse justify-between gap-4'>
                <div className='w-full'>
                  <IndividualQuestionPanel responses={activeStudenData.responses}/>
                </div>
                <div className=''>
                  <ResultSummary  
                    obtainedMarks={activePerson.response.totalScore} 
                    totalMarks={totalMarks}
                    responses={activeStudenData.responses}/>                   
                </div>
              </div>
              {
                showStudents &&
                <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                    <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                        <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                            <h3 className='my-auto ml-2'>Select Student</h3>
                            <button className='mr-2' onClick={()=>{setShowStudents(false)}}><MdClose className='text-lg'/></button>
                        </div>
                        <div className='h-full overflow-y-auto no-scrollbar'>
                            <div className='h-full flex flex-col gap-4'>
                              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/>
                            </div>            
                        </div>
                    </div>
                </div>
              }
            </div>
          </div>
          }
        </div>
  );
};

export default IndividualReport;
