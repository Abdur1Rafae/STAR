import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import ProfilePic from '../ProfilePic.jpg'

function TestPage() {
  const webcamRef = useRef(null);
  const [webImageDescriptor, setWebImageDescriptor] = useState(null);
  const [matchedResult, setMatchedResult] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      loadImageAndExtractDescriptor();
    };
    loadModels();
  }, []);

  const loadImageAndExtractDescriptor = async () => {
    const facesToCheck = await faceapi.fetchImage(ProfilePic)
    let facesToCheckAiData = await faceapi.detectAllFaces(facesToCheck).withFaceLandmarks().withFaceDescriptors()
    setWebImageDescriptor(facesToCheckAiData)
  };

  const captureScreenshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = async () => {
        const faces = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        console.log('tried detecting')
        if (faces.length > 0 && webImageDescriptor) {
          console.log("captured face")
          const descriptor = faces[0].descriptor;
          const faceMatcher = new faceapi.FaceMatcher(webImageDescriptor);
          const bestMatch = faceMatcher.findBestMatch(descriptor);
          console.log(bestMatch.toString())
          setMatchedResult(bestMatch.toString());
        }
      };
    }
  };

  return (
    <div className="myapp">
      <h1>Face Detection</h1>
      <div className="appvide">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          videoConstraints={{ facingMode: 'user' }}
        />
        <button onClick={captureScreenshot}>Capture Screenshot</button>
      </div>
      <div>Matching Result: {matchedResult}</div>
    </div>
  );
}

export default TestPage;
