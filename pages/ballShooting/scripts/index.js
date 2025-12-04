// Init du terrain
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables
let ball = {
    x: 100,
    y: 250,
    radius: 15,
    color: "red",
    isDragging: false,
    power: 0,
    maxPower: 20,
};

// Position du but
const goal = {
    x: 750,
    y: 200,
    width: 50,
    height: 100,
    color: "white",
};

// Position de la souris
let mouseX = 0;
let mouseY = 0;

let inactivityTimer;

function inactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        window.location.href = "../pageGameOver/gameOver.html"; // Redirection vers la page gameover
    }, 5000); // 5 secondes d'inactivité
}

// Fonction pour dessiner un ballon
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Fonction pour dessiner le but
function drawGoal() {
    // poteaux
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);

    // filets
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.lineWidth = 1;

    const spacing = 8;
    const lines = Math.floor(goal.height / spacing);

    for (let i = 0; i < lines; i++) {
        const y = goal.y + i * spacing;
        ctx.beginPath();
        ctx.moveTo(goal.x, y);
        ctx.lineTo(goal.x + goal.width, y + goal.width / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(goal.x + goal.width, y);
        ctx.lineTo(goal.x, y + goal.width / 2);
        ctx.stroke();
    }
}

// dessiner la ligne de pouvoir
function drawPowerLine() {
    if (ball.isDragging) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGoal();
    drawBall();
    drawPowerLine();
}

// Initialisation AudioManager et TimerBomb
let audioManager;
window.addEventListener('DOMContentLoaded', () => {
    if (typeof AudioManager !== 'undefined') {
        audioManager = new AudioManager();
        audioManager.playPrincipalMusic();
    }
    // Timer de 10 secondes pour tirer
    window.gameTimer = new TimerBomb(10000, onTimeUp);
    window.gameTimer.start();
});

function onTimeUp() {
    // Temps écoulé, fin de partie
    if (audioManager) audioManager.playGameOverSound();
    alert('Temps écoulé !');
    // Optionnel : reset ou reload
    window.location.reload();
}

function shootBall() {
    if (ball.isDragging) {
        if (audioManager) audioManager.playButtonSound();
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const power = Math.min(distance / 10, ball.maxPower);

        const vx = (dx / distance) * power * -1;
        const vy = (dy / distance) * power * -1;

        // Animation du tir
        const animation = setInterval(() => {
            ball.x += vx;
            ball.y += vy;
            // Vérifier si le ballon est dans le but
            if (
                ball.x + ball.radius > goal.x &&
                ball.x - ball.radius < goal.x + goal.width &&
                ball.y + ball.radius > goal.y &&
                ball.y - ball.radius < goal.y + goal.height
            ) {
                clearInterval(animation);
                if (audioManager) audioManager.playWinSound();
                alert('But !');
                window.gameTimer.stop();
                setTimeout(() => window.location.reload(), 1500);
            }
            // Hors du terrain
            if (
                ball.x < 0 || ball.x > canvas.width ||
                ball.y < 0 || ball.y > canvas.height
            ) {
                clearInterval(animation);
                if (audioManager) audioManager.playLoseSound();
                alert('Raté !');
                window.gameTimer.stop();
                setTimeout(() => window.location.reload(), 1500);
            }
            update();
        }, 16);
    }
}

function resetBall() {
    ball.x = 100;
    ball.y = 250;
    ball.isDragging = false;
}

canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    const distance = Math.sqrt(
        Math.pow(mouseX - ball.x, 2) + Math.pow(mouseY - ball.y, 2)
    );

    if (distance <= ball.radius) {
        ball.isDragging = true;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (ball.isDragging) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        update();
    }
});

canvas.addEventListener("mouseup", () => {
    if (ball.isDragging) {
        shootBall();
        ball.isDragging = false;
    }
});

update();
inactivity();