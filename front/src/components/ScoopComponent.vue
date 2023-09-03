<script setup>
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex w-[160px] h-[160px] p-2 justify-center items-end mb-5 rounded-full"
    :style="{ backgroundColor: color }"
  >
    <div class="flex flex-row justify-between"></div>
  </div>
</template>
