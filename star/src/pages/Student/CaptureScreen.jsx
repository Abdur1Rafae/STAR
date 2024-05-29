import React, { useRef, useState, useEffect } from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import MenuBar from '../../components/MenuBar';
import SubHeader from '../../components/Student/SubHeader';
import Webcam from 'react-webcam';
import * as faceDetection from '@tensorflow-models/face-detection';
import { GetAssessmentQuestions } from '../../APIS/Student/AssessmentAPI';
import CryptoJS from 'crypto-js';
import { SubmitAssessment } from '../../APIS/Student/AssessmentAPI';


const encryptData = (data, key) => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return encrypted;
};


const CaptureScreen = () => {
  const [quizDetails, setQuizDetails] = useState(JSON.parse(localStorage.getItem('quizDetails')))
  
  const [QuizSubmitted, setQuizSubmitted] = useState(false)
  const [initialPersonID, setInitialPersonID] = useState(null);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

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
  }, []);

  useEffect(() => {
    if (isWebcamReady) {
      startCameraAndDetection();
    }
  }, [isWebcamReady]);

  const startCameraAndDetection = async () => {
    if(webcamRef.current && webcamRef.current.video) {
      const videoElement = webcamRef.current.video;
      if (!videoElement) {
        console.log('Webcam footage not found. Kindly ensure your webcam is functional and allow access to it.');
        return;
      }

      setTimeout(async () => {
        await detectStudent(videoElement);
      }, 5000);
    }
  }

  const detectStudent = async (videoElement) => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    };
    try {
      const detector = await faceDetection.createDetector(model ,detectorConfig);
      const estimationConfig = { flipHorizontal: false };

      const faces = await detector.estimateFaces(videoElement, estimationConfig);

      if (faces.length === 1) {
        setInitialPersonID(faces);
        console.log(faces)
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        alert('You have been detected as the student. Click "OK" to continue.');
      } else {
        setTimeout(async () => {
          await detectStudent(videoElement, detector);
        }, 5000);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const gotoQuiz = async() => {
    const res = await GetAssessmentQuestions({id: quizDetails.id, sectionId: quizDetails.sectionId})
    localStorage.setItem('responseId', res.responseId)
    if(res.questions && res.questions.length > 0) {
      const questionSet = [...res.questions]
      if(quizDetails.quizConfig.randomizeQuestions) {
        for (let i = questionSet.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [questionSet[i], questionSet[j]] = [questionSet[j], questionSet[i]];
        }
      }

      if(quizDetails.quizConfig.randomizeAnswers) {
        const shuffledQuestionSet = questionSet.map((question) => {
          const options = [...question.options]; 
          for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
          }
          return { ...question, options };
        });
        localStorage.setItem('questions', JSON.stringify(encryptData(shuffledQuestionSet, 'Arete1234')));
      }
      else {
        localStorage.setItem('questions', JSON.stringify(encryptData(questionSet, 'Arete1234')));
      }

      if(quizDetails.quizConfig.adaptiveTesting) {
        window.location.assign('/student/adaptive-quiz')
      }
      else {
        window.location.assign('/student/quiz')
      }
    }
    else {
      try {
        const sub = await SubmitAssessment({responses: []})
        setQuizSubmitted(true)
      } catch(err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
          <div className='flex md:flex-row flex-col gap-8'>
            {
              imgSrc ? 
              <img className='w-80 h-64' src={imgSrc} alt="webcam" /> :
              <Webcam className='w-80 h-64' ref={webcamRef}/>
            } 
            <div className=''>
              <h2 className='font-bold'>This Assessment requires your webcam to be turned on</h2>
              <p className='mb-4'>
                <li>Sit in a well-lit area.</li>
                <li>Place your device approximately 2 feet away from you.</li>
                <li>Position your device so your face is centered in the frame.</li>
                <li>You will not be allowed to start your assessment until your face is captured in your webcam.</li>
              </p>
              <h4>Flaggable actions</h4>
              <p>
                <li>Going off-screen during assessment will be detected.</li>
                <li>2 faces detected will be flagged and captured.</li>
                <li>Tab/ Application switches will be monitored along with duration.</li>
              </p>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <SubmitButton label="Begin Assessment" onClick={initialPersonID ? gotoQuiz : ()=>{}} active={initialPersonID}/>
        </div>
      </div>
    </>
  );
};

export default CaptureScreen;
