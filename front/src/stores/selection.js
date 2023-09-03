import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSelectionStore = defineStore("selection", () => {
  const flavours = ref([]);
  const isFull = computed(() => (flavours.value.length === 3 ? true : false));
  const isSaved = ref(false);
  const isInformationsSaved = ref(false);

  function addFlavours(infos) {
    if (!isFull.value) {
      flavours.value.push(infos);
    }
  }

  function removeFlavour(index) {
    flavours.value.splice(index, 1);
    isSaved.value = false;
  }

  function save() {
    isSaved.value = true;
  }

  function acceptInformations() {
    isInformationsSaved.value = true;
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
  };
});
