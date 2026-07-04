<script setup>

defineProps({
    score:Number,
    highScore:Number
})

</script>

<template>

<div class="hud">
    <span>Puntaje: {{score}}</span>
    <span>Récord: {{highScore}}</span>
</div>

</template>

<style scoped>

.hud{
    position:absolute;
    top:20px;
    left:20px;
    right:20px;
    display:flex;
    justify-content:space-between;
    font-size:24px;
    font-weight:bold;
}

</style>