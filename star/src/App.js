import React, {lazy, Suspense} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Student from './pages/Student.jsx';
import Teacher from './pages/Teacher.jsx';
import { SectionProvider } from './Context/SectionsContext.js';
import { ReportProvider } from './Context/ReportContext.js';
import { QuestionProvider } from '../src/Context/QuestionsContext.js';
import AdaptiveQuiz from './pages/Teacher/AdaptiveQuiz.jsx';
import AdaptiveQuizScreen from './pages/Student/AdaptiveQuizScreen.jsx';
const StudentDashboard = lazy(()=> import('./pages/Student/StudentDashboard.jsx') )
const CourseInfo = lazy(() => import('./pages/Student/CourseInfo.jsx'));
const StudentCourses = lazy(() => import('./pages/Student/StudentCourses.jsx'));
const AssessmentInfo = lazy(() => import('./pages/Student/AssessmentInfo.jsx'));
const AccountManagerPage = lazy(() => import('./pages/Student/AccountManagerPage.jsx'));
const AccountManagerPageT = lazy(() => import('./pages/Teacher/AccountManagerPage.jsx'));
const QuizScreen = lazy(() => import('./pages/Student/QuizScreen.jsx'));
const QuizInstructions = lazy(() => import('./pages/Student/QuizInstructions.jsx'));
const ScheduledAssessment = lazy(() => import('./pages/Teacher/ScheduledAssessmentPage.jsx'));
const QuestionBankPage = lazy(() => import('./pages/Teacher/QuestionBankPage.jsx'));
const LiveMonitoring = lazy(() => import('./pages/Teacher/LiveMonitoring.jsx'));
const CreateNewAssessment = lazy(()=> import('./pages/Teacher/CreateNewAssessment.jsx'))
const AddQuestions = lazy(() => import('./pages/Teacher/AddQuestions.jsx'));
const Reports = lazy(() => import('./pages/Teacher/Reports.jsx'));
const Grading = lazy(() => import('./pages/Teacher/Grading.jsx'));
const QuizReports = lazy(() => import('./pages/Teacher/QuizReports.jsx'));
const Classes = lazy(() => import('./pages/Teacher/Classes.jsx'));
const OpenBank = lazy(() => import('./pages/Teacher/OpenBank.jsx'));
const GradingTablePage = lazy(() => import('./pages/Teacher/GradingTablePage.jsx'));
const Roster = lazy(() => import('./pages/Teacher/Roster.jsx'));
const EditAssessmentDetails = lazy(() => import('./pages/Teacher/EditAssessmentDetails.jsx'));
const QuizSubmission = lazy(() => import('./pages/Student/QuizSubmission.jsx'));
const Root = lazy(() => import('./pages/Root.jsx'));
const ViewFlags = lazy(() => import('./pages/Teacher/ViewFlags.jsx'));
const LandingPage = lazy(() => import('./pages/LandingPages/landingpage.jsx'));
const Login = lazy(() => import('./pages/AuthenticationPages/Login.jsx'));
const Signup = lazy(() => import('./pages/AuthenticationPages/Signup.jsx'));
const ForgotPassword = lazy(() => import('./pages/AuthenticationPages/ForgotPassword.jsx'));
const ChangePassword = lazy(() => import('./pages/AuthenticationPages/ChangePassword.jsx'));
const CaptureScreen = lazy(()=> import('./pages/Student/CaptureScreen.jsx'))
const Loader = lazy(() => import('./components/Loader.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route path=''element={<LandingPage/>}></Route>

      <Route path='login'element={<Login/>}></Route>
      <Route path='signup'element={<Signup/>}></Route>

      <Route path='forgot-password'element={<ForgotPassword/>}></Route>
      <Route path='change-password'element={<ChangePassword/>}></Route>

      <Route path='student/' element={<Student/>}>
        <Route path='home' element = {<StudentDashboard/>} />
        <Route path="courses" element = {<StudentCourses />} />
        <Route path="manage-account" element = {<AccountManagerPage/>} />
        <Route path="quiz-instructions" element = {<QuizInstructions/>} />
        <Route path="quiz" element = {<QuizScreen />} />
        <Route path="adaptive-quiz" element={<AdaptiveQuizScreen/>}/>
        <Route path="courses/:courseName" element= {<CourseInfo />} />
        <Route path="courses/assessment/:assessmentName" element= {<AssessmentInfo />} />
        <Route path='quiz-submitted' element={<QuizSubmission/>}/>
        <Route path='capture-face' element={<CaptureScreen/>}></Route>
      </Route>

      <Route path='teacher/' element={<Teacher/>}>
        <Route path="home" element = {<ScheduledAssessment/>} />
        <Route path="teacher-account" element = {<AccountManagerPageT/>} />
        <Route path='classes' element={<Classes/>}></Route>
        <Route path='classes/:sectionID' element={<Roster/>}></Route>
        <Route path='library' element={<QuestionBankPage/>}></Route>
        <Route path='live-monitoring' element={<LiveMonitoring/>}></Route>
        <Route path='library/:questionBank' element={<OpenBank/>}></Route>
        <Route path='questions-set/:assessmentId' element={<QuestionProvider><AddQuestions /></QuestionProvider>} />
        <Route path='create-new-assessment' element={<SectionProvider><CreateNewAssessment/></SectionProvider>}></Route>
        <Route path='edit-assessment' element={<SectionProvider><EditAssessmentDetails/></SectionProvider>}></Route>
        <Route path='reports/:assessmentName' element = {<ReportProvider><QuestionProvider><Reports/></QuestionProvider></ReportProvider>}></Route>
        <Route path='grading/:assessmentName' element={<Grading/>}/>
        <Route path='reports'element={<QuizReports />}></Route>
        <Route path='grading-table'element={<GradingTablePage />}></Route>
        <Route path='view-flags' element={<ViewFlags/>}></Route>
        <Route path='adaptive-quiz/:assessmentId' element={<QuestionProvider><AdaptiveQuiz/></QuestionProvider>}></Route>
        {/* <Route path='/object-detection' element={<ObjectDetection/>}></Route> */}
        
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Loader/></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
