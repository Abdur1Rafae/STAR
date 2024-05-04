import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';

function TestPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);

  return (
    <div class="container">
    <div class="instructions">
      <h2>Test Instructions</h2>
      <p>Please follow the instructions below before starting the test:</p>
      <ul>
        <li>Sit in a well-lit area.</li>
        <li>Place your device approximately 2 feet away from you.</li>
        <li>Position your device so your face is centered in the frame.</li>
      </ul>
      <button id="startButton">Start Test</button>
    </div>
    <div class="camera-feed">
      <h2>Your View</h2>

    </div>
  </div>
  );
}

export default TestPage;
