import { stopMonitoring } from './comprehensiveModule.js';
import { stopTabMonitoring } from './tabHandler.js';

document.getElementById('stopButton').addEventListener('click', () => {
    stopTabMonitoring();
    stopMonitoring();
  });