const btn = document.getElementById("btn");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");

let score = 0;
let timer;
let freezeTimeout;

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
  timer = setTimeout(placeButton, 600); // bouton se déplace toutes les 0.5s
}

function clickEffect() {
  btn.style.background = "#4caf50"; // vert
  btn.style.transform = "scale(1.3)";

  setTimeout(() => {
    btn.style.background = "#ff5252";
    btn.style.transform = "scale(1)";
  }, 200);
}

btn.addEventListener("click", () => {
  // Désactiver le bouton pour empêcher les clics multiples
  btn.disabled = true;

  clickEffect();

  // Augmenter le score
  score++;
  scoreDisplay.textContent = "Score : " + score;

  if (score >= 3) {
    scoreDisplay.textContent += " — Je t'ai bien eu Keryan 😄";
  }
  // Geler le bouton 0.2s avant qu'il ne bouge
  clearTimeout(timer);
  clearTimeout(freezeTimeout);

  freezeTimeout = setTimeout(() => {
    placeButton(); // Repositionne le bouton
    btn.disabled = false; // Réactive le bouton
  }, 200);
});

// Lancer le bouton pour la première fois
placeButton();
