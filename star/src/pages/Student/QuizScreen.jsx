import React, {useEffect, useState, useRef} from 'react';
import MCQPanel from '../../components/Student/question/MCQPanel';
import SubmitButton from '../../components/button/SubmitButton';
import QuizNavigation from '../../components/Student/quiz/QuizNavigation';
import TrueFalse from '../../components/Student/question/TrueFalsePanel';
import TextAnswerPanel from '../../components/Student/question/TextAnswerPanel';
import MenuBar from '../../components/MenuBar';
import QuizSubheader from '../../components/Student/quiz/QuizSubheader';
import { ToggleStore } from '../../Stores/ToggleStore';
import QuizStore from '../../Stores/QuizStore';
import CorrectMCQ from '../../components/Student/question/CorrectMCQ';
import CorrectTF from '../../components/Student/question/CorrectTF';
import ConfirmationBox from '../../components/ConfirmationBox';
import CorrectSA from '../../components/Student/question/CorrectSA';
import Webcam from 'react-webcam';
import * as faceDetection from '@tensorflow-models/face-detection';

const QuizScreen = () => {
  const showNav = ToggleStore((store) => store.showNav);
  const [submittingQuiz, setSubmittingQuiz] = useState(false)
  const [submitConfirmBox, setSubmitConfirmBox] = useState(false)

  const [renderCount, setRenderCount] = useState(0)

  const [reachedLastQuestion, SetReachedLastQuestion] = useState(false)
  const [tabSwitch, setTabSwitch] = useState([])

  const { questions, currentQuestionIndex, responses, nextQuestion, prevQuestion, createResponseObjects, quizConfig, initializeQuestionStartTime, currentQuestionStartTime, updateQuizDetails, submitResponses } = QuizStore();

  const {navigation, instantFeedback} = quizConfig

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [vioArray, setVioArray] = useState([]);
  const [prevVio, setPrevVio] = useState(null);
  const [violationOver, setViolationOver] = useState(true)

  // useEffect(()=>{
  //   console.log(tabSwitch)
  // }, [tabSwitch])

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      setIsWebcamReady(true);
    }
  }, [webcamRef]);

  useEffect(() => {
    if (isWebcamReady) {
      startCameraAndDetection();
    }
  }, [isWebcamReady]);

  useEffect(()=> {
    setPrevVio(null)
    console.log(vioArray)
  }, [vioArray])

  useEffect(()=> {
    if(violationOver && prevVio && prevVio.startTime) {
      const duration = (Date.now() - prevVio.startTime) * renderCount;
      const updatedVio = { ...prevVio, duration };
      console.log(updatedVio)
      setVioArray(prevArray => [...prevArray, updatedVio]);
      setRenderCount(0)
    }
  }, [prevVio, violationOver])


  const startCameraAndDetection = async () => {
    if(webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;
      if (!videoElement) {
        console.log('Webcam footage not found. Kindly ensure your webcam is functional and allow access to it.');
        return;
      }
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
      };
      const detector = await faceDetection.createDetector(model ,detectorConfig);

      setInterval(async () => {
        await detectStudent(videoElement, detector);
        console.log("calling detector", Date.now())
      }, 10000)
    }
  }

  const detectStudent = async (videoElement, detector) => {
    
    try {
      const estimationConfig = { flipHorizontal: false };

      const faces = await detector.estimateFaces(videoElement, estimationConfig);

      if (faces.length === 1) {
        console.log("One Person Detected")
        setViolationOver(true)
      } else if (faces.length === 0) {
        console.log("No person detected")
        if(violationOver) {
          const imageSrc = webcamRef.current.getScreenshot();
          const startTime = Date.now();
          setPrevVio({
            startTime: startTime,
            type: 'No person on screen',
            image: imageSrc
          });
          setRenderCount((prev)=> prev+1)
          setViolationOver(false)
        }
      } else {
        console.log("More than one person detected")
        if(violationOver) {
          const imageSrc = webcamRef.current.getScreenshot();
          const startTime = Date.now();
          setPrevVio({
            startTime: startTime,
            type: 'More than one person on screen',
            image: imageSrc
          });
          setRenderCount((prev)=> prev+1)
          setViolationOver(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    let switchStartTime = null;
    const handleWindowFocus = () => {
      document.title = 'Your Application Title';
      if (switchStartTime) {
        const switchEndTime = new Date();
        const switchDuration = switchEndTime - switchStartTime;
        setTabSwitch(prevTabSwitch => [
          ...prevTabSwitch,
          { type: 'tab switch', duration: switchDuration }
        ]);
      }
      switchStartTime = null; // Reset switch start time
    };

    const handleWindowBlur = () => {
      document.title = 'Hello';
      switchStartTime = new Date(); // Store switch start time
    };

    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, []);
  

  useEffect(()=> {
    const storedQuizDetails = JSON.parse(localStorage.getItem('quizDetails'));
    const prevSubmission = JSON.parse(localStorage.getItem('SuccessSubmit'))
    if(prevSubmission && prevSubmission.assessmentId == storedQuizDetails.id && prevSubmission.submit == true) {
      localStorage.removeItem('responseId')
      localStorage.removeItem('SuccessSubmit')
      window.location.assign('/quiz-submitted')
    }
    updateQuizDetails(storedQuizDetails)
    createResponseObjects([])
  }, [])

  // useEffect(() => {
  //   const saveData = async () => {
  //     try {
  //       await submitResponses();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  
  //   const handleBeforeUnload = (event) => {
  //     if (!submittingQuiz) {
  //       console.log("here")
  //       saveData();
  //       event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
  //     }
  //   };
  
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [responses, submittingQuiz]);

  
  const [answerSubmitted, setAnswerSubmit] = useState(false)

  const getQuestion = ()=>{
    let question = questions[currentQuestionIndex];
    return question
  }

  const currentQuestion = getQuestion()

  const handleNextQuestion = () => {
    if(currentQuestionIndex == questions.length - 1) {
      nextQuestion()
      SetReachedLastQuestion(true)
    }
    else {
      setAnswerSubmit(false)
      nextQuestion()
    }
  };

  const handlePrevious = () => {
    prevQuestion()
  };

  const handleAnswerDisplay = () => {
    setAnswerSubmit(true)
  }

  const handleSubmission = async() => {
    try {
      setSubmittingQuiz(true)
      const res = await submitResponses()
      localStorage.removeItem('SuccessSubmit')
      window.location.assign('/quiz-submitted')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col w-screen lg:w-full'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <QuizSubheader/>
      <div className="">
        <div className="quiz-screen p-2 md:p-4 w-full">
          <div className="flex justify-between mb-8">
          {
            currentQuestion.type === "MCQ" ? 
              (instantFeedback ?
                (answerSubmitted ?
                  <CorrectMCQ
                    question={currentQuestion}
                  />
                  :
                  <MCQPanel
                    question={currentQuestion}
                    Flagged={currentQuestion.flagged}
                  />
                )
                :
                <MCQPanel
                  question={currentQuestion}
                  Flagged={currentQuestion.flagged}
                />
              )
              :
              (questions[currentQuestionIndex].type === "Short Answer" ? 
                (
                  instantFeedback ? 
                  (
                    answerSubmitted ?
                      <CorrectSA question={currentQuestion}/>
                      :
                      <TextAnswerPanel
                      question={currentQuestion}
                      Flagged={currentQuestion.flagged}
                    />
                  )
                  :
                    <TextAnswerPanel
                      question={currentQuestion}
                      Flagged={currentQuestion.flagged}
                    />
                )
                :
                (instantFeedback ?
                  (answerSubmitted ?
                    <CorrectTF
                      question={currentQuestion}
                    />
                    :
                    <TrueFalse
                      question={currentQuestion}
                      Flagged={currentQuestion.flagged}
                    />
                  )
                  :
                  <TrueFalse
                    question={currentQuestion}
                    Flagged={currentQuestion.flagged}
                  />
                )
              )
          }

          </div>

          <Webcam className='w-0 h-0' ref={webcamRef}/>

          <div className={`fixed sm:w-full h-12 border-black border-t-[1px] bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center`}>
            <div className="mb-0">
              <p className="text-md md:text-lg font-semibold">
                Question {currentQuestionIndex + 1} out of {questions.length}
              </p>
            </div>

            <div className="flex items-center space-y-0 space-x-4">
              {
                reachedLastQuestion ? 
                <SubmitButton label="Submit" onClick={()=> {setSubmitConfirmBox(true)}} active={true}/>
                :
                (
                  !navigation ? 
                  (
                    instantFeedback ? 
                    <>
                    {
                      answerSubmitted ? 
                      <SubmitButton label="Next" onClick={handleNextQuestion} active={true}/>
                      :
                      <SubmitButton label="Answer" onClick={handleAnswerDisplay} active={true} />
                    }
                    </>
                    :
                    <SubmitButton label="Next" onClick={handleNextQuestion} active={true}/>
                  ) 
                  :
                  <>
                    <SubmitButton label="Previous" onClick={navigation ? handlePrevious : ()=>{}} active={ navigation ? true : false} />
                    <SubmitButton label="Next" onClick={handleNextQuestion} active={true}/>
                  </>
                )
              }
            </div>
          </div>

        </div>
        {
          navigation ? 
          <div className={`z-10 fixed top-28 right-0 transition-all ease-out duration-500 ${showNav ? 'w-[16.1rem]' : 'w-0'}`}>
            <div className={`transition-all ease-out duration-500 ${showNav ? 'sm:w-36 md:w-[15.9rem]' : 'w-0'} flex items-start justify-around`}>
              {(
                <>
                  <QuizNavigation/>
                </>
              )}
            </div>
          </div> : ''
        }
        {
          submitConfirmBox ? 
          <ConfirmationBox message={"Confirm to submit this assessment."} onConfirm={handleSubmission} onCancel={()=>{setSubmitConfirmBox(false)}}/>
          : 
          ''
        }
      </div>
    </div>
  );
};

export default QuizScreen;
