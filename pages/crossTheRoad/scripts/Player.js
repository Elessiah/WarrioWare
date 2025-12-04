import gameConfig from './gameConfig.js';

// Classe pour le joueur
export class Player {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = gameConfig.canvasWidth / 2 - this.width / 2;
        this.y = gameConfig.canvasHeight - gameConfig.safeZoneHeight / 2 - this.height / 2;
        this.targetY = this.y;
        this.isMoving = false;
    }

    draw(ctx) {
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

    reset() {
        this.y = gameConfig.canvasHeight - gameConfig.safeZoneHeight / 2 - this.height / 2;
        this.targetY = this.y;
        this.isMoving = false;
    }
}

