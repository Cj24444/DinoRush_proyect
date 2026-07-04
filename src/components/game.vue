<script setup>

import { onMounted, onUnmounted } from "vue"
import { useGame } from "./usingGame"
import scores from "./scores.vue"

const {
    playerY,
    obstacleX,
    gameOver,

    score,
    highScore,

    jump,
    restart
} = useGame()


function keyDown(e){
    if(e.code === "Space" || e.code === "ArrowUp"){
        jump()
    }
    if(e.code==="KeyR"){
        restart()
    }
}

onMounted(()=>{
    window.addEventListener("keydown",keyDown)
})

onUnmounted(()=>{
    window.removeEventListener("keydown",keyDown)
})
</script>

<template>
    <scores
    :score="score"
    :highScore="highScore"
    />
  <div class="game">
      <div class="ground"></div>
      <div
          class="player"
          :style="{ bottom: `${playerY}px` }"
      ></div>
      <div
        class="obstacle"
        :style="{left:obstacleX+'px'}"
      ></div>
      <div
        v-if="gameOver"
        class="gameOver"
      >
        <h1>GAME OVER</h1>
        <p>Presiona R para reiniciar</p>
      </div>

  </div>
</template>



<style scoped>

.game{
    position:relative;
    width:900px;
    height:400px;
    margin:auto;
    overflow:hidden;
    background:#ccefff;

}

.ground{
    position:absolute;
    width:100%;
    height:40px;
    background:#6f4e37;
    bottom:0px;
}

.player{
    position:absolute;
    left:100px;
    width:40px;
    height:40px;
    background:#2ecc71;
}

.obstacle{
    position:absolute;
    bottom:40px;
    width:30px;
    height:60px;
    background:#2c3e50;
}
.gameOver{
    position:absolute;
    inset:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,.4);
    color:white;
}


</style>