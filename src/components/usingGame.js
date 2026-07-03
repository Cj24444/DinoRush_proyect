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

    function jump() {

        if (jumping) return
        velocity.value = jumpForce
        jumping = true
    }
    function restart(){
        playerY.value = GROUND
        velocity.value = 0
        obstacleX.value = 900
        jumping = false
        gameOver.value = false

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

        obstacleX.value -= 6

        if(obstacleX.value < -30){
            obstacleX.value = 900
        }

        checkCollision()
        requestAnimationFrame(update)
    }

    update()

    return {
        playerY,
        obstacleX,
        gameOver,
        jump,
        restart
    }

}