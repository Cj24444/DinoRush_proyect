import { ref } from "vue"

/**
 * useObstacles
 * Encapsula la lógica de posición, movimiento y tipo visual del obstáculo.
 * Extraído de usingGame.js para separar responsabilidades:
 * usingGame.js orquesta el loop, este composable maneja los obstáculos.
 *
 * @param {import('vue').Ref<number>} speed - ref reactiva a la velocidad actual
 */
export function useObstacles(speed) {
    const obstacleX = ref(900)
    const currentCactusType = ref(Math.floor(Math.random() * 3) + 1)

    /**
     * Avanza el obstáculo un frame según la velocidad actual.
     * Si sale por la izquierda, lo reposita aleatoriamente a la derecha
     * y cambia el tipo de cactus.
     * @returns {boolean} true si el obstáculo fue superado (suma punto)
     */
    function moveObstacle() {
        obstacleX.value -= speed.value

        if (obstacleX.value < -75) {
            obstacleX.value = 900 + Math.random() * 300
            currentCactusType.value = Math.floor(Math.random() * 3) + 1
            return true // obstáculo superado → sumar punto
        }

        return false
    }

    /**
     * Resetea el obstáculo a su posición y tipo iniciales.
     */
    function resetObstacle() {
        obstacleX.value = 900
        currentCactusType.value = Math.floor(Math.random() * 3) + 1
    }

    return {
        obstacleX,
        currentCactusType,
        moveObstacle,
        resetObstacle,
    }
}
