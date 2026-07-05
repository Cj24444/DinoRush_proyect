<script setup>
const emit = defineEmits(['start'])
</script>

<template>
  <div class="menu">
    <h1 class="pixel-title">DINO-RUSH</h1>

    <div class="instructions-box">
      <p> [SPACE] / [^] : SALTAR</p>
      <p> [R] : REINICIAR</p>
    </div>

    <button class="btn-retro" @click="emit('start')">INSERT COIN / JUGAR</button>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2b2b2b;
  font-family: 'Courier New', Courier, monospace;
  color: #54b054;
}

.pixel-title {
  font-size: 3rem;
  letter-spacing: 4px;
  text-shadow: 4px 4px 0px #000;
  margin-bottom: 10px;
}

.instructions-box {
  border: 4px dashed #54b054;
  padding: 15px;
  background: #1a1a1a;
  text-align: center;
}

button {
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #54b054;
  color: #000;
  border: 4px solid #fff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 5px 5px 0px #000;
}

button:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0px #000;
}
</style>