<script setup lang="js">
import { onBeforeMount, onMounted } from "vue";
import ScoopComponent from "../components/ScoopComponent.vue";
import { useSelectionStore } from "@/stores/selection";
import { ref } from "vue";

const selectionStore = useSelectionStore();

const title = ref("");
const total = ref({});
const alcool = ref(false);
const gluten = ref(false);

onBeforeMount(() => {
  total.value = averageInfos(selectionStore.flavours);
  alcool.value = containingAlcool(selectionStore.flavours);
  gluten.value = containingGluten(selectionStore.flavours);
});

onMounted(() => {
  var title1Element = document.getElementById("title3");
  title1Element.scrollIntoView({ behavior: "smooth" });
});

function averageInfos(flavours) {
  let totalCal = 0;
  let totalMg = 0;
  let totalProt = 0;
  let totalGlu = 0;
  for (let flavour of flavours) {
    totalCal = totalCal + Math.round(flavour.kcal / 3);
    totalMg = totalMg + Math.round(flavour.matgr / 3);
    totalProt = totalProt + Math.round(flavour.protein / 3);
    totalGlu = totalGlu + Math.round(flavour.glucide / 3);
  }
  return { totalCal, totalMg, totalProt, totalGlu };
}

function containingAlcool(flavours) {
  const alcool = flavours.filter((flavour) => flavour.alcool == true);
  return alcool.length > 0;
}

function containingGluten(flavours) {
  const gluten = flavours.filter((flavour) => flavour.gluten == true);
  return gluten.length > 0;
}
</script>

<template>
  <div class="w-screen h-screen bg-raspberry-light">
    <h1 class="text-7xl font-sacramento pt-10 pl-10 neonText" id="title3">
      Ma création
    </h1>
    <div class="flex flex-row h-5/6">
      <div class="flex flex-col w-1/2 h-full bg-beige my-10 mx-10 items-center rounded">
        <div v-if="title == ''" class="h-[140px]"></div>
        <h2 v-else class="text-6xl font-sacramento my-[40px]">{{ title }}</h2>
        <ScoopComponent
          v-for="flavour in selectionStore.flavours"
          :color="flavour.color"
        />
        <div class="flex flex-row gap-10 my-auto">
          <h2 v-for="flavour in selectionStore.flavours" class="font-montserrat font-light text-2xl">
            {{ flavour.name }}
          </h2>
        </div>
      </div>
      <div
        class="flex flex-col w-1/2 h-full bg-beige my-10 mr-10 pl-10 items-start justify-around rounded"
      >
      <div>
        <h1 class="mb-2 font-montserrat font-light text-2xl">Je choisis un nom pour ma coupe glacée :</h1>
        <input
          type="text"
          placeholder="Donner un titre à votre composition (max 40 carac.)"
          maxlength="40"
          class="h-20 w-full border p-3"
          v-model="title"
        />
      </div>
        <div v-if="selectionStore.compositionCount == 1" class="mb-2 font-montserrat font-medium text-2xl text-raspberry">Vous êtes le.a premier.ère à avoir créé cette coupe glacée !</div>
        <div v-else class="mb-2 font-montserrat font-medium text-2xl text-raspberry">Vous êtes le.a {{ selectionStore.compositionCount }}ème à avoir créé cette coupe glacée !</div>
        <div class="mb-2 font-montserrat font-light text-lg flex flex-col gap-3">
          <p v-if="alcool == true">⚠️ Cette coupe glacée contient de l'alcool.</p>
          <p v-else>✔️ Cette coupe glacée ne contient pas d'alcool.</p>
          <p v-if="gluten == true">⚠️ Cette coupe glacée contient du gluten.</p>
          <p v-else>✔️ Cette coupe glacée ne contient pas de gluten.</p>
        </div>
        <div class="mb-2 font-montserrat font-light text-lg">
          <p class="mb-3">Informations nutritionnelles concernant ma coupe glacée :</p>
          <p>Total calories : {{ total.totalCal }} kcal</p>
          <p>Total matières grasses : {{ total.totalMg }} g</p>
          <p>Total protéine : {{ total.totalProt }} g</p>
          <p>Total glucide : {{ total.totalGlu }} g</p>
        </div>
        <button
          class="border bg-raspberry rounded-lg p-4 text-5xl mt-10 font-medium text-white font-sacramento"
          @click="editPDF()"
        >
          Editer ma fiche recette
        </button>
      </div>
    </div>
  </div>
</template>
