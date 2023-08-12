<script setup lang="js">
import { onMounted } from 'vue';

onMounted (() => {
    var title1Element = document.getElementById('title2')
    title1Element.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
     <div class="w-screen h-screen bg-pink-red">
        <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title2">Etape 2</h1>
    </div>
</template>