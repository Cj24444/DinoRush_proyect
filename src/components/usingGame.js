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

    function jump() {

        if (jumping) return
        velocity.value = jumpForce
        jumping = true
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

        update()
    }

    function checkCollision(){

        const playerLeft = 100
        const playerRight = 140

        const obstacleLeft = obstacleX.value
        const obstacleRight = obstacleX.value + 30

        const horizontal =
            obstacleRight > playerLeft &&
            obstacleLeft < playerRight

        const vertical =
            playerY.value <= 70

        if(horizontal && vertical){
            gameOver.value = true

        }
    }

    function update() {
        if(gameOver.value){
            return
        }

        velocity.value += gravity
        playerY.value += velocity.value

        if (playerY.value <= GROUND) {
            playerY.value = GROUND
            velocity.value = 0
            jumping = false
        }

        obstacleX.value -= speed.value

        if(obstacleX.value < -30){
            obstacleX.value = 900 + Math.random() * 300

            score.value++
            speed.value += 0.15

            if(score.value > highScore.value){
                highScore.value = score.value
            }
        }

        checkCollision()
        animationFrameId = requestAnimationFrame(update)
    }

    update()

    function stop() {
        cancelAnimationFrame(animationFrameId)
    }
    
    return {
        playerY,
        obstacleX,
        gameOver,
        jump,
        restart,
        score,
        highScore,
        stop
    }

}