<script setup>
import MainMenu from './components/mainMenu.vue'
</script>

<template>
  <MainMenu v-if="!gameStarted" @start="startGame" />
</template>

<style scoped></style>
