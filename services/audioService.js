import { engineSounds } from '@/constants/carQuestions';

let currentPlayer = null;
let AudioModule = null;

try {
    const ExpoAudio = require('expo-audio');
    AudioModule = ExpoAudio.AudioModule;
} catch (e) {
    console.warn("[audioService] Module natif expo-audio non disponible :", e?.message);
}

/**
 * Joue un son à partir de son identifiant défini dans carQuestions.js
 * @param {string} soundKey - ex: 'v8', 'cheering', 'v6', etc.
 */
export async function playSound(soundKey) {
    try {
        const soundSource = engineSounds[soundKey];
        if (!soundSource) {
            console.warn(`[audioService] Aucun son configuré pour la clé : "${soundKey}"`);
            return;
        }

        // Arrêter le son précédent si déjà en cours
        await stopSound();

        if (AudioModule?.AudioPlayer) {
            currentPlayer = new AudioModule.AudioPlayer(soundSource);
            currentPlayer.play();
        } else {
            console.log(`[audioService Mock] Lecture du son : "${soundKey}"`);
        }
    } catch (error) {
        console.warn(`[audioService] Erreur lors de la lecture du son "${soundKey}" :`, error);
    }
}

/**
 * Arrête le son en cours de lecture
 */
export async function stopSound() {
    try {
        if (currentPlayer) {
            if (typeof currentPlayer.pause === 'function') {
                currentPlayer.pause();
            }
            if (typeof currentPlayer.remove === 'function') {
                currentPlayer.remove();
            }
            currentPlayer = null;
        }
    } catch (error) {
        console.warn("[audioService] Erreur lors de l'arrêt du son :", error);
    }
}

/**
 * Libère les ressources du son en cours
 */
export async function releaseSound() {
    await stopSound();
}
