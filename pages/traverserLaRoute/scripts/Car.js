import gameConfig from './gameConfig.js';

// Classe pour les voitures
export class Car {
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

    draw(ctx) {
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

