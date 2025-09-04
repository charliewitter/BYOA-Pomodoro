let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const logList = document.getElementById('log-list');
const clearButton = document.getElementById('clear');
const logContainer = document.getElementById('log-container');
logContainer.style.display = 'none'; // Hide by default

function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.title = `Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimeDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateTimeDisplay();
}

function logStartTime() {
    const startTime = new Date();
    const taskDescription = document.getElementById('task').value || 'No task entered';
    const listItem = document.createElement('li');
    listItem.textContent = `Task: ${taskDescription} - Started at: ${startTime.toLocaleString()}`;
    logList.appendChild(listItem);
    logContainer.style.display = 'block'; // Show when a session is logged
    clearButton.style.display = 'block';
    console.log(`Task: ${taskDescription} - Started at: ${startTime.toLocaleString()}`);
}

startButton.addEventListener('click', () => {
    logStartTime();
    startTimer();
});
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
clearButton.addEventListener('click', () => {
    logList.innerHTML = '';
    logContainer.style.display = 'none'; // Hide log container when cleared
    clearButton.style.display = 'none';
    console.log('Task log cleared.');
});

updateTimeDisplay();
