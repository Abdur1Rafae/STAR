// App.js
import React from 'react';
import AccountManagerPage from './pages/Student/AccountManagerPage.jsx';
import QuizScreen from './pages/Student/QuizScreen.jsx';
import QuizResultScreen from './pages/Student/QuizResultScreen.jsx';
import QuizInstructions from './pages/Student/QuizInstructions.jsx';


import './App.css';
import StudentDashboard from './pages/Student/StudentDashboard';
import CourseInfo from './pages/Student/CourseInfo.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentCourses from './pages/Student/StudentCourses';
import AssessmentInfo from './pages/Student/AssessmentInfo'
import Demo from './pages/demo.jsx';

const App = () => {
  return (
      <div className=''>
        <BrowserRouter>
	        <Routes>
            <Route path="/home" element = {<StudentDashboard/>} />
            <Route path="/manage-account" element = {<AccountManagerPage/>} />
            <Route path="/quiz" element = {<QuizScreen />} />
            <Route path="/courses" element = {<StudentCourses />} />
            <Route path="/courses/:courseName" element= {<CourseInfo />} />
            <Route path="/courses/assessment/:assessmentName" element= {<AssessmentInfo />} />
            <Route path="/quiz-result" element = {<QuizResultScreen/>} />
            <Route path="/quiz-instructions" element = {<QuizInstructions/>} />

 	      </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
