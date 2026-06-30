<script setup>
const emit = defineEmits(['start'])
</script>

<template>
  <div class="menu">
    <h1>DinoRush</h1>

    <p>Esquiva los obstáculos, si puedes >:D</p>

    <button @click="emit('start')">Jugar</button>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
}

button {
  margin-top: 20px;
}
</style>
