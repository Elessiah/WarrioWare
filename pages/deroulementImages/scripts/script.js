const dureeJeu = 5000; 
const vitesseCarrousel = 150;

// Palette de couleurs
const couleurs = ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"];

// Élts DOM (avec classes)
const carrousel = document.querySelector(".carrousel");
const cible = document.querySelector(".cible");
const msg = document.querySelector(".msg");
const timerElt = document.querySelector(".timer");

// Cible aléatoire
const couleurCible = couleurs[Math.floor(Math.random() * couleurs.length)];
cible.style.background = couleurCible;

let index = 0;
let debut = performance.now();
let fini = false;
let intervalCarrousel, intervalTimer;

function startCarrousel() {
  intervalCarrousel = setInterval(() => {
    index = (index + 1) % couleurs.length;
    carrousel.style.background = couleurs[index];
  }, vitesseCarrousel);
}

function startTimer() {
  intervalTimer = setInterval(() => {
    const maintenant = performance.now();
    const restant = Math.max(0, dureeJeu - (maintenant - debut));
    timerElt.textContent = "Temps : " + (restant / 1000).toFixed(1) + "s";

    if (restant <= 0) fin(false);
  }, 50);
}

function fin(gagne) {
  if (fini) return;
  fini = true;

  clearInterval(intervalCarrousel);
  clearInterval(intervalTimer);

  msg.textContent = gagne ? "Gagné !" : "Perdu !";
  msg.style.color = gagne ? "#0f0" : "#f00";
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
startTimer();
