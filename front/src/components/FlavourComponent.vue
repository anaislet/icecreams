<script setup>
import IconClose from "@/assets/icon-close.svg";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

defineProps({
  infos: {
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

function removeFlavour(index) {
  selectionStore.removeFlavour(index);
}
</script>

<template>
  <div
    class="flex w-[160px] h-[160px] p-2 justify-center items-end mb-5"
    :style="{ backgroundColor: infos.color }"
  >
    <div class="flex flex-row justify-between">
      <h1 class="font-montserrat text-xl">{{ infos.name }}</h1>
      <img
        :src="IconClose"
        class="w-7 cursor-pointer"
        @click="removeFlavour(index)"
      />
    </div>
  </div>
</template>
