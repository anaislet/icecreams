<script setup lang="js">
import AParfum from "../components/AParfum.vue";
import FlavourComponent from "../components/FlavourComponent.vue";
import { useSelectionStore } from "@/stores/selection";

const selectionStore = useSelectionStore();

function goToStep2() {
  selectionStore.save();
}
</script>

<script lang="js">
export default {
  data() {
    return {
      parfums: [],
      categories: [],
      selectedType: "All",
      selectedGluten: "All",
      selectedAlcool: "All",
      selectedCategory: "All"
    };
  },
  methods: {
    async getParfums() {
      try {
        const response = await fetch("http://localhost:3000/icecreams");
        const icecreams = await response.json();
        this.parfums = icecreams;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const categories = await response.json();
        this.categories = categories;
      } catch (error) {
        console.log(error);
      }
    },
    async selectFlavors(e) {
      e.preventDefault()
      e.stopPropagation()
      try {
        const response = await fetch(`http://localhost:3000/icecreams?type=${this.selectedType}&gluten=${this.selectedGluten}&alcool=${this.selectedAlcool}&category=${this.selectedCategory}`);
        const icecreams = await response.json();
        this.parfums = icecreams;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getParfums()
    this.getCategories()
  },
};
</script>

<template>
  <div class="w-screen min-h-screen bg-pink-red">
    <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title1">
      Je choisis mes parfums de glace
    </h1>
    <div class="flex flex-row bg-beige mx-10 my-10 p-10 justify-between">
      <form @submit="selectFlavors">
        <input name="type" type="radio" id="all" value="All" v-model="selectedType">
        <label for="all">Tous</label>
        <br>
        <input name="type" type="radio" id="icecream" value="Icecream" v-model="selectedType">
        <label for="icecream">Glace</label>
        <br>
        <input name="type" type="radio" id="sorbet" value="Sorbet" v-model="selectedType">
        <label for="sorbet">Sorbet</label>
        <br>
        <br>
        <input name="gluten" type="radio" id="allGluten" value="All" v-model="selectedGluten">
        <label for="allGluten">Tous</label>
        <br>
        <input name="gluten" type="radio" id="glutenTrue" value="true" v-model="selectedGluten">
        <label for="glutenTrue">Avec gluten</label>
        <br>
        <input name="gluten" type="radio" id="glutenFalse" value="false" v-model="selectedGluten">
        <label for="glutenFalse">Sans gluten</label>
        <br>
        <br>
        <input name="alcool" type="radio" id="allAlcool" value="All" v-model="selectedAlcool">
        <label for="allAlcool">Tous</label>
        <br>
        <input name="alcool" type="radio" id="alcoolTrue" value="true" v-model="selectedAlcool">
        <label for="alcoolTrue">Avec alcool</label>
        <br>
        <input name="alcool" type="radio" id="alcoolFalse" value="false" v-model="selectedAlcool">
        <label for="alcoolFalse">Sans alcool</label>
        <br>
        <br>
        <select v-model="selectedCategory">
          <option value="All">Tous</option>
          <option v-for="category of categories" :value="category.category">{{category.category}}</option>
        </select>
        <br>
        <br>
        <input type="submit" value="Valider">
      </form>

      <div class="flex flex-row w-1/2 justify-between flex-wrap">
        <AParfum
          v-for="parfum in parfums"
          :infos="parfum"
          :name="parfum.name"
          :id="parfum.id"
          :color="parfum.color"
        />
      </div>
      <div>
        **Résulat de la coupe glacée**
        <FlavourComponent
          v-for="(flavour, index) in selectionStore.flavours"
          :infos="flavour"
          :index="index"
        />
        <button
          v-if="selectionStore.isFull === true"
          class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento"
          @click="goToStep2()"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>
