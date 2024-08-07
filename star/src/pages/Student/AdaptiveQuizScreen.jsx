import React, {useEffect, useState, useRef} from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import QuizSubheaderNoNav from '../../components/Student/quiz/QuizSubheaderNoNav';
import AdapQuizStore from '../../Stores/AdaptiveQuizStore';
import ConfirmationBox from '../../components/ConfirmationBox';
import Webcam from 'react-webcam';
import * as faceDetection from '@tensorflow-models/face-detection';
import { UploadImage } from '../../APIS/ImageAPI';
import { FlagStudents } from '../../APIS/Student/AssessmentAPI';
import AdapMCQPanel from '../../components/Student/question/AdapMCQPanel';
import AdapTrueFalsePanel from '../../components/Student/question/AdapTfPanel';

const AdaptiveQuizScreen = () => {
  const [submitConfirmBox, setSubmitConfirmBox] = useState(false)

  const [renderCount, setRenderCount] = useState(0)

  const { questions, vioArray, setVioArray, clearVioArray, setCurrentQuestionIndex, score, setScore, maxScore, setMaxScore, setQuestionAttempt, setReachedLastQuestion, submittingQuiz, setSubmittingQuiz, initializeToEasyQuestion, currentQuestionIndex, questionAttempt, maxAttempts, responses, nextQuestion, reachedLastQuestion, createResponseObjects, quizConfig, updateQuizDetails, submitResponses } = AdapQuizStore();
  
  const getQuestion = () => {
    let question = questions[currentQuestionIndex];
    return question
  }
  const { monitoring } = quizConfig

  const webcamRef = useRef(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [prevVio, setPrevVio] = useState(null);
  const [violationOver, setViolationOver] = useState(true)
  const [detectorFailed, setDetectorFailed] = useState(false)
  const [interval, setIntervalId] = useState()

  const checkWebcamReady = () => {
    if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
      setIsWebcamReady(true);
      console.log('Webcam is ready');
      return true;
    }
    return false;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (checkWebcamReady()) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [monitoring]);

  const UploadFlaggings = async() => {
    const responseId = sessionStorage.getItem('responseId')
    console.log("Pushing data to servers")
    try {
      const res = await FlagStudents({data: vioArray, id: responseId})
      console.log(res)
      clearVioArray()
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(monitoring) {
      const intervalId = setInterval(() => {
        if (vioArray.length > 0) {
          UploadFlaggings();
        }else {
          console.log("No data to push")
        }
      }, 45000);
  
      return () => clearInterval(intervalId);
    }
  }, [vioArray, monitoring]);

  useEffect(() => {
    if (isWebcamReady && monitoring) {
      console.log("detection started")
      startCameraAndDetection();
    }
  }, [isWebcamReady, monitoring]);

  useEffect(()=> {
    setPrevVio(null)
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
        const url = await upload({image :updatedVio.image})
        updatedVio.image = url
        setVioArray(updatedVio);
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

  const detectStudent = async (videoElement, detector) => {
    
    try {
      const estimationConfig = { flipHorizontal: false };

      const faces = await detector.estimateFaces(videoElement, estimationConfig);

      if (faces.length === 1) {
        setViolationOver(true)
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
    if(monitoring) {
      let switchStartTime = null;
      const handleWindowFocus = () => {
        document.title = 'Arete Assessment';
        if (switchStartTime) {
          const switchEndTime = Date.now();
          const switchDuration = switchEndTime - switchStartTime;
          if(switchDuration > 5000) {
            setVioArray({ type: 'tab switch', duration: switchDuration, timestamp: switchStartTime });
          }
        }
        switchStartTime = null;
      };

      const handleWindowBlur = () => {
        document.title = 'Warning!';
        switchStartTime = Date.now();
      };

      window.addEventListener('focus', handleWindowFocus);
      window.addEventListener('blur', handleWindowBlur);

      return () => {
        window.removeEventListener('focus', handleWindowFocus);
        window.removeEventListener('blur', handleWindowBlur);
      };
    }
  }, [monitoring]);
  

  useEffect(()=> {
    const storedQuizDetails = JSON.parse(sessionStorage.getItem('quizDetails'));
    const prevSubmission = JSON.parse(localStorage.getItem('SuccessSubmit'))
    if(prevSubmission && prevSubmission.assessmentId == storedQuizDetails.id && prevSubmission.submit == true) {
      sessionStorage.removeItem('responseId')
      localStorage.removeItem('SuccessSubmit')
      window.location.assign('quiz-submitted')
    }
    updateQuizDetails(storedQuizDetails)
    initializeToEasyQuestion()
    let res = JSON.parse(localStorage.getItem('studentResponses'))
    let res2 = localStorage.getItem('attempt')
    let res3 = localStorage.getItem('score')
    let res4 = localStorage.getItem('maxScore')
    createResponseObjects(res == null ? [] : res)
    if(res2 !== null) {
      setQuestionAttempt(Number(res2))
      setCurrentQuestionIndex(Number(res2))
      setScore(res3)
      setMaxScore(res4)
      setReachedLastQuestion()
    }
    localStorage.removeItem('studentResponses')
    localStorage.removeItem('attempt')
    localStorage.removeItem('score')
    localStorage.removeItem('maxScore')
  }, [])

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        console.log('Exited full-screen mode');
        // Add logic to handle when the user exits full-screen mode if needed
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const saveResponsesToLocalStorage = () => {
    localStorage.setItem('studentResponses', JSON.stringify(responses));
    localStorage.setItem('attempt', questionAttempt)
    localStorage.setItem('score', score)
    localStorage.setItem('maxScore', maxScore)
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!submittingQuiz) {
        saveResponsesToLocalStorage();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [responses, submittingQuiz]);

  const handleNextQuestion = () => {
    nextQuestion()
  };

  const currentQuestion = getQuestion()

  const handleSubmission = async() => {
    try {
      setSubmittingQuiz()
      const res = await submitResponses()
      localStorage.removeItem('SuccessSubmit')
      sessionStorage.removeItem('questions')
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <QuizSubheaderNoNav/>
      <div className="">
        <div className="quiz-screen p-2 md:p-4 w-full">
          <div className="flex justify-between mb-8">
          {
            currentQuestion.type === "MCQ" ? 
                <AdapMCQPanel
                  question={currentQuestion}
                  Flagged={currentQuestion.flagged}
                />
              :
              <AdapTrueFalsePanel
              question={currentQuestion}
              Flagged={currentQuestion.flagged}
              />
          }
          </div>
          {
            monitoring && <Webcam className='w-0 h-0' ref={webcamRef}/>
          }

          <div className={`fixed sm:w-full h-12 border-black border-t-[1px] bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center`}>
            <div className="mb-0">
              <p className="text-md md:text-lg font-semibold">
                Question {Number(questionAttempt) + 1} out of {maxAttempts}
              </p>
            </div>

            <div className="flex items-center space-y-0 space-x-4">
              {
                reachedLastQuestion ?
                (
                  <SubmitButton label="Submit" onClick={()=> {setSubmitConfirmBox(true)}} active={true}/>
                ) 
                :
                (
                  <SubmitButton label="Next" onClick={handleNextQuestion} active={true}/>
                ) 
                }
            </div>
          </div>

        </div>
        {
          submitConfirmBox ? 
          <ConfirmationBox heading={"Confirm to submit this assessment."} onConfirm={handleSubmission} onCancel={()=>{setSubmitConfirmBox(false)}}/>
          : 
          ''
        }
      </div>
    </>
  );
};

export default AdaptiveQuizScreen;
