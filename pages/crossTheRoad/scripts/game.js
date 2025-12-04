import gameConfig from './gameConfig.js';
import { Player } from './Player.js';
import { Road } from './Road.js';
import { drawBackground, checkCollision } from './utils.js';

// Ajout AudioManager et TimerBomb
let audioManager;
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof AudioManager !== 'undefined') {
            audioManager = new AudioManager();
            audioManager.playPrincipalMusic();
        }
        // Timer de 15 secondes pour traverser
        window.gameTimer = new TimerBomb(15000, onTimeUp);
        window.gameTimer.start();
    });
}

function onTimeUp() {
    if (audioManager) audioManager.playGameOverSound();
    alert('Temps écoulé !');
    window.location.href = '../PageGameOver/gameOver.html';
}

// Récupération des éléments DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables globales du jeu
let gameState = {
    isRunning: false,
    startTime: null,
    gameResult: null
};

// Initialisation du jeu
const player = new Player();
const roads = [];

// Créer les routes
function initRoads() {
    const startY = gameConfig.safeZoneHeight;
    const totalAvailableHeight = gameConfig.canvasHeight - 2 * gameConfig.safeZoneHeight;
    const totalRoadHeight = gameConfig.roadHeight * gameConfig.numberOfRoads;
    const spacing = (totalAvailableHeight - totalRoadHeight) / (gameConfig.numberOfRoads + 1);

    for (let i = 0; i < gameConfig.numberOfRoads; i++) {
        const y = startY + spacing + i * (gameConfig.roadHeight + spacing);
        const direction = i % 2 === 0 ? 1 : -1; // Alterner les directions
        roads.push(new Road(y, direction));
    }
}

// Vérifier les collisions avec toutes les voitures
function checkAllCollisions() {
    for (let road of roads) {
        for (let car of road.cars) {
            if (checkCollision(player, car)) {
                return true;
            }
        }
    }
    return false;
}

// Boucle de jeu principale
function gameLoop() {
    if (!gameState.isRunning) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, gameConfig.canvasWidth, gameConfig.canvasHeight);

    // Dessiner l'arrière-plan
    drawBackground(ctx);

    // Dessiner et mettre à jour les routes
    roads.forEach(road => {
        road.draw(ctx);
        road.update();
    });

    // Dessiner les voitures
    roads.forEach(road => road.drawCars(ctx));

    // Mettre à jour et dessiner le joueur
    player.update();
    player.draw(ctx);

    // Vérifier si le joueur a gagné
    if (player.hasReachedEnd()) {
        gameState.isRunning = false;
        gameState.gameResult = 'success';
        if (audioManager) audioManager.playWinSound();
        window.dispatchEvent(new CustomEvent('gameEnded', {
            detail: { result: 'success', message: 'Bravo ! Vous avez traversé toutes les routes !' }
        }));
        window.gameTimer.stop();
        return;
    }

    // Vérifier les collisions
    if (checkAllCollisions()) {
        gameState.isRunning = false;
        gameState.gameResult = 'fail';
        if (audioManager) audioManager.playLoseSound();
        window.dispatchEvent(new CustomEvent('gameEnded', {
            detail: { result: 'fail', message: 'Collision avec une voiture !' }
        }));
        window.gameTimer.stop();
        window.location.href = "../pageGameOver/gameOver.html";
        return;
    }

    requestAnimationFrame(gameLoop);
}

// Récupérer le résultat du jeu (pour intégration externe)
function getGameResult() {
    return gameState.gameResult;
}

// Démarrer le jeu
function startGame() {
    gameState.isRunning = true;
    gameState.startTime = Date.now();
    gameState.gameResult = null;

    // Réinitialiser le joueur
    player.reset();

    // Vider les routes
    roads.forEach(road => road.reset());

    // Fonction appelée quand le temps est écoulé
    function onTimeUp() {
        if (gameState.isRunning) {
            gameState.isRunning = false;
            gameState.gameResult = 'timeout';

            window.dispatchEvent(new CustomEvent('gameEnded', {
                detail: { result: 'fail', message: 'Temps écoulé !' }
            }));
        }
    }

    // Initialiser le timer 5 secondes
    if (gameTimer) {
        gameTimer.destroy();
    }
    gameTimer = new TimerBomb(5000, onTimeUp);
    gameTimer.start();

    // Lancer la boucle de jeu
    gameLoop();
}

// Gestion des contrôles
document.addEventListener('keydown', (e) => {
    if (!gameState.isRunning) return;

    switch(e.key) {
        case 'ArrowUp':
        case 'z':
        case 'Z':
            e.preventDefault();
            player.moveUp();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            player.moveDown();
            break;
    }
});

// Support tactile/clic
canvas.addEventListener('click', (e) => {
    if (!gameState.isRunning) return;

    const rect = canvas.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    if (clickY < player.y + player.height / 2) {
        player.moveUp();
    } else {
        player.moveDown();
    }
});

// Initialisation au chargement de la page
window.addEventListener('load', () => {
    initRoads();
    // Démarrer automatiquement le jeu
    startGame();
});

// Exposer la fonction pour récupérer le résultat (pour intégration)
window.getCrossyroadResult = getGameResult;
