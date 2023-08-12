 <script setup lang="js">
    import AParfum from '../components/AParfum.vue'
    import FlavourComponent from '../components/FlavourComponent.vue'
    import { useSelectionStore } from '@/stores/selection'

    const selectionStore = useSelectionStore()

    function goToStep2(){
      selectionStore.save()
    }
</script>

<script lang="js">
export default {
  data() {
    return {
      parfums: [],
    }
  },
  methods: {
    async getParfums() {
      try {
        const response = await fetch('http://localhost:3000/icecreams')
        const icecreams = await response.json()
        this.parfums = icecreams
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getParfums()
  }
}


</script>

<template>
        <div class="w-screen h-screen bg-pink-red">
        <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title1">Je choisis mes parfums de glace</h1>
        <div class="flex flex-row bg-beige mx-10 my-10 p-10 justify-between">
            <div class="flex flex-row w-1/2 justify-between">
                <AParfum 
                    v-for="parfum in parfums"
                    :name="parfum.name"
                    :id="parfum.id"
                />
            </div>
            <div>
                **Résulat de la coupe glacée**
                <FlavourComponent 
                    v-for="flavour in selectionStore.flavours"
                    :name="flavour"
                />
                <button 
                    v-if="selectionStore.isFull === true"
                    class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento"
                    @click="goToStep2()"
                >Valider
                </button>
            </div>
        </div>
    </div>
</template>