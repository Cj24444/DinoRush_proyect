import { ref } from "vue"

const HIGH_SCORE_KEY = "dinorush_high_score"

/**
 * useHighScore
 * Encapsula la lógica de lectura y escritura del récord histórico
 * usando localStorage, de modo que el valor persiste entre sesiones
 * del navegador.
 *
 * Antes de esta refactorización, el highScore vivía como ref(0) en
 * usingGame.js y se perdía al recargar o cerrar el navegador.
 */
export function useHighScore() {
    // Inicializar desde localStorage al montar el composable.
    // Si no existe la clave, parseInt devuelve NaN y el || 0 lo normaliza a 0.
    const highScore = ref(parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0)

    /**
     * Actualiza el récord si el puntaje actual lo supera,
     * y persiste el nuevo valor en localStorage.
     * @param {number} currentScore - puntaje de la partida en curso
     */
    function updateHighScore(currentScore) {
        if (currentScore > highScore.value) {
            highScore.value = currentScore
            localStorage.setItem(HIGH_SCORE_KEY, highScore.value)
        }
    }

    /**
     * Resetea el récord a 0 (útil para tests o botón de reset futuro).
     */
    function resetHighScore() {
        highScore.value = 0
        localStorage.removeItem(HIGH_SCORE_KEY)
    }

    return {
        highScore,
        updateHighScore,
        resetHighScore,
    }
}
