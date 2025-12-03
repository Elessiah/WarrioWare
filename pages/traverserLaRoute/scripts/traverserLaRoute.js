const gameConfig = {
    canvasWidth: 800,
    canvasHeight: 600,
    playerSpeed: 8,
    safeZoneHeight: 80,
    roadHeight: 120,
    numberOfRoads: 2
};

// Récupération des éléments DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables globales du jeu
let gameState = {
    isRunning: false,
    startTime: null,
    gameResult: null
};

// Classe pour le joueur
class Player {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = gameConfig.canvasWidth / 2 - this.width / 2;
        this.y = gameConfig.canvasHeight - gameConfig.safeZoneHeight / 2 - this.height / 2;
        this.targetY = this.y;
        this.isMoving = false;
    }

    draw() {
        // Dessiner le joueur (petit bonhomme simplifié)
        ctx.fillStyle = '#3498db';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Tête
        ctx.fillStyle = '#f39c12';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + 8, 8, 0, Math.PI * 2);
        ctx.fill();
    }

    moveUp() {
        if (!this.isMoving && this.targetY > 0) {
            this.targetY -= gameConfig.playerSpeed * 5;
            if (this.targetY < 0) this.targetY = 0;
            this.isMoving = true;
        }
    }

    moveDown() {
        if (!this.isMoving && this.targetY < gameConfig.canvasHeight - this.height) {
            this.targetY += gameConfig.playerSpeed * 5;
            if (this.targetY > gameConfig.canvasHeight - this.height) {
                this.targetY = gameConfig.canvasHeight - this.height;
            }
            this.isMoving = true;
        }
    }

    update() {
        // Déplacement fluide vers la cible
        if (Math.abs(this.y - this.targetY) > 2) {
            if (this.y < this.targetY) {
                this.y += gameConfig.playerSpeed;
            } else {
                this.y -= gameConfig.playerSpeed;
            }
        } else {
            this.y = this.targetY;
            this.isMoving = false;
        }
    }

    hasReachedEnd() {
        return this.y <= gameConfig.safeZoneHeight;
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

// Classe pour les voitures
class Car {
    constructor(y, direction, speed, color) {
        this.width = 50;
        this.height = 30;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.color = color;

        if (direction === 1) {
            this.x = -this.width;
        } else {
            this.x = gameConfig.canvasWidth;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Fenêtres
        ctx.fillStyle = '#34495e';
        ctx.fillRect(this.x + 5, this.y + 5, 15, 15);
        ctx.fillRect(this.x + this.width - 20, this.y + 5, 15, 15);
    }

    update() {
        this.x += this.speed * this.direction;
    }

    isOffScreen() {
        if (this.direction === 1) {
            return this.x > gameConfig.canvasWidth + 5;
        } else {
            return this.x < -this.width;
        }
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

// Classe pour gérer les routes
class Road {
    constructor(yPosition, direction) {
        this.y = yPosition;
        this.height = gameConfig.roadHeight;
        this.direction = direction;
        this.cars = [];
        this.spawnTimer = 0;
        this.spawnInterval = 40 + Math.random() * 30;

        this.carColors = ['#e74c3c', '#9b59b6', '#f1c40f', '#e67e22', '#3498db'];
    }

    draw() {
        // Route (asphalte)
        ctx.fillStyle = '#34495e';
        ctx.fillRect(0, this.y, gameConfig.canvasWidth, this.height);

        // Lignes de la route
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(0, this.y + this.height / 2);
        ctx.lineTo(gameConfig.canvasWidth, this.y + this.height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    update() {
        // Spawn de nouvelles voitures
        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval) {
            const speed = 2.5 + Math.random() * 2.5;
            const color = this.carColors[Math.floor(Math.random() * this.carColors.length)];
            const car = new Car(this.y + (this.height - 30) / 2, this.direction, speed, color);
            this.cars.push(car);
            this.spawnTimer = 0;
            this.spawnIntervl = 35 + Math.random() * 30;
        }

        // Mise à jour des voitures
        this.cars.forEach(car => car.update());

        // Supprimer les voitures hors écran
        this.cars = this.cars.filter(car => !car.isOffScreen());
    }

    drawCars() {
        this.cars.forEach(car => car.draw());
    }
}

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

// Détection de collision
function checkCollision(player, car) {
    const p = player.getBounds();
    const c = car.getBounds();

    return !(p.x + p.width < c.x ||
             p.x > c.x + c.width ||
             p.y + p.height < c.y ||
             p.y > c.y + c.height);
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

// Dessiner l'arrière-plan
function drawBackground() {
    // Zone de départ (herbe)
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(0, gameConfig.canvasHeight - gameConfig.safeZoneHeight,
                 gameConfig.canvasWidth, gameConfig.safeZoneHeight);

    // Zone d'arrivée (herbe plus claire)
    ctx.fillStyle = '#9ccc65';
    ctx.fillRect(0, 0, gameConfig.canvasWidth, gameConfig.safeZoneHeight);

    // Texte zone de départ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '16px Aria';
    ctx.textAlign = 'center';
    ctx.fillText('DÉPART', gameConfig.canvasWidth / 2, gameConfig.canvasHeight - 40);

    // Texte zone d'arrivée
    ctx.fillText('ARRIVÉE', gameConfig.canvasWidth / 2, 50);
}

// Boucle de jeu principale
function gameLoop() {
    if (!gameState.isRunning) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, gameConfig.canvasWidth, gameConfig.canvasHeight);

    // Dessiner l'arrière-plan
    drawBackground();

    // Dessiner et mettre à jour les routes
    roads.forEach(road => {
        road.draw();
        road.update();
    });

    // Dessiner les voitures
    roads.forEach(road => road.drawCars());

    // Mettre à jour et dessiner le joueur
    player.update();
    player.draw();

    // Vérifier si le joueur a gagné
    if (player.hasReachedEnd()) {
        gameState.isRunning = false;
        gameState.gameResult = 'success';

        window.dispatchEvent(new CustomEvent('gameEnded', {
            detail: { result: 'success', message: 'Bravo ! Vous avez traversé toutes les routes !' }
        }));
        return;
    }

    // Vérifier les collisions
    if (checkAllCollisions()) {
        gameState.isRunning = false;
        gameState.gameResult = 'fail';

        // Informer le système principal
        window.dispatchEvent(new CustomEvent('gameEnded', {
            detail: { result: 'fail', message: 'Collision avec une voiture !' }
        }));
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
    player.y = gameConfig.canvasHeight - gameConfig.safeZoneHeight / 2 - player.height / 2;
    player.targetY = player.y;
    player.isMoving = false;

    // Vider les routes
    roads.forEach(road => {
        road.cars = [];
        road.spawnTimer = 0;
    });

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
