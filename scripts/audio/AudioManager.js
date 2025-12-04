/**
 * Gestionnaire audio global pour l'application
 */
class AudioManager {
    constructor() {
        // Chemins des fichiers audio
        const audioPaths = {
            principal: 'audios/principal-song.mp3',
            buttonClick: 'audios/button-click.mp3',
            gameOver: 'audios/game-over-song.mp3',
            win: 'audios/win.mp3',
            lose: 'audios/lose.mp3'
        };

        // Initialiser les instances audio
        this.principalAudio = new Audio(audioPaths.principal);
        this.buttonAudio = new Audio(audioPaths.buttonClick);
        this.gameOverAudio = new Audio(audioPaths.gameOver);
        this.winAudio = new Audio(audioPaths.win);
        this.loseAudio = new Audio(audioPaths.lose);

        // Configurer la musique principale
        this.principalAudio.loop = true;
        this.principalAudio.volume = 0.5;

        // Configurer le volume des effets sonores
        this.buttonAudio.volume = 0.7;
        this.gameOverAudio.volume = 0.6;
        this.winAudio.volume = 0.8;
        this.loseAudio.volume = 0.8;

        this.isInitialized = false;
    }

    /**
     * Démarrer la musique principale
     */
    playPrincipalMusic() {
        if (!this.isInitialized) {
            this.principalAudio.play().catch(e => {
                console.log('Lecture audio autorisée', e);
            });
            this.isInitialized = true;
        }
    }

    /**
     * Jouer le son de clic du bouton
     */
    playButtonSound() {
        this.buttonAudio.currentTime = 0;
        this.buttonAudio.play().catch(e => {
            console.log('Son de bouton non joué', e);
        });
    }

    /**
     * Jouer le son de victoire
     */
    playWinSound() {
        this.winAudio.currentTime = 0;
        this.winAudio.play().catch(e => {
            console.log('Son de victoire non joué', e);
        });
    }

    /**
     * Jouer le son de défaite
     */
    playLoseSound() {
        this.loseAudio.currentTime = 0;
        this.loseAudio.play().catch(e => {
            console.log('Son de défaite non joué', e);
        });
    }

    /**
     * Jouer la musique de fin de jeu
     */
    playGameOverSound() {
        // Arrêter la musique principale
        this.principalAudio.pause();
        this.principalAudio.currentTime = 0;

        // Jouer la musique de fin
        this.gameOverAudio.currentTime = 0;
        this.gameOverAudio.play().catch(e => {
            console.log('Son de fin non joué', e);
        });
    }

    /**
     * Arrêter tous les sons
     */
    stopAll() {
        this.principalAudio.pause();
        this.buttonAudio.pause();
        this.gameOverAudio.pause();
        this.winAudio.pause();
        this.loseAudio.pause();
    }

    /**
     * Reprendre la musique principale
     */
    resumePrincipalMusic() {
        this.principalAudio.play().catch(e => {
            console.log('Reprise audio autorisée', e);
        });
    }

    /**
     * Définir le volume global
     */
    setVolume(volume) {
        const vol = Math.max(0, Math.min(1, volume));
        this.principalAudio.volume = vol * 0.5;
        this.buttonAudio.volume = vol * 0.7;
        this.gameOverAudio.volume = vol * 0.6;
        this.winAudio.volume = vol * 0.8;
        this.loseAudio.volume = vol * 0.8;
    }
}

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioManager;
}

