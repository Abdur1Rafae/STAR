import { startTabMonitoring} from './tabHandler.js';

let stream;
let model;
let videoElement;
let canvasElement;
let monitoring = false;
let lastPersonDetectedTime = null;
let lastNoPersonDetectedTime = null;
const screenShot = null;
let warnings = {};

window.addEventListener('DOMContentLoaded', () => {
  startMonitoring();
  startTabMonitoring();
});

function captureScreenshot() {

  const ctx = canvasElement.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Create an image element to hold the screenshot
  const img = new Image();
  img.src = canvas.toDataURL('image/png');
  
  return img;
}

// Function to generate and log warnings
function generateWarning(violation, duration, timeStamp, screenShot) {
  if (!warnings[violation]) {
    warnings[violation] = { raised: false, count: 0, totalDuration: 0, timeStamps: [], screenshots: [] };
  }

  if (!warnings[violation].raised) {
    warnings[violation].raised = true;
    warnings[violation].count++;
    warnings[violation].totalDuration += duration;
    warnings[violation].timeStamps.push(timeStamp);
    warnings[violation].screenshots.push(screenShot); 
    alert(`Warning: ${violation} in front of the screen!`);
  }
  else {
    warnings[violation].count++;
    warnings[violation].totalDuration += duration;
    warnings[violation].timeStamps.push(timeStamp);
  }
}


async function faceDetectorCreator() {
  const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
  const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
};
const detector = await faceDetection.createDetector(model, detectorConfig);
return detector;
}

function arraysAreDifferent(arr1, arr2) {
  // Check if arrays have different lengths
  if (arr1.length !== arr2.length) {
      return true;
  }

  // Check if any elements are different
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
          return true;
      }
  }

  // If arrays have the same length and all elements are the same, they are not different
  return false;
}

// Function to detect objects or persons
async function detectObjectsOrPersons() {

  const detector = await faceDetectorCreator();
  const estimationConfig = {flipHorizontal: false};
  const faces = await detector.estimateFaces(videoElement, estimationConfig);
  
  let initialPersonID = JSON.parse(localStorage.getItem('PersonId'))

  if (arraysAreDifferent(faces,initialPersonID) && faces.length == 1) {
    const timeStamp = Date.now();
    screenShot = captureScreenshot();
    generateWarning('Someone other than the student detected',0,timeStamp, screenShot)
  }
  else{}

  if (!model) return;

  const predictions = await model.detect(videoElement);

  let personCount = 0;

  if (predictions && predictions.length > 0) {
    for (const prediction of predictions) {
      if (prediction.class === 'person') {
        personCount++;
      } else if (['laptop', 'cell phone', 'remote', 'tablet'].includes(prediction.class)) {
        const startTime = Date.now();
        while (await isObjectDetected(prediction.class)) {
          await new Promise(resolve => requestAnimationFrame(resolve));
        }
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // Convert to seconds
        screenShot = captureScreenshot();
        generateWarning(`${prediction.class} detected`, duration,startTime, screenShot);
        lastPersonDetectedTime = endTime;
      }
    }
  }

  const currentTime = Date.now();

  if (personCount === 0) {
    if (lastPersonDetectedTime !== null) {
      const duration = (currentTime - lastPersonDetectedTime) / 1000; // Convert to seconds
      screenShot = captureScreenshot();
      generateWarning('No person detected', duration, currentTime, screenShot);
      lastPersonDetectedTime = null;
    }
    if (lastNoPersonDetectedTime === null) {
      lastNoPersonDetectedTime = currentTime;
    }
  } else if (personCount > 1) {
    const duration = (currentTime - lastPersonDetectedTime) / 1000; // Convert to seconds
    screenShot = captureScreenshot();
    generateWarning('More than one person detected', duration, currentTime, screenShot);
    lastPersonDetectedTime = currentTime;
    lastNoPersonDetectedTime = null;
  } else {
    lastPersonDetectedTime = currentTime;
    if (lastNoPersonDetectedTime !== null) {
      screenShot = captureScreenshot();
      const duration = (currentTime - lastNoPersonDetectedTime) / 1000; // Convert to seconds
      generateWarning('No person detected', duration, currentTime, screenShot);
      lastNoPersonDetectedTime = null;
    }
  }
}

// Function to check if the object is still detected
async function isObjectDetected(objectClass) {
  const predictions = await model.detect(videoElement);
  return predictions.some(prediction => prediction.class === objectClass);
}

// Function to start monitoring
async function startMonitoring() {
  monitoring = true;
  lastPersonDetectedTime = null;
  lastNoPersonDetectedTime = null;
  videoElement = document.getElementById('webcam');
  canvasElement = document.getElementById('output');

  stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;

  model = await cocoSsd.load();

  setInterval(async () => {
    if (monitoring) {
      await detectObjectsOrPersons();
    }
  }, 2000);
}

// Function to stop monitoring and send warnings
function stopMonitoring() {
  monitoring = false;
  console.log("Warnings:", warnings);
  // Here you can send the warnings object to the teacher via an API call or any other method

  // Stop the camera feed
  stream = videoElement.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(track => track.stop());
  videoElement.srcObject = null;
}

export { startMonitoring, stopMonitoring };