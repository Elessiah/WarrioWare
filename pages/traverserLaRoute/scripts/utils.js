import gameConfig from './gameConfig.js';

// Utilitaires pour le rendu graphique
export function drawBackground(ctx) {
    // Zone de départ (herbe)
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(0, gameConfig.canvasHeight - gameConfig.safeZoneHeight,
                 gameConfig.canvasWidth, gameConfig.safeZoneHeight);

    // Zone d'arrivée (herbe plus claire)
    ctx.fillStyle = '#9ccc65';
    ctx.fillRect(0, 0, gameConfig.canvasWidth, gameConfig.safeZoneHeight);

    // Texte zone de départ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DÉPART', gameConfig.canvasWidth / 2, gameConfig.canvasHeight - 40);

    // Texte zone d'arrivée
    ctx.fillText('ARRIVÉE', gameConfig.canvasWidth / 2, 50);
}

// Détection de collision
export function checkCollision(player, car) {
    const p = player.getBounds();
    const c = car.getBounds();

    return !(p.x + p.width < c.x ||
             p.x > c.x + c.width ||
             p.y + p.height < c.y ||
             p.y > c.y + c.height);
}

