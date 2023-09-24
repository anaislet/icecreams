import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSelectionStore = defineStore("selection", () => {
  const flavors = ref([]);
  const isFull = computed(() => (flavors.value.length === 3 ? true : false));
  const isSaved = ref(false);
  const isInformationsSaved = ref(false);
  const compositionCount = ref(0)

  function addFlavors(infos) {
    if (!isFull.value) {
      flavors.value.push(infos);
    }
  }

  function removeFlavor(index) {
    flavors.value.splice(index, 1);
    isSaved.value = false;
    isInformationsSaved.value = false;
  }

  function save() {
    isSaved.value = true;
  }

  function acceptInformations() {
    isInformationsSaved.value = true;
  }

  function setCompositionCount(count) {
    compositionCount.value = count
  }

  return {
    flavors,
    isFull,
    isSaved,
    isInformationsSaved,
    compositionCount,
    addFlavors,
    removeFlavor,
    save,
    acceptInformations,
    setCompositionCount
  };
});
