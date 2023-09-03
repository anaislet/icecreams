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
  <div class="w-screen h-screen bg-pink-red">
    <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title3">
      Etape 3
    </h1>
    <div class="flex flex-row h-5/6">
      <div class="flex flex-col w-1/2 h-full bg-white my-10 mx-10 items-center">
        <h2 class="font-montserrat font-light text-3xl my-10">{{ title }}</h2>
        <ScoopComponent
          v-for="flavour in selectionStore.flavours"
          :color="flavour.color"
        />
        <div>
          <h2 v-for="flavour in selectionStore.flavours">
            {{ flavour.name }}
          </h2>
        </div>
      </div>
      <div
        class="flex flex-col w-1/2 h-full bg-white my-10 mr-10 items-center justify-around"
      >
        <h1>Choisissez un nom pour votre coupe glacée</h1>
        <input
          type="text"
          placeholder="Donner un titre à votre composition"
          class="w-2/3 h-20"
          v-model="title"
        />
        <div>Cette glace a déjà été créé {{ selectionStore.compositionCount }} fois !</div>
        <p v-if="alcool == true">Cette coupe glacée contient de l'alcool.</p>
        <p v-else>Cette coupe glacée ne contient pas d'alcool.</p>
        <p v-if="gluten == true">Cette coupe glacée contient du gluten.</p>
        <p v-else>Cette coupe glacée ne contient pas de gluten.</p>
        <div>
          <p>Informations nutritionnelles concernant ma coupe glacée :</p>
          <p>Total calories : {{ total.totalCal }} kcal</p>
          <p>Total matières grasses : {{ total.totalMg }} g</p>
          <p>Total protéine : {{ total.totalProt }} g</p>
          <p>Total glucide : {{ total.totalGlu }} g</p>
        </div>
        <button
          class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento border-none w-fit"
          @click="editPDF()"
        >
          Editer ma fiche recette
        </button>
      </div>
    </div>
  </div>
</template>
