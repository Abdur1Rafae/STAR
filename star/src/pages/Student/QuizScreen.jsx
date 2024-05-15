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
import { UploadImage } from '../../APIS/ImageAPI';
import { FlagStudents } from '../../APIS/Student/AssessmentAPI';

const QuizScreen = () => {
  const showNav = ToggleStore((store) => store.showNav);
  const [submittingQuiz, setSubmittingQuiz] = useState(false)
  const [submitConfirmBox, setSubmitConfirmBox] = useState(false)

  const [renderCount, setRenderCount] = useState(0)

  const [reachedLastQuestion, SetReachedLastQuestion] = useState(false)

  const { questions, currentQuestionIndex, responses, nextQuestion, prevQuestion, createResponseObjects, quizConfig, updateQuizDetails, submitResponses } = QuizStore();

  const {navigation, instantFeedback} = quizConfig

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [vioArray, setVioArray] = useState([]);
  const [prevVio, setPrevVio] = useState(null);
  const [violationOver, setViolationOver] = useState(true)
  const [detectorFailed, setDetectorFailed] = useState(false)
  const [interval, setIntervalId] = useState()

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      setIsWebcamReady(true);
    }
  }, [webcamRef]);

  const UploadFlaggings = async() => {
    const responseId = localStorage.getItem('responseId')
    console.log("Pushing data to servers")
    try {
      const res = await FlagStudents({data: vioArray, id: responseId})
      console.log(res)
      setVioArray([])
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (vioArray.length > 0) {
        UploadFlaggings();
      }else {
        console.log("No data to push")
      }
    }, 90000); // 90 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isWebcamReady) {
      startCameraAndDetection();
    }
  }, [isWebcamReady]);

  useEffect(()=> {
    setPrevVio(null)
    console.log(vioArray)
  }, [vioArray])

  const upload = async({image}) => {
    try {
      const res = await UploadImage({image: image})
      return res.data.url
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    const compute = async() => {
      if(violationOver && prevVio && prevVio.timestamp) {
        const duration = (Date.now() - prevVio.timestamp) * renderCount;
        const updatedVio = { ...prevVio, duration };
        setImgSrc(updatedVio.image)
        const url = await upload({image :updatedVio.image})
        updatedVio.image = url
        console.log(updatedVio.image)
        setVioArray(prevArray => [...prevArray, updatedVio]);
        setRenderCount(0)
      }
    }

    compute()
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
      let detector = await faceDetection.createDetector(model ,detectorConfig);

      const intervalId = setInterval(async () => {
        await detectStudent(videoElement, detector);
      }, 10000)
      setIntervalId(intervalId)
    }
  }

  // useEffect(()=> {
  //   if(detectorFailed) {
  //     clearInterval(interval)
  //     const intervalId = setInterval(async () => {
  //       try {
  //         const videoElement = webcamRef.current.video;
  //         if (!videoElement) {
  //           console.log('Webcam footage not found. Kindly ensure your webcam is functional and allow access to it.');
  //           return;
  //         }
  //         const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  //         const detectorConfig = {
  //           runtime: 'mediapipe',
  //           solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
  //         };
  //         let detector = await faceDetection.createDetector(model, detectorConfig);
  //         setDetectorFailed(false);
  //         await detectStudent(videoElement, detector);
  //       } catch (err) {
  //         console.log(err);
  //         setDetectorFailed(true);
  //       }
  //     }, 10000)
  //     setIntervalId(intervalId)
  //   }

  // }, [detectorFailed])

  const detectStudent = async (videoElement, detector) => {
    
    try {
      const estimationConfig = { flipHorizontal: false };

      const faces = await detector.estimateFaces(videoElement, estimationConfig);

      if (faces.length === 1) {
        setViolationOver(true)
        setImgSrc('')
      } else if (faces.length === 0) {
        if(violationOver) {
          console.log('No Person detected')
          const imageSrc = webcamRef.current.getScreenshot({width: 1920, height: 1080});
          const startTime = Date.now();
          setPrevVio({
            timestamp: startTime,
            type: 'No person on screen',
            image: imageSrc
          });
          setRenderCount((prev)=> prev+1)
          setViolationOver(false)
        }
      } else {
        if(violationOver) {
          console.log('More than one Person detected')
          const imageSrc = webcamRef.current.getScreenshot();
          const startTime = Date.now();
          setPrevVio({
            timestamp: startTime,
            type: 'More than one person on screen',
            image: imageSrc
          });
          setRenderCount((prev)=> prev+1)
          setViolationOver(false)
        }
      }
    } catch (err) {
      setDetectorFailed(true);
      console.log(err)
    }
  }

  useEffect(() => {
    let switchStartTime = null;
    const handleWindowFocus = () => {
      document.title = 'Arete Assessment';
      if (switchStartTime) {
        const switchEndTime = Date.now();
        const switchDuration = switchEndTime - switchStartTime;
        if(switchDuration > 10000) {
          setVioArray(prevArray => [...prevArray, { type: 'tab switch', duration: switchDuration, timestamp: switchStartTime }]);
        }
      }
      switchStartTime = null;
    };

    const handleWindowBlur = () => {
      document.title = 'Warning!';
      switchStartTime = new Date();
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

  useEffect(() => {
    const saveData = async () => {
      try {
        await submitResponses();
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleBeforeUnload = (event) => {
      if (!submittingQuiz) {
        saveData();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [responses, submittingQuiz]);

  
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
      localStorage.removeItem('questions')
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
