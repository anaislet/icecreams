<script setup lang="js">
import { onMounted } from 'vue'
import ScoopComponent from '../components/ScoopComponent.vue'
import { useSelectionStore } from '@/stores/selection'
import { ref } from 'vue'

const selectionStore = useSelectionStore()

const title = ref('')

onMounted (() => {
    var title1Element = document.getElementById('title3')
    title1Element.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
    <div class="w-screen h-screen bg-pink-red">
        <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title3">Etape 3</h1>
        <div class="flex flex-row h-5/6">
            <div class="flex flex-col w-1/2 h-full bg-white my-10 mx-10 items-center">
                <h2 class="font-montserrat font-light text-3xl my-10">{{ title }}</h2>
                <ScoopComponent 
                    v-for="flavour in selectionStore.flavours"
                    :name="flavour"
                />
                
            </div>
            <div class="flex flex-col w-1/2 h-full bg-white my-10 mr-10 items-center justify-around">
                <input type= "text" placeholder="Donner un titre à votre composition" class="w-2/3 h-20" v-model="title"/>
                <div>Cette glace a déjà été créé 17 fois !</div>
                <p class="font-montserrat font-light text-xl">Résumé des informations nutritionnelles Résumé des informations nutritionnelles Résumé des informations nutritionnelles Résumé des informations nutritionnelles Résumé des informations nutritionnelles Résumé des informations nutritionnelles Résumé des informations nutritionnelles</p>
                <button 
                    class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento border-none w-fit"
                    @click="editPDF()"
                >Editer ma fiche recette
                </button>

            </div>
        </div>
    </div> 
</template>