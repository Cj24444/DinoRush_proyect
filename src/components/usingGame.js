import { ref } from "vue"

const GROUND = 40

export function useGame() {

    const playerY = ref(GROUND)
    const velocity = ref(0)
    const obstacleX = ref(900)
    const gameOver = ref(false)
    const gravity = -0.7
    const jumpForce = 16
    let jumping = false

    let animationFrameId = null

    const score = ref(0)
    const highScore = ref(0)
    const speed = ref(6)

    const dinoSpriteIndex = ref(2) //1 izq, 3 der, 2 parado, 4 muerte
    const currentCactusType = ref(1) 
    let animationTimer = 0

    function jump() {
        if (jumping || gameOver.value) return
        velocity.value = jumpForce
        jumping = true
        dinoSpriteIndex.value = 2
    }
    function restart(){
        cancelAnimationFrame(animationFrameId)
        playerY.value = GROUND
        velocity.value = 0
        obstacleX.value = 900
        jumping = false
        gameOver.value = false

        score.value = 0
        speed.value = 6

        dinoSpriteIndex.value = 2
        currentCactusType.value = Math.floor(Math.random() * 3) + 1

        update()
    }

    function checkCollision(){

        const playerLeft = 145
        const playerRight = 175

        const obstacleLeft = obstacleX.value +15
        const obstacleRight = obstacleX.value + 75

        const horizontal =
            obstacleRight > playerLeft &&
            obstacleLeft < playerRight

        const vertical =
            playerY.value <= 125

        if(horizontal && vertical){
            dinoSpriteIndex.value = 4
            gameOver.value = true

        }
    }

    function animateDino() {
        if (jumping) {
            dinoSpriteIndex.value = 2 // t pose 
            return
        }

        animationTimer++
        // Cambia de pierna frames 
        if (animationTimer % 16 === 0) {
            dinoSpriteIndex.value = dinoSpriteIndex.value === 1 ? 3 : 1
        }
    }

    function update() {
        checkCollision()

        if(gameOver.value){
            return
        }

        animateDino()

        velocity.value += gravity
        playerY.value += velocity.value

        if (playerY.value <= GROUND) {
            playerY.value = GROUND
            velocity.value = 0
            jumping = false
        }

        obstacleX.value -= speed.value

        if(obstacleX.value < -75){
            obstacleX.value = 900 + Math.random() * 300

            currentCactusType.value = Math.floor(Math.random() * 3) + 1

            score.value++
            speed.value += 0.15

            if(score.value > highScore.value){
                highScore.value = score.value
            }
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
        stop
    }

}