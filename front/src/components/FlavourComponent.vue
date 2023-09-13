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
  <div class="flex flex-col mb-8 w-[160px]">
    <div
      class="flex w-[160px] h-[160px] p-2 justify-center items-end mb-1 rounded"
      :style="{ backgroundColor: infos.color }"
    >
      <div class="flex flex-row justify-between">
        <img
        :src="IconClose"
        class="w-7 cursor-pointer"
        @click="removeFlavour(index)"
        />
      </div>
    </div>
    <h1 class="font-montserrat text-xl">{{ infos.name }}</h1>
  </div>
</template>
