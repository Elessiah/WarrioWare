// ===== CONFIGURATION =====
const MODE = 'words'; // Options: 'words' ou 'random'
const RANDOM_LENGTH = 5; // Longueur si mode 'random'
const TIME_LIMIT = 5; // Secondes

// Liste de mots variés
const WORD_LIST = [
    'architecture',
    'bibliotheque',
    'chiffrement',
    'compilateur',
    'configuration',
    'cybersecurite',
    'deploiement',
    'developpement',
    'exploitation',
    'informatique',
    'intelligence',
    'microprocesseur',
    'navigateur',
    'optimisation',
    'peripherique',
    'plateforme',
    'sauvegarde',
    'synchronisation',
    'utilisateur',
    'virtualisation'
];

// ===== VARIABLES GLOBALES =====
let currentWord = '';
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let gameEnded = false;

// ===== ELEMENTS DOM =====
const wordDisplay = document.getElementById('wordDisplay');
const inputField = document.getElementById('inputField');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

// ===== FONCTIONS =====

// Générer un mot selon le mode choisi
function generateWord() {
    if (MODE === 'words') {
        return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    } else {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < RANDOM_LENGTH; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

// Démarrer le timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        // Animation d'alerte
        if (timeLeft <= 2) {
            timerElement.classList.add('warning');
        }
        
        // Fin du temps
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

// Vérifier la saisie
function checkInput() {
    if (gameEnded) return;
    
    const userInput = inputField.value;
    
    // Vérification stricte (casse respectée)
    if (userInput === currentWord) {
        endGame(true);
    }
}

// Terminer le jeu
function endGame(success) {
    if (gameEnded) return;
    
    gameEnded = true;
    inputField.disabled = true;
    
    if (success) {
        gameTimer.stop();
        if (typeof audioManager !== 'undefined') {
            audioManager.playWinSound();
        }
        resultElement.textContent = '✓ SUCCÈS !';
        resultElement.className = 'result success';
        window.location.href = "/pages/Transition/Transition.html"
    } else {
        if (typeof audioManager !== 'undefined') {
            audioManager.playLoseSound();
        }
        resultElement.textContent = '✗ ÉCHEC !';
        resultElement.className = 'result failure';
        window.location.href = "../pageGameOver/gameOver.html";
    }
}

// Bloquer copier/coller
function preventCopyPaste(e) {
    e.preventDefault();
    return false;
}

// ===== INITIALISATION =====
function initGame() {
    // Générer et afficher le mot
    currentWord = generateWord();
    wordDisplay.textContent = currentWord;
    
    // Focus automatique sur le champ
    inputField.focus();
    
    // Bloquer copier/coller
    inputField.addEventListener('paste', preventCopyPaste);
    inputField.addEventListener('copy', preventCopyPaste);
    inputField.addEventListener('cut', preventCopyPaste);
    
    // Écouter la saisie
    inputField.addEventListener('input', checkInput);
    
    // Démarrer le timer
    startTimer();
}

// Démarrage automatique au chargement
window.addEventListener('DOMContentLoaded', initGame);