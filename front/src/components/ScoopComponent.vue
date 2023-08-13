<script setup>
import { useSelectionStore } from '@/stores/selection'

const selectionStore = useSelectionStore()


defineProps({
  name: {
    type: String,
    required: true
  }
})

function removeFlavour(flavour) {
    selectionStore.removeFlavour(flavour)
}
</script>

<template>
    <div class="flex w-[160px] h-[160px] p-2 bg-pink-red justify-center items-end mb-5 rounded-full">
        <div class="flex flex-row justify-between">
  </div>
    </div>
</template>