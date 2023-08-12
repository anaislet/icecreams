<script setup>
import IconClose from '@/assets/icon-close.svg'
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
    <div class="flex w-[160px] h-[160px] p-2 bg-pink-red justify-center items-end mb-5">
        <div class="flex flex-row justify-between">
    <h1 class="font-montserrat text-xl">{{ name }}</h1>
    <img 
      :src="IconClose" 
      class="w-7 cursor-pointer"
      @click="removeFlavour(name)"
    />
  </div>
    </div>
</template>