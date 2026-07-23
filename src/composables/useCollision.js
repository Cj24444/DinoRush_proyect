/**
 * useCollision
 * Encapsula la lógica de detección de colisión entre el jugador y el obstáculo.
 * Extraído de usingGame.js para aislar esta responsabilidad en un módulo propio,
 * lo que facilita ajustar los hitboxes sin tocar el loop principal del juego.
 *
 * Los valores de hitbox están calibrados para los sprites actuales del proyecto:
 *   - Jugador: posición fija horizontal en x=[145, 175]
 *   - Obstáculo: 75px de ancho con 15px de margen interior
 *   - Colisión vertical: cuando el jugador está a 125px o menos del suelo
 */
export function useCollision() {
    // Hitbox horizontal del jugador (posición fija en el canvas)
    const PLAYER_LEFT = 145
    const PLAYER_RIGHT = 175

    // Margen interior del obstáculo para que el hitbox sea más preciso
    const OBSTACLE_MARGIN = 15
    const OBSTACLE_WIDTH = 75

    // Altura máxima del jugador para que la colisión sea válida verticalmente
    const COLLISION_HEIGHT = 125

    /**
     * Detecta si el jugador colisionó con el obstáculo.
     * @param {number} obstacleX - posición horizontal actual del obstáculo
     * @param {number} playerY   - posición vertical actual del jugador (desde el suelo)
     * @returns {boolean} true si hay colisión
     */
    function checkCollision(obstacleX, playerY) {
        const obstacleLeft = obstacleX + OBSTACLE_MARGIN
        const obstacleRight = obstacleX + OBSTACLE_WIDTH

        const horizontal =
            obstacleRight > PLAYER_LEFT &&
            obstacleLeft < PLAYER_RIGHT

        const vertical = playerY <= COLLISION_HEIGHT

        return horizontal && vertical
    }

    return {
        checkCollision,
    }
}
