import { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import ProfilePic from '../ProfilePic.jpg'

function TestPage() {
  const webcamRef = useRef(null);
  const [faceRef, setFaceRef] = useState(null);
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
    const storedFace = await faceapi.fetchImage(ProfilePic)
    let storedFaceAiData = await faceapi.detectAllFaces(storedFace).withFaceLandmarks().withFaceDescriptors()
    setFaceRef(storedFaceAiData)
  };

  const captureScreenshot = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = async () => {
        const faceUrl = await faceapi.fetchImage(imageSrc)
        let faces = await faceapi.detectAllFaces(faceUrl).withFaceLandmarks().withFaceDescriptors();
        faces = faceapi.resizeResults(faces, faceUrl)
        console.log('tried detecting')
        if (faces.length > 0 && faceRef) {
          console.log("captured face")
          const descriptor = faces[0].descriptor;
          const faceMatcher = new faceapi.FaceMatcher(faceRef);
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
        <img src={ProfilePic}></img>
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
