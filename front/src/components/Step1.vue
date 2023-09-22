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
      selectedCategory: "All",
      showWindow: false
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
    },
    handleScroll() {
      const step1 = document.getElementById('step1')
      if(step1) {
        const rect = step1.getBoundingClientRect()
        this.showWindow = rect.top <= 0 && rect.bottom >= 0
      }
    }
  },
  created() {
    this.getParfums()
    this.getCategories()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
};
</script>

<template>
  <div class="w-screen min-h-screen bg-raspberry-light pb-10" id="step1">
    <h1 class="text-7xl font-sacramento pt-10 pl-10 neonText" id="title1">
      Je choisis mes parfums de glace
    </h1>
    <div class="flex flex-col bg-beige mx-10 my-10 p-10 justify-between rounded-lg">
      <form @submit="selectFlavors" class="flex flex-row justify-between mb-16 w-2/3">
        <div>
          <p class="text-xl text-raspberry font-montserrat font-light mb-5">Glace ou sorbet ?</p>
          <input name="type" type="radio" id="all" value="All" v-model="selectedType">
          <label for="all">Tous</label>
          <br>
          <input name="type" type="radio" id="icecream" value="Icecream" v-model="selectedType">
          <label for="icecream">Glace</label>
          <br>
          <input name="type" type="radio" id="sorbet" value="Sorbet" v-model="selectedType">
          <label for="sorbet">Sorbet</label>
        </div>
        <div>
          <p class="text-xl text-raspberry font-montserrat font-light mb-5">Avec ou sans gluten ?</p>
          <input name="gluten" type="radio" id="allGluten" value="All" v-model="selectedGluten">
          <label for="allGluten">Tous</label>
          <br>
          <input name="gluten" type="radio" id="glutenTrue" value="true" v-model="selectedGluten">
          <label for="glutenTrue">Avec gluten</label>
          <br>
          <input name="gluten" type="radio" id="glutenFalse" value="false" v-model="selectedGluten">
          <label for="glutenFalse">Sans gluten</label>
        </div>
        <div>
          <p class="text-xl text-raspberry font-montserrat font-light mb-5">Avec ou sans alcool ?</p>
          <input name="alcool" type="radio" id="allAlcool" value="All" v-model="selectedAlcool">
          <label for="allAlcool">Tous</label>
          <br>
          <input name="alcool" type="radio" id="alcoolTrue" value="true" v-model="selectedAlcool">
          <label for="alcoolTrue">Avec alcool</label>
          <br>
          <input name="alcool" type="radio" id="alcoolFalse" value="false" v-model="selectedAlcool">
          <label for="alcoolFalse">Sans alcool</label>
        </div>
        <div>
          <p class="text-xl text-raspberry font-montserrat font-light mb-5">Choisir par catégorie</p>
          <select v-model="selectedCategory">
            <option value="All">Tous</option>
            <option v-for="category of categories" :value="category.category">{{category.category}}</option>
          </select>
        </div>
        <div class="flex flex-col justify-end">
          <input type="submit" value="Filtrer">
        </div>
      </form>
      <div class="flex flex-row justify-between">
        <div class="flex flex-row w-2/3 justify-start flex-wrap">
          <AParfum
            v-for="parfum in parfums"
            :infos="parfum"
            :name="parfum.name"
            :id="parfum.id"
            :color="parfum.color"
          />
        </div>
        <div class="mr-[3%] flex flex-col items-center">
          <div :class="{ 'floating-window': showWindow }" class="flex flex-col items-center">
            <p class="text-5xl font-light text-gray-600 font-sacramento mb-10">Votre coupe glacée</p>
            <FlavourComponent
              v-for="(flavour, index) in selectionStore.flavours"
              :infos="flavour"
              :index="index"
            />
            <button
              v-if="selectionStore.isFull === true"
              class="border bg-raspberry rounded-lg p-4 text-5xl mt-10 font-medium text-white font-sacramento"
              @click="goToStep2()"
            >
              Je valide !
            </button>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<style>
  input[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(231, 65, 77, 0.7);
    border-radius: 50%; /* Pour créer un cercle */
    background-color: transparent;
    margin-right: 10px;
    cursor: pointer
  }

  input[type="radio"]:checked {
    background-color: rgba(231, 65, 77, 0.7);
  }

  input[type="submit"] {
    height: fit-content;
    appearance: none;
    border-radius: 8px;
    background-color: rgba(231, 65, 77, 0.7);
    cursor: pointer;
    padding: 15px;
    color: white;
    font-size: 30px;
    font-family: Sacramento, cursive;
    font-weight: 500;
 }


  label {
    font-size: 16px;
    color: rgb(75 85 99);
    font-family: Montserrat, sans-serif;
    font-weight: 300;
  }

  select {
    background-color: white;
    border: 1px solid rgba(231, 65, 77, 0.7);
    border-radius: 4px;
    padding: 8px;
    margin-left: 10px;
    width: 200px;
    cursor: pointer;
  }

  option {
    font-family: Montserrat, sans-serif;
    color: rgb(75 85 99);
    font-size: 16px;
  }
</style>

<style scoped>
.floating-window {
  position: sticky;
  top: 40px;
}
</style>