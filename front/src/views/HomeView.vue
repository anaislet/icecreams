<script setup>
import FrontPage from '../components/FrontPage.vue'
import Step1 from '../components/Step1.vue'
import Step2 from '../components/Step2.vue'

import { useSelectionStore } from '@/stores/selection'

const selectionStore = useSelectionStore()

</script>


<template>
  <main class="bg-pink-500 h-[400vh] w-screen">
    <FrontPage></FrontPage>
    <Step1></Step1>
    <Step2 v-if="selectionStore.isSaved === true"></Step2>
  </main>
</template>
