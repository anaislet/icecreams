<script setup>
import IconPlus from "@/assets/icon-plus.svg";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

defineProps({
  id: {
    type: Number,
    required: true,
  },
  infos: {
    required: true,
  },
});

function displayIcecreamInformations(icecreamInfos) {
  selectionStore.addFlavours(icecreamInfos);
}
</script>

<template>
  <div
    class="flex w-32 h-32 p-2 justify-center items-end"
    :style="{ backgroundColor: infos.color }"
  >
    <div class="flex flex-row justify-between">
      <h1 class="font-montserrat text-xl">{{ infos.name }}</h1>
      <img
        :src="IconPlus"
        class="w-7 cursor-pointer"
        @click="displayIcecreamInformations(infos)"
      />
    </div>
  </div>
</template>
