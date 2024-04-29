import { startMonitoring} from './comprehensiveModule.js';
import { startTabMonitoring} from './tabHandler.js';

document.getElementById('startButton').addEventListener('click', () => {
  startMonitoring();
  startTabMonitoring();
});