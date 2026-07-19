<script setup>
import { computed } from "vue"

const props = defineProps({
    score: Number,
    highScore: Number,
})

/**
 * Indica si el récord actual proviene de una sesión anterior
 * (es decir, si ya existía en localStorage antes de que comenzara la partida).
 * Se usa para mostrar un indicador visual al jugador.
 */
const isPersistedRecord = computed(() => {
    const saved = parseInt(localStorage.getItem("dinorush_high_score")) || 0
    return saved > 0
})
</script>

<template>
    <div class="hud">
        <span>Puntaje: {{ score }}</span>
        <span class="high-score">
            Récord: {{ highScore }}
            <span v-if="isPersistedRecord" class="persisted-badge" title="Récord guardado entre sesiones">💾</span>
        </span>
    </div>
</template>

<style scoped>

.hud {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: bold;
}

.high-score {
    display: flex;
    align-items: center;
    gap: 6px;
}

.persisted-badge {
    font-size: 16px;
    cursor: default;
    opacity: 0.85;
    transition: opacity 0.2s;
}

.persisted-badge:hover {
    opacity: 1;
}
</style>
