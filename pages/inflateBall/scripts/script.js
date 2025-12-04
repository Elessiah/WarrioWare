const clicksNeeded = Math.floor(Math.random() * 10) + 20;
let clicks = 0;
let gameTimer;

// Fonction appelée quand le temps est écoulé
function onTimeUp() {
    lose();
}

// Initialiser le timer 5 secondes
gameTimer = new TimerBomb(5000, onTimeUp);
gameTimer.start();

const balloon = document.getElementById("balloon");
const bar = document.getElementById("progress-bar");
const percent = document.getElementById("percent");

document.getElementById("click-area").addEventListener("click", () => {
    clicks++;

    const progress = Math.min(100, Math.floor((clicks / clicksNeeded) * 100));

    bar.style.width = progress + "%";
    percent.textContent = progress + "%";

    const scale = 1 + progress / 80; // gonfle doucement
    balloon.style.transform = `scale(${scale})`;

    if (progress >= 100) win();
});



function win() {
    gameTimer.stop();

    if (typeof audioManager !== 'undefined') {
        audioManager.playWinSound();
    }

    setTimeout(() => {
        window.location.href = "page_success.html";
    }, 1000);
}

function lose() {
    if (typeof audioManager !== 'undefined') {
        audioManager.playGameOverSound();
    }

    setTimeout(() => {
        window.location.href = "page_fail.html";
    }, 1000);
}