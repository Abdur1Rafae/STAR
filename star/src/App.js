// App.js
import React from 'react';
import AccountManagerPage from './pages/Student/AccountManagerPage.jsx';
import QuizScreen from './pages/Student/QuizScreen.jsx';
import logo from './logo.svg';
import './App.css';
import StudentDashboard from './pages/Student/StudentDashboard';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentCourses from './pages/Student/StudentCourses.jsx';

const App = () => {
  return (
      <div>
        <BrowserRouter>
	        <Routes>
            <Route path = "/home" element = {<StudentDashboard/>} />
            <Route path = "/manage-account" element = {<AccountManagerPage/>} />
            <Route path="/quiz" element = {<QuizScreen />} />
            <Route path="/courses" element = {<StudentCourses />} />

 	      </Routes>
        </BrowserRouter>
        </div>
  );
};

export default App;
