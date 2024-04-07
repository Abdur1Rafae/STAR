import React, { useState, useContext } from 'react';
import MenuBar from '../../components/MenuBar';
import Subheader from '../../components/Teacher/Subheader'
import SideBar from '../../components/Teacher/SideBar';
import PeopleNavigation from '../../components/Teacher/PeopleNavigation';
import PastCurScore from '../../components/Student/assessment/PastCurScore';
import HorizontalBarChart from '../../components/Teacher/HorizontalBarChart';
import QuizSkilEval from '../../components/Student/assessment/QuizSkilEval';
import { QuestionContext } from '../../Context/QuestionsContext';
import SubmitMCQPanel from '../../components/Student/question/SubmitMCQPanel';
import ResultSummary from '../../components/Student/ResultSummary';
import PeopleTabTile from '../../components/Teacher/PeopleTabTile';

const IndividualReport = () => {
  const [showStudents, setShowStudents] = useState(false); // State to toggle visibility of PeopleNavigation
   // State to store the active person
  
  const correctAnswers = 5;
  const wrongAnswers = 3; 
  const obtainedMarks = 10;
  const totalMarks = 20;  
  const questionNumbers = [{number:1, status: 1 },{number:2, status: 0 }, {number:3, status: 1 }, {number:4, status: 1 },
    {number:5, status: 0 }, {number:6, status: 1 }, {number:7, status: 0 }, {number:8, status: 0 }, {number:9, status: 1 }, {number:10, status: 0 }]; 
  const score = 10; 
  const difficulty = 'Hard';
  const skillTargeted = 'Critical Thinking';
  const topic = 'Mathematics';
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
  };

  return (
        <div className='w-full overflow-auto'>
            <div onClick={() => setShowStudents(!showStudents)} className="block md:hidden h-16 mb-2 border-DarkBlue border-2 rounded m-2">
              <PeopleTabTile singlepersoninfo={activePerson}/>
            </div>

          <div className='flex flex-col md:flex-row justify-between gap-4 mt-4'>
            <div className='hidden w-4/12 md:flex bg-LightBlue shadow-md rounded-md'>
              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/> {/* Pass activePerson and handlePersonClick function */}
            </div>
            <div className='w-full flex flex-col gap-4'>
              <div className='w-full flex gap-4 justify-between'>
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
              <div className='shadow-md rounded flex justify-between gap-4'>
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
            </div>
          </div>
        </div>
  );
};

export default IndividualReport;
