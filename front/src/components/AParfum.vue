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
  selectionStore.addFlavors(icecreamInfos);
}
</script>

<template>
  <div class="flex flex-col mb-4 w-32 mr-4">
    <div
      class="flex w-32 h-32 p-2 justify-center items-end rounded"
      :style="{ backgroundColor: infos.color }"
    >
      <div class="flex flex-row justify-between">
        <img
        :src="IconPlus"
        class="w-7 cursor-pointer"
        @click="displayIcecreamInformations(infos)"
        />
      </div>
    </div>
    <h1 class="font-montserrat font-light text-lg mx-auto h-[84px] text-gray-600">{{ infos.name }}</h1>
  </div>
</template>
