/**
 * Initialisation globale du système audio
 * Ce fichier initialise l'instance globale et configure les événements
 */

// Créer une instance globale du gestionnaire audio
const audioManager = new AudioManager();

/**
 * Initialiser les événements audio au chargement du document
 */
function initAudioEvents() {
    // Démarrer la musique principale
    audioManager.playPrincipalMusic();

    // Ajouter le son de clic à tous les boutons
    addButtonClickSounds();

    // Ajouter le son de clic aux éléments cliquables
    addClickableSounds();
}

/**
 * Ajouter les sons de clic aux boutons
 */
function addButtonClickSounds() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            audioManager.playButtonSound();
        });
    });
}

/**
 * Ajouter les sons de clic aux éléments cliquables (input, liens, etc.)
 */
function addClickableSounds() {
    const clickableElements = document.querySelectorAll('input[type="button"], input[type="submit"], a');
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            audioManager.playButtonSound();
        });
    });
}

// Initialiser automatiquement au chargement du document
document.addEventListener('DOMContentLoaded', initAudioEvents);

// Export pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { audioManager, initAudioEvents };
}

