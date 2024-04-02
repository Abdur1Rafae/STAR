import { startMonitoring, stopMonitoring } from './comprehensiveModule.js';
import { startTabMonitoring, stopTabMonitoring } from './tabHandler.js';

document.getElementById('startButton').addEventListener('click', () => {
  startMonitoring();
  startTabMonitoring();
});

document.getElementById('stopButton').addEventListener('click', () => {
  stopTabMonitoring();
  stopMonitoring();
});