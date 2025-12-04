/**
 * Timer Bomb - Style WarioWare
 * Timer visuel avec une bombe dont la mèche se consume
 */
class TimerBomb {
    constructor(duration = 5000, onTimeUp = null) {
        this.duration = duration; // Durée en millisecondes
        this.onTimeUp = onTimeUp; // Callback quand le temps est écoulé
        this.isRunning = false;
        this.isPaused = false;
        this.startTime = null;
        this.remainingTime = duration;
        this.animationFrameId = null;

        // Créer le container du timer
        this.createTimerElement();
    }

    /**
     * Créer l'élément HTML du timer
     */
    createTimerElement() {
        // Vérifier si un timer existe déjà
        const existingTimer = document.getElementById('wario-timer-bomb');
        if (existingTimer) {
            existingTimer.remove();
        }

        // Créer le container principal
        this.container = document.createElement('div');
        this.container.id = 'wario-timer-bomb';
        this.container.className = 'wario-timer-bomb';

        // Créer la mèche (ligne qui se réduit)
        this.fuse = document.createElement('div');
        this.fuse.className = 'wario-timer-fuse';

        // Créer la bombe
        this.bomb = document.createElement('div');
        this.bomb.className = 'wario-timer-bomb-icon';
        this.bomb.innerHTML = '💣';

        // Créer l'explosion (cachée initialement)
        this.explosion = document.createElement('div');
        this.explosion.className = 'wario-timer-explosion';
        this.explosion.innerHTML = '💥';
        this.explosion.style.display = 'none';

        // Assembler les éléments
        this.container.appendChild(this.fuse);
        this.container.appendChild(this.bomb);
        this.container.appendChild(this.explosion);

        // Ajouter au body
        document.body.appendChild(this.container);
    }

    /**
     * Démarrer le timer
     */
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.isPaused = false;
        this.startTime = Date.now();

        // Reset visuel
        this.fuse.style.width = '100%';
        this.fuse.style.transition = 'none';
        this.bomb.style.display = 'block';
        this.explosion.style.display = 'none';
        this.container.classList.remove('exploded');

        // Démarrer l'animation
        requestAnimationFrame(() => {
            this.fuse.style.transition = `width ${this.duration}ms linear`;
            this.fuse.style.width = '0%';
        });

        // Démarrer la mise à jour
        this.update();
    }

    /**
     * Mettre à jour le timer
     */
    update() {
        if (!this.isRunning || this.isPaused) return;

        const elapsed = Date.now() - this.startTime;
        this.remainingTime = Math.max(0, this.duration - elapsed);

        // Calculer le pourcentage restant
        const percentage = (this.remainingTime / this.duration) * 100;

        // Animation de tremblement dans les dernières secondes
        if (this.remainingTime < 2000) {
            this.bomb.classList.add('shaking');
        }

        // Vérifier si le temps est écoulé
        if (this.remainingTime <= 0) {
            this.explode();
            return;
        }

        // Continuer la mise à jour
        this.animationFrameId = requestAnimationFrame(() => this.update());
    }

    /**
     * Faire exploser la bombe
     */
    explode() {
        this.isRunning = false;

        // Animation d'explosion
        this.bomb.style.display = 'none';
        this.explosion.style.display = 'block';
        this.container.classList.add('exploded');

        // Jouer le son de défaite si le gestionnaire audio est disponible
        if (typeof audioManager !== 'undefined') {
            audioManager.playLoseSound();
        }

        // Appeler le callback
        if (this.onTimeUp && typeof this.onTimeUp === 'function') {
            setTimeout(() => {
                this.onTimeUp();
            }, 500);
        }
    }

    /**
     * Arrêter le timer (succès)
     */
    stop() {
        this.isRunning = false;
        this.isPaused = false;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        // Animation de succès
        this.container.classList.add('success');
        this.bomb.innerHTML = '✨';

        // Jouer le son de victoire si disponible
        if (typeof audioManager !== 'undefined') {
            audioManager.playWinSound();
        }
    }

    /**
     * Mettre en pause
     */
    pause() {
        if (!this.isRunning || this.isPaused) return;

        this.isPaused = true;
        const elapsed = Date.now() - this.startTime;
        this.remainingTime = Math.max(0, this.duration - elapsed);

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    /**
     * Reprendre
     */
    resume() {
        if (!this.isRunning || !this.isPaused) return;

        this.isPaused = false;
        this.startTime = Date.now() - (this.duration - this.remainingTime);
        this.update();
    }

    /**
     * Détruire le timer
     */
    destroy() {
        this.isRunning = false;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        if (this.container && this.container.parentNode) {
            this.container.remove();
        }
    }

    /**
     * Obtenir le temps restant en secondes
     */
    getRemainingSeconds() {
        return Math.ceil(this.remainingTime / 1000);
    }

    /**
     * Réinitialiser le timer
     */
    reset() {
        this.stop();
        this.remainingTime = this.duration;

        // Reset visuel
        this.fuse.style.width = '100%';
        this.bomb.innerHTML = '💣';
        this.bomb.style.display = 'block';
        this.explosion.style.display = 'none';
        this.container.classList.remove('exploded', 'success');
        this.bomb.classList.remove('shaking');
    }
}

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimerBomb;
}

