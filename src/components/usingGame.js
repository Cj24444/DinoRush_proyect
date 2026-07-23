import { ref } from "vue"
import { useHighScore } from "../composables/useHighScore"
import { useObstacles } from "../composables/useObstacles"
import { useCollision } from "../composables/useCollision"

const GROUND = 40

/**
 * useGame
 * Composable principal que orquesta el loop del juego.
 * Tras la refactorización, delega responsabilidades específicas:
 *   - useHighScore  → persistencia del récord en localStorage
 *   - useObstacles  → posición, movimiento y tipo visual del obstáculo
 *   - useCollision  → detección de colisión jugador-obstáculo
 *
 * usingGame.js conserva únicamente la física del jugador, la animación
 * del dino y el control del loop (requestAnimationFrame).
 */
export function useGame() {

    // --- Física del jugador ---
    const playerY = ref(GROUND)
    const velocity = ref(0)
    const gravity = -0.7
    const jumpForce = 16
    let jumping = false

    // --- Estado general ---
    const gameOver = ref(false)
    const score = ref(0)
    const speed = ref(6)
    let animationFrameId = null

    // --- Animación del dino ---
    const dinoSpriteIndex = ref(2) // 1 izq, 3 der, 2 parado, 4 muerte
    let animationTimer = 0

    // --- Composables externos ---
    const { highScore, updateHighScore } = useHighScore()
    const { obstacleX, currentCactusType, moveObstacle, resetObstacle } = useObstacles(speed)
    const { checkCollision } = useCollision()

    // -------------------------------------------------------------------------

    function jump() {
        if (jumping || gameOver.value) return
        velocity.value = jumpForce
        jumping = true
        dinoSpriteIndex.value = 2
    }

    function restart() {
        cancelAnimationFrame(animationFrameId)

        // Resetear estado del jugador
        playerY.value = GROUND
        velocity.value = 0
        jumping = false
        gameOver.value = false

        // Resetear puntaje y velocidad
        score.value = 0
        speed.value = 6

        // Resetear animación
        dinoSpriteIndex.value = 2

        // Resetear obstáculo (delegado a useObstacles)
        resetObstacle()

        update()
    }

    function animateDino() {
        if (jumping) {
            dinoSpriteIndex.value = 2 // t-pose en el aire
            return
        }
        animationTimer++
        if (animationTimer % 16 === 0) {
            dinoSpriteIndex.value = dinoSpriteIndex.value === 1 ? 3 : 1
        }
    }

    function update() {
        // Colisión (delegada a useCollision)
        if (checkCollision(obstacleX.value, playerY.value)) {
            dinoSpriteIndex.value = 4
            gameOver.value = true
        }

        if (gameOver.value) return

        // Animación del dino
        animateDino()

        // Física del jugador
        velocity.value += gravity
        playerY.value += velocity.value

        if (playerY.value <= GROUND) {
            playerY.value = GROUND
            velocity.value = 0
            jumping = false
        }

        // Mover obstáculo (delegado a useObstacles)
        // moveObstacle() devuelve true cuando el obstáculo fue superado
        const passed = moveObstacle()
        if (passed) {
            score.value++
            speed.value += 0.15
            // Actualizar récord persistente (delegado a useHighScore)
            updateHighScore(score.value)
        }

        animationFrameId = requestAnimationFrame(update)
    }

    function stop() {
        cancelAnimationFrame(animationFrameId)
    }

    update()

    return {
        playerY,
        obstacleX,
        gameOver,
        jump,
        restart,
        score,
        highScore,
        dinoSpriteIndex,
        currentCactusType,
        stop,
    }
}
