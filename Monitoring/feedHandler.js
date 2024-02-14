let feedHandler_stream;

async function feedHandler_startCamera() {
    const video = document.getElementById('videoElement');
    const container = document.getElementById('container');

    try {
        feedHandler_stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Camera stream obtained:', feedHandler_stream);
        video.srcObject = feedHandler_stream;
        container.style.display = 'block'; // Show container
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
}

function feedHandler_stopCamera() {
    if (feedHandler_stream) {
        const tracks = feedHandler_stream.getTracks();
        tracks.forEach(track => track.stop());
        const video = document.getElementById('videoElement');
        const container = document.getElementById('container');
        video.srcObject = null;
        container.style.display = 'none'; // Hide container
    }
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', run);

  async function run() {
    const video = document.getElementById('webcam');
    const outputCanvas = document.getElementById('output');
    const ctx = outputCanvas.getContext('2d');

    // Load COCO-SSD model
    const model = await cocoSsd.load();

    // Access webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    }

    // Function to detect person presence
    async function detectPerson() {
      // Draw video frame on canvas
      ctx.drawImage(video, 0, 0, outputCanvas.width, outputCanvas.height);

      // Detect objects in the video frame
      const predictions = await model.detect(outputCanvas);

      // Check if person detected
      const personDetected = predictions.some(prediction => prediction.class === 'person');

      // Display result
      if (personDetected) {
        console.log('Person detected in front of the screen!');
      } else {
        console.log('No person detected in front of the screen.');
      }

      // Call detectPerson recursively for real-time detection
      requestAnimationFrame(detectPerson);
    }

    // Start person detection
    detectPerson();
  }
});