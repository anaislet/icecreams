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
      const response = await fetch(`http://localhost:3000/composition/${selectionStore.flavors[0].id}/${selectionStore.flavors[1].id}/${selectionStore.flavors[2].id}`, {
        method: 'POST'
      })
      const composition = await response.json()
      selectionStore.setCompositionCount(composition.count)
  } catch (error) {
    console.log(error);
  }
  selectionStore.acceptInformations();
}
</script>

<template>
  <div id="background" class="w-screen h-screen ">
    <h1 class="text-7xl font-sacramento pt-10 pl-10 neonText" id="title2">
      Nutri-Glace
    </h1>
    <div class="flex flex-row pt-8 pl-10">
      <div class="flex flex-col w-1/3 justify-between items-center">
        <infoCard :flavor="selectionStore.flavors[0]"></infoCard>
        <button
          v-if="selectionStore.isFull === true"
          class=" bg-raspberry rounded-lg p-4 text-5xl mt-10 font-medium text-white font-sacramento"
          @click="goToStep3()"
        >
          Je choisis cette glace !
        </button>
      </div>
      <div class="flex flex-col w-1/3 justify-center items-center">
        <ScoopComponent
          v-for="flavor in selectionStore.flavors"
          :color="flavor.color"
        />
      </div>
      <div class="flex flex-col w-1/3 justify-center items-center">
        <infoCard :flavor="selectionStore.flavors[1]"></infoCard>
        <infoCard :flavor="selectionStore.flavors[2]"></infoCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #background {
    background: radial-gradient(circle, rgba(252,251,251,1) 0%, rgba(231,65,77,0.5) 40%);
  }
</style>