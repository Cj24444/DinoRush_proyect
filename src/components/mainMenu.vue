<script setup>
const emit = defineEmits(['start'])
</script>

<template>
  <div class="menu">
    <h1 class="neon-title">DINO_RUSH_</h1>

    <div class="modern-panel">
      <p> Barra Espaciadora / Flecha Arriba para saltar</p>
      <p> Presiona R para reiniciar el sistema</p>
    </div>

    <button class="btn-neon" @click="emit('start')">INICIAR CONEXIÓN</button>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle, #1a0b2e 0%, #05010d 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e0d5ff;
}

.neon-title {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(45deg, #ff007f, #7f00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modern-panel {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

button {
  margin-top: 35px;
  padding: 15px 35px;
  background: transparent;
  color: #00ffff;
  border: 2px solid #00ffff;
  border-radius: 30px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

}

button:hover {
  background: #00ffff;
  color: #000;
  transform: scale(1.05);
}
</style>