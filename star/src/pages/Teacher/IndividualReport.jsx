import React, { useState, useContext } from 'react';
import PeopleNavigation from '../../components/Teacher/PeopleNavigation';
import PastCurScore from '../../components/Student/assessment/PastCurScore';
import HorizontalBarChart from '../../components/Teacher/HorizontalBarChart';
import QuizSkilEval from '../../components/Student/assessment/QuizSkilEval';
import { QuestionContext } from '../../Context/QuestionsContext';
import SubmitMCQPanel from '../../components/Student/question/SubmitMCQPanel';
import ResultSummary from '../../components/Student/ResultSummary';
import PeopleTabTile from '../../components/Teacher/PeopleTabTile';
import { MdClose } from 'react-icons/md';
const IndividualReport = () => {
  const [showStudents, setShowStudents] = useState(false); 
  
  const correctAnswers = 5;
  const wrongAnswers = 3; 
  const obtainedMarks = 10;
  const totalMarks = 20;  
  const questionNumbers = [{number:1, status: 1 },{number:2, status: 0 }, {number:3, status: 1 }, {number:4, status: 1 },
    {number:5, status: 0 }, {number:6, status: 1 }, {number:7, status: 0 }, {number:8, status: 0 }, {number:9, status: 1 }, {number:10, status: 0 }]; 

  const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);

  const data = [{name: 'Top Performers', value: 17},{name: 'Absentees', value: 6},{name: 'Requires Attention', value: 12}];
  const peopleinfo = [
    {name: 'Maaz Shamim', erp: 22222, percentage: 75},
    {name: 'Ali', erp: 22223, percentage: 80},
    {name: 'Muhammad Maaz Arasalan Batla', erp: 22224, percentage: 50},
    {name: 'Hassaan Ahmed Saeed', erp: 22225, percentage: 70},
    {name: 'Muhammad Abdur Rafae', erp: 22225, percentage: 70},
    {name: 'Alik', erp: 22225, percentage: 70},
  ];
  const [activePerson, setActivePerson] = useState(peopleinfo[0]);

  // Function to handle click on a person
  const handlePersonClick = (person) => {
    setActivePerson(person);
    setShowStudents(false)
  };

  return (
        <div className='w-full'>
            <button onClick={() => {setShowStudents(!showStudents); console.log(showStudents)}} className="w-full block md:hidden h-16 mb-2 border-DarkBlue border-2 rounded">
              <PeopleTabTile singlepersoninfo={activePerson}/>
            </button>

          <div className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
            <div className='hidden w-4/12 md:flex bg-LightBlue shadow-md rounded-md'>
              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/>
            </div>
            <div className='w-full flex flex-col-reverse md:flex-col gap-4'>
              <div className='w-full flex md:flex-row flex-col gap-4 justify-between'>
                <div className='w-full flex flex-col gap-4'>
                  <div className='rounded'>
                    <PastCurScore/>
                  </div>
                  <div className='md:h-48 bg-LightBlue shadow-md rounded flex justify-center'>
                    <HorizontalBarChart/>
                  </div>
                </div>
                <div className='min-w-80'>
                  <QuizSkilEval/>
                </div>
              </div>
              <div className='shadow-md rounded flex md:flex-row flex-col-reverse justify-between gap-4'>
                <div className='w-full'>
                  <SubmitMCQPanel  question={questions[0]}
                    currentQuestion={0}
                    totalQuestions={questions.length} isexplanation={false}/>
                </div>
                <div className='col-span-3'>
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
