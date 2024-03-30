import React from 'react'
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import CourseInfo from './pages/Student/CourseInfo.jsx';
import { Route, Routes } from "react-router-dom";
import StudentCourses from './pages/Student/StudentCourses.jsx';
import AssessmentInfo from './pages/Student/AssessmentInfo.jsx'
import AccountManagerPage from './pages/Student/AccountManagerPage.jsx';
import QuizScreen from './pages/Student/QuizScreen.jsx';
import QuizResultScreen from './pages/Student/QuizResultScreen.jsx';
import QuizInstructions from './pages/Student/QuizInstructions.jsx';
import ScheduledAssessment from './pages/Teacher/ScheduledAssessmentPage.jsx';
import QuestionBankPage from './pages/Teacher/QuestionBankPage.jsx';
import LiveMonitoring from './pages/Teacher/LiveMonitoring.jsx';
import CreateNewAssessment from './pages/Teacher/CreateNewAssessment';
import AddQuestions from './pages/Teacher/AddQuestions';
import { QuestionProvider } from '../src/Context/QuestionsContext.js';
import Reports from './pages/Teacher/Reports.jsx';

import Classes from './pages/Teacher/Classes.jsx';
import OpenBank from './pages/Teacher/OpenBank.jsx';

const AppRoutes = () => {
  return (
        <Routes>
            <Route path="/home" element = {<StudentDashboard/>} />
            <Route path="/manage-account" element = {<AccountManagerPage/>} />
            <Route path="/quiz" element = {<QuizScreen />} />
            <Route path="/courses" element = {<StudentCourses />} />
            <Route path="/courses/:courseName" element= {<CourseInfo />} />
            <Route path="/courses/assessment/:assessmentName" element= {<AssessmentInfo />} />
            <Route path="/quiz-result" element = {<QuizResultScreen/>} />
            <Route path="/quiz-instructions" element = {<QuizInstructions/>} />
              
              
            <Route path="/teacher/scheduled-assessments" element = {<ScheduledAssessment/>} />
            <Route path='/teacher/classes' element={<Classes/>}></Route>
            <Route path='/teacher/library' element={<QuestionBankPage/>}></Route>
            <Route path='/teacher/live-monitoring' element={<LiveMonitoring/>}></Route>
            <Route path='/teacher/library/:questionBank' element={<OpenBank/>}></Route>
            <Route path='/teacher/scheduled-assessments/adding-questions' element={<QuestionProvider><AddQuestions /></QuestionProvider>} />
            <Route path='/teacher/create-new-assessment' element={<CreateNewAssessment/>}></Route>
            <Route path='/teacher/add-question' element = {<AddQuestions/>}></Route>
            <Route path='/teacher/reports' element = {<Reports/>}></Route>
         </Routes>
  )
}

export default AppRoutes