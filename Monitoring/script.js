let initialPersonID;

// Function to start the camera and detect the student when the page loads
window.addEventListener('DOMContentLoaded', () => {
  startCameraAndDetection();
});

async function startCameraAndDetection() {
    const videoElement = document.getElementById('webcam');

    // Checking if getUserMedia is available
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        async (stream) => {
          videoElement.srcObject = stream;

          const detector = await faceDetectorCreator();
          // Detecting the student after a delay
          setTimeout(async () => {
            await detectStudent(videoElement, detector);
          }, 5000);
        },
        (error) => {
          console.error('Error accessing the camera: ', error);
        }
      );
    } else {
      console.error('getUserMedia not supported in this browser');
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

// Function to detect the student
async function detectStudent(videoElement, detector) {
const estimationConfig = {flipHorizontal: false};
console.log(detector)
const faces = await detector.estimateFaces(videoElement, estimationConfig);

// If a face is detected, alert the student
if (faces.length === 1) {
  alert('You have been detected as the student. Click "Start Test" to begin.');

  console.log(faces);

  initialPersonID = faces;
  
  localStorage.setItem('PersonId', JSON.stringify(initialPersonID))
  
  document.getElementById('startButton').addEventListener('click', function() {
    window.location.href = 'testPage.html';
  });
} else {
  // If no face is detected, continue detecting
  setTimeout(async () => {
    await detectStudent(videoElement, detector);
  }, 2000);
}
}