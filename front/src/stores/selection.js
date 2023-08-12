import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectionStore = defineStore('selection', () => {

  const flavours = ref([])
  const isFull = computed(() => flavours.value.length === 3 ? true : false)
  const isSaved = ref(false)

  function addFlavours(flavour) {
    if(!isFull.value) {
        flavours.value.push(flavour)
    }
  }

  function removeFlavour(flavour) {
    const index = flavours.value.indexOf(flavour)
    if(index !== -1) {
        flavours.value.splice(index, 1)
    }
  }
  
  function save() {
    isSaved.value = true
  }

  return { 
    flavours,
    isFull,
    isSaved,
    addFlavours,
    removeFlavour,
    save
  }
})
