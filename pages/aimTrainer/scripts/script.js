const btn = document.getElementById("btn");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
let score = 0;
let timer;
let freezeTimeout;
let gameTimer; // Timer bomb
const TARGET_SCORE = 10; // Objectif à atteindre

// Initialisation AudioManager
let audioManager;
window.addEventListener('DOMContentLoaded', () => {
    if (typeof AudioManager !== 'undefined') {
        audioManager = new AudioManager();
        audioManager.playPrincipalMusic();
    }
});

// Fonction appelée quand le temps est écoulé
function onTimeUp() {
  clearTimeout(timer);
  clearTimeout(freezeTimeout);
  btn.disabled = true;

  if (typeof audioManager !== 'undefined') {
    audioManager.playGameOverSound();
  }

  setTimeout(() => {
    window.location.href = '../PageGameOver/GameOver.html';
  }, 2000);
}
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    window.location.href = "/pages/Transition/Transition.html"; // Redirection vers la page gameover
  }, 5000); // 5 secondes d'inactivité
}

function placeButton() {
  const width = gameArea.clientWidth;
  const height = gameArea.clientHeight;
  const btnWidth = btn.offsetWidth;
  const btnHeight = btn.offsetHeight;
  const margin = 10;
  const x = Math.random() * (width - btnWidth - 2 * margin) + margin;
  const y = Math.random() * (height - btnHeight - 2 * margin) + margin;
  btn.style.left = x + "px";
  btn.style.top = y + "px";
  clearTimeout(timer);
  timer = setTimeout(placeButton, 600);
}

function clickEffect() {
  btn.style.background = "#4caf50";
  btn.style.transform = "scale(1.3)";
  if (audioManager) audioManager.playButtonSound();
    setTimeout(() => {
        btn.style.background = "#2196f3";
    btn.style.transform = "scale(1)";
  }, 150);
}

btn.addEventListener("click", () => {
  btn.disabled = true;
  clickEffect();

  score++;
  scoreDisplay.textContent = "Score : " + score;

  // Vérifier la victoire
  if (score >= TARGET_SCORE) {
    clearTimeout(timer);
    clearTimeout(freezeTimeout);
    gameTimer.stop();

    if (typeof audioManager !== 'undefined') {
      audioManager.playWinSound();
    }

    setTimeout(() => {
      alert(`Gagné ! Score final : ${score}`);
      // Redirection ou prochain niveau
    }, 1000);
    return;
  }

  clearTimeout(timer);
  clearTimeout(freezeTimeout);

  freezeTimeout = setTimeout(() => {
    placeButton();
    btn.disabled = false;
  }, 200);
});

// Initialiser le jeu
gameTimer = new TimerBomb(5000, onTimeUp);
gameTimer.start();
placeButton();
resetInactivityTimer();
