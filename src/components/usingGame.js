import { ref } from "vue"

const GROUND = 40

export function useGame() {

    const playerY = ref(GROUND)
    const velocity = ref(0)
    const obstacleX = ref(900)
    const gravity = -0.7
    const jumpForce = 16
    let jumping = false

    function jump() {

        if (jumping) return
        velocity.value = jumpForce
        jumping = true
    }

    function checkCollision(){

        const playerLeft = 100
        const playerRight = 140

        const obstacleLeft = obstacleX.value
        const obstacleRight = obstacleX.value + 30

    }

    function update() {

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
        jump
    }

}