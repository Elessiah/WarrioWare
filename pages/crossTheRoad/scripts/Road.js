import gameConfig from './gameConfig.js';
import { Car } from './Car.js';

// Classe pour gérer les routes
export class Road {
    constructor(yPosition, direction) {
        this.y = yPosition;
        this.height = gameConfig.roadHeight;
        this.direction = direction;
        this.cars = [];
        this.spawnTimer = 0;
        this.spawnInterval = 40 + Math.random() * 30;

        this.carColors = ['#e74c3c', '#9b59b6', '#f1c40f', '#e67e22', '#3498db'];
    }

    draw(ctx) {
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
            this.spawnInterval = 35 + Math.random() * 30;
        }

        // Mise à jour des voitures
        this.cars.forEach(car => car.update());

        // Supprimer les voitures hors écran
        this.cars = this.cars.filter(car => !car.isOffScreen());
    }

    drawCars(ctx) {
        this.cars.forEach(car => car.draw(ctx));
    }

    reset() {
        this.cars = [];
        this.spawnTimer = 0;
    }
}

