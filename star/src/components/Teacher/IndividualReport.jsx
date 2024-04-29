import React, { useState, useContext, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import PeopleNavigation from '../../components/Teacher/PeopleNavigation';
import PastCurScore from '../../components/Student/assessment/PastCurScore';
import HorizontalBarChart from '../../components/Teacher/HorizontalBarChart';
import QuizSkilEval from '../../components/Student/assessment/QuizSkilEval';
import { QuestionContext } from '../../Context/QuestionsContext';
import SubmitMCQPanel from '../../components/Student/question/SubmitMCQPanel';
import ResultSummary from '../../components/Student/ResultSummary';
import PeopleTabTile from '../../components/Teacher/PeopleTabTile';
import { ReportContent } from '../../Context/ReportContext';
import _ from 'lodash';
import { GetResponses } from '../../APIS/Teacher/ReportAPI';

const IndividualReport = () => {
  const { topPerformers, requireAttention, selectedSection } = useContext(ReportContent)
  const [showStudents, setShowStudents] = useState(false); 
  
  const correctAnswers = 5;
  const wrongAnswers = 3; 
  const obtainedMarks = 10;
  const totalMarks = 20;  
  const questionNumbers = [{number:1, status: 1 },{number:2, status: 0 }, {number:3, status: 1 }, {number:4, status: 1 },
    {number:5, status: 0 }, {number:6, status: 1 }, {number:7, status: 0 }, {number:8, status: 0 }, {number:9, status: 1 }, {number:10, status: 0 }]; 

  const { questions } = useContext(QuestionContext);

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
  const [activePerson, setActivePerson] = useState(peopleinfo[0] || {});

  const debouncedApiCall = (response) => _.debounce(async() => {
    try {
      const res = await GetResponses({ id: response});
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log('API call debounced');
  }, 500);

  const handlePersonClick = (person) => {
    setActivePerson(person);
    setShowStudents(false)

    const debouncedFunction = debouncedApiCall(person.response._id);
    debouncedFunction();
  };


  return (
        <div className='w-full flex-wrap'>
          <button onClick={() => setShowStudents(!showStudents)} className="w-full block lg:hidden h-16 mb-2 border-DarkBlue border-2 rounded">
            <PeopleTabTile singlepersoninfo={activePerson}/>
          </button>

          <div className='flex flex-col lg:flex-row justify-between gap-4 mt-4'>
            <div className='hidden w-4/12 lg:flex bg-LightBlue shadow-md rounded-md'>
              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/>
            </div>
            <div className='w-full flex flex-col-reverse lg:flex-col gap-4'>
              <div className='w-full flex lg:flex-row flex-col gap-4 justify-between'>
                <div className='w-full flex flex-col gap-4'>
                  <div className='rounded'>
                    <PastCurScore/>
                  </div>
                  <div className='md:h-48 bg-LightBlue shadow-md rounded flex justify-center'>
                    <HorizontalBarChart/>
                  </div>
                </div>
                <div className=''>
                  <QuizSkilEval/>
                </div>
              </div>
              <div className='shadow-md rounded flex lg:flex-row flex-col-reverse justify-between gap-4'>
                <div className='w-full'>
                  <SubmitMCQPanel question={questions[0]}
                    currentQuestion={0}
                    totalQuestions={questions.length} isexplanation={false}/>
                </div>
                <div className=''>
                  <ResultSummary correctAnswers={correctAnswers} 
                    wrongAnswers={wrongAnswers}  
                    obtainedMarks={obtainedMarks} 
                    totalMarks={totalMarks} 
                    questionNumbers={questionNumbers}/>                   
                </div>
              </div>
              {
            showStudents &&
            <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                    <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                        <h3 className='my-auto ml-2'>Select Student</h3>
                        <button className='mr-2' onClick={()=>setShowStudents(false)}><MdClose className='text-lg'/></button>
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
        </div>
  );
};

export default IndividualReport;
