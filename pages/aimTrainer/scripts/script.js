const btn = document.getElementById("btn");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
let score = 0;
let timer;
let freezeTimeout;
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    window.location.href = "../pageGameOver/gameOver.html"; // Redirection vers la page gameover
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
  setTimeout(() => {
    btn.style.background = "#ff5252";
    btn.style.transform = "scale(1)";
  }, 200);
}

btn.addEventListener("click", () => {
  btn.disabled = true;
  clickEffect();
  score++;
  scoreDisplay.textContent = "Score : " + score;
  if (score >= 3) {
    scoreDisplay.textContent += " — Je t'ai bien eu Keryan 😄";
  }
  clearTimeout(timer);
  clearTimeout(freezeTimeout);
  freezeTimeout = setTimeout(() => {
    placeButton();
    btn.disabled = false;
  }, 200);
});

placeButton();
resetInactivityTimer();
