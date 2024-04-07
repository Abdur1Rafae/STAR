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
  const [showStudents, setShowStudents] = useState(true); // State to toggle visibility of PeopleNavigation
  
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
    {name: 'Ahmed', erp: 22224, percentage: 50},
    {name: 'Alid', erp: 22225, percentage: 70},
    {name: 'Alib', erp: 22225, percentage: 70},
    {name: 'Alik', erp: 22225, percentage: 70},
  ];
  const [activePerson, setActivePerson] = useState([peopleinfo[0]]); // State to store the active person


  // Function to handle click on a person
  const handlePersonClick = (person) => {
    setActivePerson(person);
  };
  return (
    <div className='flex flex-col'>
      <MenuBar name={"Maaz Shamim"} role={"Student"} />
      <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
        <SideBar active={"Grading"}/>
        <div className='w-full overflow-auto'>
          <div className='h-fit'>
            <Subheader name={"Reports"}/>
          </div>
            {/* Button to toggle visibility of PeopleNavigation on smaller screens */}
            <div className="md:hidden w-fit bg-DarkBlue m-2 rounded shadow-lg p-2 text-white text-sm right-0">
              <button onClick={() => setShowStudents(!showStudents)}>View Students</button>
            </div>
            <div className="md:hidden h-16 mb-2 border border-DarkBlue border-2 rounded m-2">
              <PeopleTabTile singlepersoninfo={activePerson}/>
            </div>

          <div className='md:grid grid-cols-10 gap-3 ml-4 '>
            {showStudents && <div className='h-32 bg-LightBlue  shadow-lg rounded-md overflow-y-scroll scroll-smooth md:h-screen col-span-3 my-2'>
              <PeopleNavigation peopleinfo={peopleinfo} activePerson={activePerson} onPersonClick={handlePersonClick}/> {/* Pass activePerson and handlePersonClick function */}
            </div>}
            <div className='col-span-7'>
              <div className='md:h-80 md:grid grid-cols-2 md:m-2  '>
                <div>
                  <div className='shadow-lg rounded mb-2 max-md:mr-2 '>
                    <PastCurScore/>
                  </div>
                  <div className='md:h-48 bg-LightBlue shadow-lg rounded max-md:mr-2'>
                    <HorizontalBarChart/>
                  </div>
                </div>
                <div className='md:ml-2 max-md:mt-2 shadow-lg'>
                  <QuizSkilEval/>
                </div>
              </div>
              <div className='bg-LightBlue shadow-lg rounded m-2  md:grid grid-cols-10'>
                <div className='col-span-7 max-md:mb-2'>
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
      </div>
    
    </div>
  );
};

export default IndividualReport;
