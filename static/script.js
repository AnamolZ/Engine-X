let startTime;
let intervalId;
let wpmFixed = false;
let lastSpaceTime = 0;

const searchInput = document.getElementById('search');
const wpmDisplay = document.getElementById('wpm');
const searchContainer = document.getElementById('searchContainer');
const resultElement = document.getElementById('searchResult');

searchInput.addEventListener('input', handleInput);

function handleInput() {
    if (!startTime) {
        startTime = new Date();
        intervalId = setInterval(updateWPM, 1000);
    }
}

function updateWPM() {
    wpmFixed = false;
    const elapsedTimeInSeconds = (new Date() - startTime) / 1000;
    const wordCount = (searchInput.value.match(/\b\S+\b/g) || []).length;
    const wpm = Math.round((wordCount / elapsedTimeInSeconds) * 60);

    if (!wpmFixed) {
        wpmDisplay.textContent = '🏇🏻 ' + wpm;
    }
}