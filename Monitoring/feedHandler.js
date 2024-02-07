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