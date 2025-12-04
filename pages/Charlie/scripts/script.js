const board = document.getElementById('board');
const timerElement = document.querySelector('.timer');
const scoreElement = document.querySelector('.score');
const gameOverElement = document.querySelector('.game-over');
const finalScoreElement = document.getElementById('final-score');

const GAME_DURATION = 5000;
const GRID_SIZE = 70; 
const WINNING_SCORE = 10; 
const IMAGE_PATHS = [
    'assets/WarioBlue.png',
    'assets/WarioBlue2.png'
];

// Variables du jeu
let score = 0;
let timeLeft = GAME_DURATION;
let gameInterval;
let correctIndex;

// Initialisation du jeu
function initGame() {
    score = 0;
    updateScore();
    createBoard();
    startTimer();
}

// Création du plateau de jeu
function createBoard() {
    board.innerHTML = '';
    
    // Choisir une image aléatoire pour le bon Wario
    const correctImageIndex = Math.floor(Math.random() * 2);
    correctIndex = Math.floor(Math.random() * GRID_SIZE);
    
    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const img = document.createElement('img');
        // Utiliser l'image correcte ou l'image incorrecte selon l'index
        img.src = i === correctIndex ? IMAGE_PATHS[1] : IMAGE_PATHS[0];
        img.alt = i === correctIndex ? 'Bon Wario' : 'Mauvais Wario';
        
        cell.appendChild(img);
        
        // Ajouter l'événement de clic
        cell.addEventListener('click', () => handleCellClick(i));
        
        board.appendChild(cell);
    }
}

// Gestion du clic sur une cellule
function handleCellClick(index) {
    if (index === correctIndex) {
        // Bonne réponse
        score++;
        updateScore();
        
        // Vérifier si le joueur a gagné
        if (score >= WINNING_SCORE) {
            winGame();
        } else {
            // Sinon, continuer le jeu
            resetRound();
        }
    }
}

// Réinitialiser le tour
function resetRound() {
    clearInterval(gameInterval);
    timeLeft = GAME_DURATION;
    createBoard();
    startTimer();
}

// Mettre à jour le score
function updateScore() {
    scoreElement.textContent = `Score : ${score}`;
}

// Gestion du chronomètre
function startTimer() {
    timeLeft = GAME_DURATION;
    updateTimer();
    
    gameInterval = setInterval(() => {
        timeLeft -= 100;
        updateTimer();
        
        if (timeLeft <= 0 && score === 0) {
            endGame();
        }
    }, 100);
}

// Mettre à jour l'affichage du chronomètre
function updateTimer() {
    const seconds = Math.ceil(timeLeft / 1000);
    timerElement.textContent = `Temps restant : ${seconds}s`;
}

// Fin de la partie (défaite)
function endGame() {
    clearInterval(gameInterval);
    finalScoreElement.textContent = `Score final : ${score}`;
    document.querySelector('.game-over h2').textContent = 'Partie terminée !';
    gameOverElement.style.display = 'flex';    window.location.href = "../pageGameOver/gameOver.html";

}

// Victoire du joueur
function winGame() {
    clearInterval(gameInterval);
    finalScoreElement.textContent = score;
    document.querySelector('.game-over h2').textContent = 'Félicitations ! Vous avez gagné !';
    gameOverElement.style.display = 'flex';
    window.location.href = "/pages/Transition/Transition.html"
}

// Démarrer une nouvelle partie
function startGame() {
    gameOverElement.style.display = 'none';
    initGame();
}

// Démarrer le jeu au chargement de la page
window.onload = startGame;
