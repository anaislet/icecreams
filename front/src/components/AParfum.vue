<script setup>
import IconPlus from '@/assets/icon-plus.svg'
import { useSelectionStore } from '@/stores/selection'

const selectionStore = useSelectionStore()

defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

function displayIcecreamInformations(icecreamName) {
  selectionStore.addFlavours(icecreamName)
  console.log(selectionStore.flavours)
}
</script>

<template>
  <div
    class="flex w-32 h-32 p-2 bg-pink-red justify-center items-end"
  >
  <div class="flex flex-row justify-between">
    <h1 class="font-montserrat text-xl">{{ name }}</h1>
    <img 
      :src="IconPlus" 
      class="w-7 cursor-pointer"
      @click="displayIcecreamInformations(name)"
    />
  </div>
  </div>
</template>
