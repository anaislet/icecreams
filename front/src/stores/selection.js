import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSelectionStore = defineStore('selection', () => {

  const flavours = ref([])
  const isFull = computed(() => flavours.value.length === 3 ? true : false)
  const isSaved = ref(false)
  const isInformationsSaved = ref(false)

  function addFlavours(flavour) {
    if(!isFull.value) {
        flavours.value.push(flavour)
    }
  }

  function removeFlavour(flavour) {
    const index = flavours.value.indexOf(flavour)
    if(index !== -1) {
        flavours.value.splice(index, 1)
        isSaved.value = false
    } else {
      console.error('Le parfum sélectionné n\'a pas été sélectionné')
    }
  }

  function save() {
    isSaved.value = true
  }

  function acceptInformations(){
    isInformationsSaved.value = true
  }

  return { 
    flavours,
    isFull,
    isSaved,
    isInformationsSaved,
    addFlavours,
    removeFlavour,
    save,
    acceptInformations,
  }
})
