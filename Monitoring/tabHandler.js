let tabHandler_tabSwitchCount = 0;
let tabHandler_windowSwitchCount = 0;
let tabHandler_switchStartTime;
const tabHandler_switchThreshold = 3;
const tabHandler_switchDurationThreshold = 7 * 1000;
let tabHandler_violations = {};
let tabHandler_warningTimer; // Timer for warning

function tabHandler_startTest() {
    // For starting the test
    tabHandler_resetCounts();
    tabHandler_addEventListeners();
}

function tabHandler_stopTest() {
    // For stopping the test
    clearTimeout(tabHandler_warningTimer); // Clearing warning timer if it's running
    tabHandler_removeEventListeners();
    tabHandler_resetCounts(); // Reset counts
    console.log("Violations:", tabHandler_violations);
}

function tabHandler_addEventListeners() {
    // Adding event listeners for tab/window switches
    window.addEventListener('blur', tabHandler_handleBlur);
    document.addEventListener('visibilitychange', tabHandler_handleVisibilityChange);
}

function tabHandler_removeEventListeners() {
    // Removing event listeners for tab/window switches
    window.removeEventListener('blur', tabHandler_handleBlur);
    document.removeEventListener('visibilitychange', tabHandler_handleVisibilityChange);
}

function tabHandler_handleBlur(event) {
    if (event.target instanceof Window) {
        tabHandler_windowSwitchCount++;
    } else {
        tabHandler_tabSwitchCount++;
    }
    tabHandler_checkWarnings();
}

function tabHandler_handleVisibilityChange() {
    if (document.hidden) {
        tabHandler_switchStartTime = new Date().getTime();
        // Start timer to check if the user has been away for more than 7 seconds
        tabHandler_warningTimer = setTimeout(tabHandler_checkWarnings, tabHandler_switchDurationThreshold);
    } else {
        clearTimeout(tabHandler_warningTimer); // Clear the timer if the user comes back before 7 seconds
    }
}

function tabHandler_checkWarnings() {
    const currentTime = new Date().getTime();
    const switchDuration = currentTime - tabHandler_switchStartTime;

    if (document.hidden && switchDuration > tabHandler_switchDurationThreshold) {
        if (!tabHandler_violations['Staying away from the test for more than 7 seconds']) {
            tabHandler_raiseWarning('Staying away from the test for more than 7 seconds');
        }
        tabHandler_violations['Staying away from the test for more than 7 seconds'] = (tabHandler_violations['Staying away from the test for more than 7 seconds'] || 0) + 1;
        tabHandler_resetCounts();
    } else if (tabHandler_tabSwitchCount >= tabHandler_switchThreshold) {
        if (!tabHandler_violations['Switching tabs more than 3 times']) {
            tabHandler_raiseWarning('Switching tabs more than 3 times');
        }
        tabHandler_violations['Switching tabs more than 3 times'] = (tabHandler_violations['Switching tabs more than 3 times'] || 0) + 1;
        tabHandler_resetCounts();
    } else if (tabHandler_windowSwitchCount >= tabHandler_switchThreshold) {
        if (!tabHandler_violations['Switching windows more than 3 times']) {
            tabHandler_raiseWarning('Switching windows more than 3 times');
        }
        tabHandler_violations['Switching windows more than 3 times'] = (tabHandler_violations['Switching windows more than 3 times'] || 0) + 1;
        tabHandler_resetCounts();
    }
}

function tabHandler_resetCounts() {
    tabHandler_tabSwitchCount = 0;
    tabHandler_windowSwitchCount = 0;
    tabHandler_switchStartTime = null;
}

function tabHandler_raiseWarning(violation) {
    alert(`Warning: ${violation}. Please focus on the test!`);
}

// This function is to be used to send all violations committed by the candidate
function tabHandler_sendViolationsToTeacher() {
    console.log("Sending violations to teacher:");
}

// Start and stop monitoring for tab handling
function startTabMonitoring() {
    tabHandler_startTest();
}

function stopTabMonitoring() {
    tabHandler_stopTest();
}

export { startTabMonitoring, stopTabMonitoring };