import React from 'react';

const CaptureScreenshot = () => {
  // Function to capture screenshot
  const captureScreenshot = (videoElement) => {
    const canvasElement = document.createElement('canvas');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
    // Convert canvas content to a data URL
    const dataUrl = canvasElement.toDataURL('image/png'); // Adjust the image format as needed
  
    // Generate a unique filename based on the current timestamp
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const filename = `screenshot_${timestamp}.png`; // Example: screenshot_20240502123456.png
  
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename; // Use the generated filename
    a.style.display = 'none'; // Hide the anchor element
  
    // Append the anchor element to the document body
    document.body.appendChild(a);
  
    // Programmatically click the anchor element to trigger the download
    a.click();
  
    // Remove the anchor element from the document body
    document.body.removeChild(a);
  };

  return null; // Render nothing, as this component doesn't render any UI
};

// Export the captureScreenshot function
export const captureScreenshot = CaptureScreenshot.captureScreenshot;

export default CaptureScreenshot;
