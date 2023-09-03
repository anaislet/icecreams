<script setup>
import IconPlus from "@/assets/icon-plus.svg";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

defineProps({
  flavour: {
    required: true,
  },
});
</script>

<template>
  <div class="w-1/2 bg-white h-60 mt-20">
    <ul>
      <li class="list-disc ml-6">{{ flavour.name }}</li>
      <li class="list-disc ml-6">Catégorie : {{ flavour.category }}</li>
      <li v-if="flavour.icecream == true" class="list-disc ml-6">Glace</li>
      <li v-if="flavour.sorbet == true" class="list-disc ml-6">Sorbet</li>
      <li v-if="flavour.alcool == true" class="list-disc ml-6">Alcoolisé</li>
      <li v-if="flavour.alcool == false" class="list-disc ml-6">
        Non alcoolisé
      </li>
      <li v-if="flavour.gluten == true" class="list-disc ml-6">
        Contient du gluten
      </li>
      <li v-if="flavour.gluten == false" class="list-disc ml-6">Sans gluten</li>
      <li class="list-disc ml-6">{{ flavour.kcal }} kcal pour 100g</li>
      <li class="list-disc ml-6">{{ flavour.matgr }}g de matgr pour 100g</li>
      <li class="list-disc ml-6">
        {{ flavour.protein }}g de protéine pour 100g
      </li>
      <li class="list-disc ml-6">
        {{ flavour.glucide }}g de glucide pour 100g
      </li>
    </ul>
  </div>
</template>
