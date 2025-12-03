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
// diatribe
// transistor
// médiator
// Mulhouse
// TODO à continuer

// Init du terrain de basketball
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variables du jeu de paume
let balleDePingPong = {
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
    ctx.arc(balleDePingPong.x, balleDePingPong.y, balleDePingPong.radius, 0, Math.PI * 2);
    ctx.fillStyle = balleDePingPong.color;
    ctx.fill();
    ctx.closePath();
}

// Fonction pour dessiner le buuuuuuuuuut
function drawGoal() {
    // potos
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);

    // filet o fish
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


// commentaire générée automatiquement par ChatGPT (à enlever avant la MR)
function drawPowerLine() {
    if (balleDePingPong.isDragging) {
        ctx.beginPath();
        ctx.moveTo(balleDePingPong.x, balleDePingPong.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

function okayyyLetsGo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGoal();
    drawBall();
    drawPowerLine();
}

// bon t'as compris le principe tu sais lire frérot
function shootBall() {
    if (balleDePingPong.isDragging) {
        const dx = balleDePingPong.x - mouseX;
        const dy = balleDePingPong.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const power = Math.min(distance / 10, balleDePingPong.maxPower);

        const vx = (dx / distance) * power * -1;
        const vy = (dy / distance) * power * -1;

        // Animation du tir
        const animation = setInterval(() => {
            balleDePingPong.x += vx;
            balleDePingPong.y += vy;

            // Vérification si le ballon est dans le but
            if (
                balleDePingPong.x + balleDePingPong.radius > goal.x &&
                balleDePingPong.x - balleDePingPong.radius < goal.x + goal.width &&
                balleDePingPong.y + balleDePingPong.radius > goal.y &&
                balleDePingPong.y - balleDePingPong.radius < goal.y + goal.height
            ) {
                alert("Champion cousin !");
                clearInterval(animation);
                iRecupTheBall();
            }

            // Vérification si le ballon sort du canvas
            if (
                balleDePingPong.x < 0 ||
                balleDePingPong.x > canvas.width ||
                balleDePingPong.y < 0 ||
                balleDePingPong.y > canvas.height
            ) {
                alert("C'est une passe pour Thomas Pesquier ou quoi ?");
                clearInterval(animation);
                iRecupTheBall();
            }

            okayyyLetsGo();
        }, 16);
    }
}

// I recup the balleDePingPong (personne aura la rèf)
function iRecupTheBall() {
    balleDePingPong.x = 100;
    balleDePingPong.y = 250;
    balleDePingPong.isDragging = false;
}

// une souris vert, qui courrait dans l'herbe
// je l'attrape par la queue, je la montre à ces messieurs
canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    const distance = Math.sqrt(
        Math.pow(mouseX - balleDePingPong.x, 2) + Math.pow(mouseY - balleDePingPong.y, 2)
    );

    if (distance <= balleDePingPong.radius) {
        balleDePingPong.isDragging = true;
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (balleDePingPong.isDragging) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        okayyyLetsGo();
    }
});

canvas.addEventListener("mouseup", () => {
    if (balleDePingPong.isDragging) {
        shootBall();
        balleDePingPong.isDragging = false;
    }
});

// Okayyyyy let's go !
okayyyLetsGo();
