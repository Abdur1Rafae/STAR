import React, { useRef, useState } from 'react';
import SubmitButton from '../components/button/SubmitButton';
import MenuBar from '../components/MenuBar';
import SubHeader from '../components/Student/SubHeader';
import Webcam from 'react-webcam';
import '@mediapipe/face_detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceDetection from '@tensorflow-models/face-detection';

const ObjectDetection = () => {
  const [initialPersonID, setInitialPersonID] = useState(null);
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null)


  const startCameraAndDetection = async () => {
    const videoElement = webcamRef.current.video;
    if (!videoElement) {
      alert('Webcam footage not found. Kindly ensure your webcam is functional and allow access to it.');
      return;
    }

    setTimeout(async () => {
      await detectStudent(videoElement);
    }, 5000);
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
        alert('You have been detected as the student. Click "Begin Assessment" to continue.');
      } else {
        setTimeout(async () => {
          await detectStudent(videoElement, detector);
        }, 5000);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='flex flex-col mb-8 font-body'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <SubHeader/>
      <div className="mt-4 md:mx-4 flex flex-col items-center justify-center border-t-4 border-grey-600">
        <div className="w-full p-8 rounded shadow-md shadow-outline">
          <div className='flex gap-8'>
            {
              imgSrc ? 
              <img src={imgSrc} alt="webcam" /> :
              <Webcam className='w-80 h-64' ref={webcamRef}/>
            } 
            <div className=''>
              <h2 className='font-bold'>This Assessment requires your webcam to be turned on</h2>
              <p>
                <li>Sit in a well-lit area.</li>
                <li>Place your device approximately 2 feet away from you.</li>
                <li>Position your device so your face is centered in the frame.</li>
                <li>You will not be allowed to start your assessment until only single face is captured in your webcam.</li>
              </p>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <SubmitButton label="Begin Assessment" onClick={startCameraAndDetection} active={true}/>
        </div>
      </div>
    </div>
  );
};

export default ObjectDetection