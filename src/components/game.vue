<script setup>

import { onMounted, onUnmounted } from "vue"
import { useGame } from "./usingGame"

const {
    playerY,
    jump
} = useGame()


function keyDown(e){
    if(e.code === "Space" || e.code === "ArrowUp"){
        jump()
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
  <div class="game">
      <div class="ground"></div>
      <div
          class="player"
          :style="{ bottom: `${playerY}px` }"
      ></div>
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

</style>