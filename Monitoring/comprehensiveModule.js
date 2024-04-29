import { intialPersonID,faceDetectorCreator } from "./script.js";

let stream;
let model;
let videoElement;
let canvasElement;
let monitoring = false;
let lastPersonDetectedTime = null;
let lastNoPersonDetectedTime = null;
let warnings = {};

// Function to generate and log warnings
function generateWarning(violation, duration, timeStamp) {
  if (!warnings[violation]) {
    warnings[violation] = { raised: false, count: 0, totalDuration: 0, timeStamps: [] };
  }

  if (!warnings[violation].raised) {
    warnings[violation].raised = true;
    warnings[violation].count++;
    warnings[violation].totalDuration += duration;
    warnings[violation].timeStamps.push(timeStamp);
    alert(`Warning: ${violation} in front of the screen!`);
  }
  else {
    warnings[violation].count++;
    warnings[violation].totalDuration += duration;
    warnings[violation].timeStamps.push(timeStamp);
  }
}

// Function to detect objects or persons
async function detectObjectsOrPersons() {

  detector = faceDetectorCreator();
  const estimationConfig = {flipHorizontal: false};
  const faces = await detector.estimateFaces(videoElement, estimationConfig);
  
  if (faces != intialPersonID && faces.length == 1) {
    const timeStamp = Date.now();
    generateWarning('Someone other than the student detected',0,timeStamp)
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
        generateWarning(`${prediction.class} detected`, duration,startTime);
        lastPersonDetectedTime = endTime;
      }
    }
  }

  const currentTime = Date.now();

  if (personCount === 0) {
    if (lastPersonDetectedTime !== null) {
      const duration = (currentTime - lastPersonDetectedTime) / 1000; // Convert to seconds
      generateWarning('No person detected', duration, currentTime);
      lastPersonDetectedTime = null;
    }
    if (lastNoPersonDetectedTime === null) {
      lastNoPersonDetectedTime = currentTime;
    }
  } else if (personCount > 1) {
    const duration = (currentTime - lastPersonDetectedTime) / 1000; // Convert to seconds
    generateWarning('More than one person detected', duration, currentTime);
    lastPersonDetectedTime = currentTime;
    lastNoPersonDetectedTime = null;
  } else {
    lastPersonDetectedTime = currentTime;
    if (lastNoPersonDetectedTime !== null) {
      const duration = (currentTime - lastNoPersonDetectedTime) / 1000; // Convert to seconds
      generateWarning('No person detected', duration, currentTime);
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