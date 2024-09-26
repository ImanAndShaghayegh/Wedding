// Get references to elements
const spinningDiv = document.getElementById('spinning-div');
const cardDiv = document.getElementById('card-div');
const weddingMusic = document.getElementById('wedding-music'); // Audio reference
const visualizer = document.getElementById('visualizer'); // Visualizer container
const bars = document.getElementsByClassName('bar'); // All bars in the visualizer

let audioContext, analyser, source, frequencyData;

let rotationCount = 0;
let slowingDown = false;
let speed = 1500;


spinningDiv.addEventListener('click', startSpinning);
spinningDiv.addEventListener('click', animateBars);

function startSpinning() {
    weddingMusic.currentTime = 0;
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(weddingMusic);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        frequencyData = new Uint8Array(analyser.frequencyBinCount);
    }
    visualizer.classList.remove('hidden');
    spin();
}

function spin() {
    if (rotationCount < 11 && !slowingDown) {
        speed = 1000 / (rotationCount + 1); // Faster each round
        spinningDiv.style.transition = `transform ${speed}ms linear`;
        spinningDiv.style.transform = `rotateY(${360 * (rotationCount + 1)}deg)`;
        rotationCount++;
        setTimeout(spin, speed);
    } else if (!slowingDown) {
        setTimeout(() => {
            spinningDiv.style.display = 'none';
            cardDiv.style.display = 'inline-block';
        }, 1);
    }
}


function animateBars() {
    weddingMusic.play()
    requestAnimationFrame(animateBars);
    analyser.getByteFrequencyData(frequencyData);

    for (let i = 0; i < bars.length; i++) {
        const barHeight = Math.random() * 100;
        bars[i].style.height = `${barHeight}px`;
        bars[i].style.backgroundColor = 'pink';
    }
}


function slowDownCard() {
    if (speed <= 1000) {
        speed += 200;
        cardDiv.style.transition = `transform ${speed}ms linear`;
        cardDiv.style.transform = `rotateY(${360 * (rotationCount + 1)}deg)`;

        setTimeout(slowDownCard, speed);
    } else {
        cardDiv.style.transition = 'none';
    }
}
