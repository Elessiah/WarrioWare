// Liste de mots improbables :
// carquois
// hallebarde
// taupinembours
// cucurbitacée
// bassinet
// estoc
// monolythe
// esperanto
// antipode
// pupitre
// vestibule
// auriculaire
// tambouriner
// ornytorinque
// callypige
// usurpation
// foutriquet
// cubitus
// cuticule
// saperlipopète
// TODO à continuer

// Récupération du canvas et du contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables du jeu
let ball = {
    x: 100,
    y: 250,
    radius: 15,
    color: "red",
    isDragging: false,
    power: 0,
    maxPower: 20,
};

// Position du buuuuuuuuuuut
const goal = {
    x: 750,
    y: 200,
    width: 50,
    height: 100,
    color: "white",
};

// Position de la souris (pas très cruelty free)
let mouseX = 0;
let mouseY = 0;

// Fonction pour desssiner un ballon de type footballistique
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Fonction pour dessiner le buuuuuuuuuut
function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);
}

// commentaire générée automatiquement par ChatGPT
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

// bon t'as compris le principe tu sais lire frérot
function shootBall() {
    if (ball.isDragging) {
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

            // Vérification si le ballon est dans le but
            if (
                ball.x + ball.radius > goal.x &&
                ball.x - ball.radius < goal.x + goal.width &&
                ball.y + ball.radius > goal.y &&
                ball.y - ball.radius < goal.y + goal.height
            ) {
                alert("Champion cousin !");
                clearInterval(animation);
                iRecupTheBall();
            }

            // Vérification si le ballon sort du canvas
            if (
                ball.x < 0 ||
                ball.x > canvas.width ||
                ball.y < 0 ||
                ball.y > canvas.height
            ) {
                alert("C'est une passe pour Thomas Pesquier ou quoi ?");
                clearInterval(animation);
                iRecupTheBall();
            }

            update();
        }, 16);
    }
}

// I recup the ball (personne aura la rèf)
function iRecupTheBall() {
    ball.x = 100;
    ball.y = 250;
    ball.isDragging = false;
}

// Événements de la souris
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

// Okayyyyy let's go !
update();
