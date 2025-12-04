/**
 * Configuration des chemins audio
 * Centralisé pour faciliter les modifications
 */
const AudioConfig = {
    paths: {
        principal: 'audios/principal-song.mp3',
        buttonClick: 'audios/button-click.mp3',
        gameOver: 'audios/game-over-song.mp3',
        win: 'audios/win.mp3',
        lose: 'audios/lose.mp3'
    },

    volumes: {
        principal: 0.5,
        buttonClick: 0.7,
        gameOver: 0.6,
        win: 0.8,
        lose: 0.8
    }
};

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AudioConfig;
}

