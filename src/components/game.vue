<script setup>

import { onMounted, onUnmounted, computed } from "vue"
import { useGame } from "./usingGame"
import scores from "./scores.vue"

const {
    playerY,
    obstacleX,
    gameOver,

    score,
    highScore,

    dinoSpriteIndex,
    currentCactusType,

    jump,
    restart, 
    stop
} = useGame()


function keyDown(e){
    if(e.code === "Space" || e.code === "ArrowUp"){
        jump()
    }
    if(e.code==="KeyR"){
        restart()
    }
}

const dinoClass = computed(() => `dino-sprite-${dinoSpriteIndex.value}`)
const cactusClass = computed(() => `cactus-sprite-${currentCactusType.value}`)

onMounted(()=>{
    window.addEventListener("keydown",keyDown)
})

onUnmounted(()=>{
    window.removeEventListener("keydown", keyDown)
    stop() 
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
          :class="dinoClass"
          :style="{ bottom: `${playerY}px` }"
      ></div>
      <div
        class="obstacle"
        :class="cactusClass"
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
    z-index: 2;
}

.player{
    position:absolute;
    left:100px;
    width:100px;
    height:100px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    z-index: 3;
    transition: bottom 0.05s linear;

}
.dino-sprite-1 { background-image: url('../sprites/sprite_dino1.png'); }
.dino-sprite-2 { background-image: url('../sprites/sprite_dino2.png'); }
.dino-sprite-3 { background-image: url('../sprites/sprite_dino3.png'); }
.dino-sprite-4 { background-image: url('../sprites/sprite_dino4Muerte.png'); }

.obstacle{
    position:absolute;
    bottom:28px;
    width:75px;
    height:150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;
    z-index: 1;

}

.cactus-sprite-1 { background-image: url('../sprites/cactus_sprite1.png'); }
.cactus-sprite-2 { background-image: url('../sprites/cactus_sprite2.png'); }
.cactus-sprite-3 { background-image: url('../sprites/cactus_sprite3.png'); }
.gameOver{
    position:absolute;
    inset:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,.4);
    color:white;
    font-family: sans-serif;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}


</style>