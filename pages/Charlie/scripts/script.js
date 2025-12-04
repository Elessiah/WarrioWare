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

let score = 0;
let timeLeft = GAME_DURATION;
let gameInterval;
let correctIndex;

// Suppression de la fonction initGame car intégrée dans startGame

function createBoard() {
    board.innerHTML = '';

    const correctImageIndex = Math.floor(Math.random() * 2);
    correctIndex = Math.floor(Math.random() * GRID_SIZE);
    
    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        const img = document.createElement('img');
        img.src = i === correctIndex ? IMAGE_PATHS[1] : IMAGE_PATHS[0];
        img.alt = i === correctIndex ? 'Bon Wario' : 'Mauvais Wario';
        
        cell.appendChild(img);

        cell.addEventListener('click', () => handleCellClick(i));
        
        board.appendChild(cell);
    }
}

function handleCellClick(i) {
    if (i === correctIndex) {
        score++;
        updateScore();
        if (audioManager) audioManager.playButtonSound();
        if (score >= WINNING_SCORE) {
            if (audioManager) audioManager.playWinSound();
            endGame(true);
        } else {
            createBoard();
        }
    } else {
        if (audioManager) audioManager.playLoseSound();
        endGame(false);
    }
}

// Réinitialiser le tour
function resetRound() {
    clearInterval(gameInterval);
    timeLeft = GAME_DURATION;
    createBoard();
    startTimer();
}

function updateScore() {
    scoreElement.textContent = `Score : ${score}`;
}

function startTimer() {
    timeLeft = GAME_DURATION;
    updateTimer();
    
    gameInterval = setInterval(() => {
        timeLeft -= 100;
        updateTimer();
        
        if (timeLeft <= 0 && score == 0) {
            endGame();
        }
    }, 100);
}

function updateTimer() {
    const seconds = Math.ceil(timeLeft / 1000);
    timerElement.textContent = `Temps restant : ${seconds}s`;
}

function endGame() {
    clearInterval(gameInterval);
    finalScoreElement.textContent = `Score final : ${score}`;
    document.querySelector('.game-over h2').textContent = 'Partie terminée !';
    gameOverElement.style.display = 'flex';
    window.location.href = "../pageGameOver/gameOver.html";
}

function winGame() {
    clearInterval(gameInterval);
    finalScoreElement.textContent = score;
    document.querySelector('.game-over h2').textContent = 'Félicitations ! Vous avez gagné !';
    gameOverElement.style.display = 'flex';
}

function startGame() {
    gameOverElement.style.display = 'none';
    score = 0;
    updateScore();
    createBoard();
    startTimer();
}

window.onload = startGame;

// Initialisation AudioManager
let audioManager;
window.addEventListener('DOMContentLoaded', () => {
    if (typeof AudioManager !== 'undefined') {
        audioManager = new AudioManager();
        audioManager.playPrincipalMusic();
    }
});
