import React, {lazy, Suspense} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
const StudentDashboard = lazy(()=> import('./pages/Student/StudentDashboard.jsx') )
const CourseInfo = lazy(() => import('./pages/Student/CourseInfo.jsx'));
const StudentCourses = lazy(() => import('./pages/Student/StudentCourses.jsx'));
const AssessmentInfo = lazy(() => import('./pages/Student/AssessmentInfo.jsx'));
const AccountManagerPage = lazy(() => import('./pages/Student/AccountManagerPage.jsx'));
const AccountManagerPageT = lazy(() => import('./pages/Teacher/AccountManagerPage.jsx'));
const QuizScreen = lazy(() => import('./pages/Student/QuizScreen.jsx'));
const QuizResultScreen = lazy(() => import('./pages/Student/QuizResultScreen.jsx'));
const QuizInstructions = lazy(() => import('./pages/Student/QuizInstructions.jsx'));
const ScheduledAssessment = lazy(() => import('./pages/Teacher/ScheduledAssessmentPage.jsx'));
const QuestionBankPage = lazy(() => import('./pages/Teacher/QuestionBankPage.jsx'));
const LiveMonitoring = lazy(() => import('./pages/Teacher/LiveMonitoring.jsx'));
const CreateNewAssessment = lazy(() => import('./pages/Teacher/CreateNewAssessment'));
const AddQuestions = lazy(() => import('./pages/Teacher/AddQuestions'));
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
const CaptureScreen = lazy(() => import('./pages/Student/CaptureScreen.jsx'));
const ViewFlags = lazy(() => import('./pages/Teacher/ViewFlags.jsx'));
const LandingPage = lazy(() => import('./pages/LandingPages/landingpage.jsx'));
const Login = lazy(() => import('./pages/AuthenticationPages/Login.jsx'));
const Signup = lazy(() => import('./pages/AuthenticationPages/Signup.jsx'));
const ForgotPassword = lazy(() => import('./pages/AuthenticationPages/ForgotPassword.jsx'));
const ChangePassword = lazy(() => import('./pages/AuthenticationPages/ChangePassword.jsx'));
const Loader = lazy(() => import('./components/Loader.jsx'));
const SectionProvider = lazy(() => import('./Context/SectionsContext.js'))
const ReportProvider = lazy(()=> import('./Context/ReportContext.js'));
const QuestionProvider = lazy(()=> import('../src/Context/QuestionsContext.js'))

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
    <Suspense fallback={<div className='w-full h-screen flex items-center justify-center'><Loader/></div>}>
    <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
