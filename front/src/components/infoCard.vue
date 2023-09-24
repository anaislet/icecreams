<script setup>
import IconPlus from "@/assets/icon-plus.svg";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

defineProps({
  flavor: {
    required: true,
  },
});
</script>

<template>
  <div class="w-9/12 mt-10">
    <h3 class="text-4xl font-sacramento mb-3">{{ flavor.name }}</h3>
    <div class="bg-beige h-fit rounded font-montserrat font-light text-base p-5">
      <ul class="flex flex-col gap-3">
        <div>
          <li class="list-disc ml-5">Catégorie : {{ flavor.category }}</li>
          <li v-if="flavor.icecream == true" class="list-disc ml-5">Glace</li>
          <li v-if="flavor.sorbet == true" class="list-disc ml-5">Sorbet</li>
        </div>
        <div>
          <li v-if="flavor.alcool == true" class="list-disc ml-5">Alcoolisé</li>
          <li v-if="flavor.alcool == false" class="list-disc ml-5">
            Non alcoolisé
          </li>
          <li v-if="flavor.gluten == true" class="list-disc ml-5">
            Contient du gluten
          </li>
          <li v-if="flavor.gluten == false" class="list-disc ml-5">Sans gluten</li>
        </div>
        <div>
          <h3 class="text-raspberry">Nutrition</h3>
          <li class="list-disc ml-5">{{ flavor.kcal }} kcal pour 100g</li>
          <li class="list-disc ml-5">{{ flavor.matgr }} g de matgr pour 100g</li>
          <li class="list-disc ml-5">
            {{ flavor.protein }} g de protéine pour 100g
          </li>
          <li class="list-disc ml-5">
            {{ flavor.glucide }} g de glucide pour 100g
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
