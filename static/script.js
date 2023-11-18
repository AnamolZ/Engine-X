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

function showSearchResult(data) {
    const resultArray = JSON.parse(data.result).map(item => item.trim());

    resultArray.forEach((item, index) => {
        if (item.trim() !== '') {
            if (index !== 2) {
                setTimeout(() => {
                    const highlightedText = highlightText(item);
                    resultElement.innerHTML = `<p>${highlightedText}</p>`;
                }, index * 10000);
            } else {
                if (resultElement) {
                    resultElement.innerHTML = `<p>${item}</p>`;
                    resultElement.style.display = 'block';
                }
            }
        }
    });

    setTimeout(() => {
        resultArray.filter(paragraph => paragraph.trim() !== '').join('');
    }, resultArray.length * 10000);
}

function highlightText(text) {
    const greenColor = '#006400';
    const redColor = '#8B0000';

    const highlightedText = text.replace(/\b(\S+)\b/g, (match, word) => {
        if (word.length % 2 === 0) {
            return `<span style="color: ${greenColor};">${word}</span>`;
        } else {
            return `<span style="color: ${redColor};">${word}</span>`;
        }
    });

    return highlightedText;
}

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && !searchInput.classList.contains('stay-up')) {
        clearInterval(intervalId);
        const query = searchInput.value;

        fetch('http://localhost:8000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        })
        .then(response => response.json())
        .then(data => {
            showSearchResult(data);
        })
        
        .catch(error => {
            console.error('Error:', error);
        });

        searchInput.value = '';
        searchContainer.classList.add('animate-up', 'stay-up');
        wpmFixed = true;
        updateWPM();

    } else if (event.key === ' ' && !searchInput.classList.contains('stay-up')) {
        lastSpaceTime = new Date();

    } else if (event.key !== 'Enter' && !searchInput.classList.contains('stay-up')) {
        if (new Date() - lastSpaceTime < 1000) {
            updateWPM();
        }
    }
});
