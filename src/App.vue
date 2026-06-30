<script setup>
import { ref } from 'vue'

import MainMenu from './components/mainMenu.vue'
import Game from './components/game.vue'

const gameStarted = ref(false)

function startGame() {
  gameStarted.value = true
}
</script>

<template>
  <MainMenu v-if="!gameStarted" @start="startGame" />

  <Game v-else />
</template>

<style scoped></style>
