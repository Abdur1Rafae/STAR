import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import CourseInfo from './pages/Student/CourseInfo.jsx';
import StudentCourses from './pages/Student/StudentCourses.jsx';
import AssessmentInfo from './pages/Student/AssessmentInfo.jsx'
import AccountManagerPage from './pages/Student/AccountManagerPage.jsx';
import AccountManagerPageT from './pages/Teacher/AccountManagerPage.jsx'
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
import Grading from './pages/Teacher/Grading.jsx';
import QuizReports from './pages/Teacher/QuizReports.jsx';
import Classes from './pages/Teacher/Classes.jsx';
import OpenBank from './pages/Teacher/OpenBank.jsx';
import { SectionProvider } from './Context/SectionsContext.js';
import GradingTablePage from './pages/Teacher/GradingTablePage.jsx';
import Roster from './pages/Teacher/Roster.jsx';
import EditAssessmentDetails from './pages/Teacher/EditAssessmentDetails.jsx';
import QuizSubmission from './pages/Student/QuizSubmission.jsx';
import Root from './pages/Root.jsx';
import { ReportProvider } from './Context/ReportContext.js';
import CaptureScreen from './pages/Student/CaptureScreen.jsx';
import ViewFlags from './pages/Teacher/ViewFlags.jsx';
import ObjectDetection from './pages/ObjectDetection.jsx';
import LandingPage from './pages/LandingPages/landingpage.jsx';
import Login from './pages/AuthenticationPages/Login.jsx';
import Signup from './pages/AuthenticationPages/Signup.jsx';
import ForgotPassword from './pages/AuthenticationPages/ForgotPassword.jsx';
import ChangePassword from './pages/AuthenticationPages/ChangePassword.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
            <Route path=''element={<LandingPage/>}></Route>

            <Route path='login'element={<Login/>}></Route>
            <Route path='signup'element={<Signup/>}></Route>

            <Route path='forgot-password'element={<ForgotPassword/>}></Route>
            <Route path='change-password'element={<ChangePassword/>}></Route>


            <Route path='home' element = {<StudentDashboard/>} />
            <Route path="manage-account" element = {<AccountManagerPage/>} />
            <Route path="quiz" element = {<QuizScreen />} />
            <Route path="courses" element = {<StudentCourses />} />
            <Route path="courses/:courseName" element= {<CourseInfo />} />
            <Route path="courses/assessment/:assessmentName" element= {<AssessmentInfo />} />
            <Route path="quiz-result" element = {<QuizResultScreen/>} />
            <Route path="quiz-instructions" element = {<QuizInstructions/>} />
            <Route path='quiz-submitted' element={<QuizSubmission/>}/>
            <Route path='/capture-face' element={<CaptureScreen/>}></Route>
              
            <Route path="teacher/home" element = {<ScheduledAssessment/>} />
            <Route path="teacher-account" element = {<AccountManagerPageT/>} />
            <Route path='teacher/classes' element={<Classes/>}></Route>
            <Route path='teacher/classes/:sectionID' element={<Roster/>}></Route>
            <Route path='teacher/library' element={<QuestionBankPage/>}></Route>
            <Route path='teacher/live-monitoring' element={<LiveMonitoring/>}></Route>
            <Route path='teacher/library/:questionBank' element={<OpenBank/>}></Route>
            <Route path='teacher/questions-set/:assessmentId' element={<QuestionProvider><AddQuestions /></QuestionProvider>} />
            <Route path='teacher/create-new-assessment' element={<SectionProvider><CreateNewAssessment/></SectionProvider>}></Route>
            <Route path='teacher/edit-assessment' element={<SectionProvider><EditAssessmentDetails/></SectionProvider>}></Route>
            <Route path='teacher/reports/:assessmentName' element = {<ReportProvider><QuestionProvider><Reports/></QuestionProvider></ReportProvider>}></Route>
            <Route path='teacher/grading/:assessmentName' element={<Grading/>}/>
            <Route path='teacher/reports'element={<QuizReports />}></Route>
            <Route path='teacher/grading-table'element={<GradingTablePage />}></Route>
            <Route path='teacher/view-flags' element={<ViewFlags/>}></Route>
            {/* <Route path='/object-detection' element={<ObjectDetection/>}></Route> */}
        
         </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
