<script setup lang="js">
import { onMounted } from "vue";
import ScoopComponent from "../components/ScoopComponent.vue";
import infoCard from "../components/infoCard.vue";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

onMounted(() => {
  var title1Element = document.getElementById("title2");
  title1Element.scrollIntoView({ behavior: "smooth" });
});

async function goToStep3() {
  try {
    //   await fetch(`http://localhost:3000/composition/${selectionStore.flavours[0]}/${selectionStore.flavours[1]}/${selectionStore.flavours[2]}`, {
    //     method: 'POST'
    //   })
    await fetch(`http://localhost:3000/composition/4/4/4`, {
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
  selectionStore.acceptInformations();
}
</script>

<template>
  <div class="w-screen h-screen bg-pink-red">
    <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title2">
      Etape 2
    </h1>
    <div class="flex flex-row pt-10 pl-10">
      <div class="flex flex-col w-1/3 justify-between items-center">
        <infoCard :flavour="selectionStore.flavours[0]"></infoCard>
        <button
          v-if="selectionStore.isFull === true"
          class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento border-none w-fit"
          @click="goToStep3()"
        >
          Valider
        </button>
      </div>
      <div class="flex flex-col w-1/3 justify-center items-center">
        <ScoopComponent
          v-for="flavour in selectionStore.flavours"
          :color="flavour.color"
        />
      </div>
      <div class="flex flex-col w-1/3 justify-center items-center">
        <infoCard :flavour="selectionStore.flavours[1]"></infoCard>
        <infoCard :flavour="selectionStore.flavours[2]"></infoCard>
      </div>
    </div>
  </div>
</template>
