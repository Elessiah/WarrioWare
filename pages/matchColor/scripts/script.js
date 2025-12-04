const dureeJeu = 5000; 
const vitesseCarrousel = 150;

// Palette de couleurs
const couleurs = ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"];

// Élts DOM (avec classes)
const carrousel = document.querySelector(".carrousel");
const cible = document.querySelector(".cible");
const msg = document.querySelector(".msg");

// Cible aléatoire
const couleurCible = couleurs[Math.floor(Math.random() * couleurs.length)];
cible.style.background = couleurCible;

// Variables de jeu
let index = 0;
let fini = false;
let intervalCarrousel;
let gameTimer;

// Fonction appelée quand le temps est écoulé
function onTimeUp() {
    fin(false);
}

// Initialiser le timer 5 secondes
gameTimer = new TimerBomb(dureeJeu, onTimeUp);
gameTimer.start();

// Initialisation AudioManager
let audioManager;
window.addEventListener('DOMContentLoaded', () => {
    if (typeof AudioManager !== 'undefined') {
        audioManager = new AudioManager();
        audioManager.playPrincipalMusic();
    }
});

// Fonctions
function startCarrousel() {
  intervalCarrousel = setInterval(() => {
    index = (index + 1) % couleurs.length;
    carrousel.style.background = couleurs[index];
  }, vitesseCarrousel);
}


function fin(gagne) {
  if (fini) return;
  fini = true;

  clearInterval(intervalCarrousel);
  clearInterval(intervalTimer);

  if ( gagne )
  {
      msg.textContent = "Gagné !";
      msg.style.color = "#0f0";
      window.location.href = "/pages/Transition/Transition.html"
  }
  else
      window.location.href = "/pages/pageGameOver/gameOver.html"
  if (gagne) {
    msg.textContent = "Gagné !";
    msg.style.color = "#0f0";
    if (audioManager) audioManager.playWinSound();
  } else {
    msg.textContent = "Perdu !";
    msg.style.color = "#f00";
    if (audioManager) audioManager.playLoseSound();
  }
}

// Input
document.addEventListener("keydown", (e) => {
  if (fini) return;
  if (e.code === "Space") {
    const couleurActuelle = couleurs[index];
    if (couleurActuelle === couleurCible) fin(true);
    else fin(false);
  }
});

// Lancement
carrousel.style.background = couleurs[0];
startCarrousel();
