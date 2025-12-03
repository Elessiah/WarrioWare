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

  const x = Math.random() * (width - btnWidth);
  const y = Math.random() * (height - btnHeight);

  btn.style.left = x + "px";
  btn.style.top = y + "px";

  clearTimeout(timer);
  timer = setTimeout(placeButton, 900); // bouton se déplace toutes les 0.5s
}

function clickEffect() {
  btn.style.background = "#4caf50"; // vert
  btn.style.transform = "scale(1.3)";

  setTimeout(() => {
    btn.style.background = "#ff5252";
    btn.style.transform = "scale(1)";
  }, 200);
}

// Quand le bouton est cliqué
btn.addEventListener("click", () => {
  clickEffect();

  // Augmenter le score
  score++;
  scoreDisplay.textContent = "Score : " + score;

  // Geler le bouton 0.2s avant qu'il ne bouge
  clearTimeout(timer);
  clearTimeout(freezeTimeout);

  freezeTimeout = setTimeout(placeButton, 200);
});

// Lancer le bouton pour la première fois
placeButton();
