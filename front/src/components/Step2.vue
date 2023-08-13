<script setup lang="js">
import { onMounted } from 'vue'
import ScoopComponent from '../components/ScoopComponent.vue'
import { useSelectionStore } from '@/stores/selection'

const selectionStore = useSelectionStore()


onMounted (() => {
    var title1Element = document.getElementById('title2')
    title1Element.scrollIntoView({ behavior: 'smooth' })
})

function goToStep3(){
    selectionStore.acceptInformations()
}
</script>

<template>
     <div class="w-screen h-screen bg-pink-red">
        <h1 class="text-6xl font-sacramento pt-10 pl-10 neonText" id="title2">Etape 2</h1>
        <div class="flex flex-row pt-10 pl-10">
            <div class="flex flex-col w-1/3 justify-between items-center">
                <div class="w-1/2 bg-white h-32 mt-20">
                    <ul>
                        <li class="list-disc ml-6">{{ selectionStore.flavours[0] }}</li>
                    </ul>
                </div>
                <button 
                    v-if="selectionStore.isFull === true"
                    class="border bg-pink-red rounded-lg p-4 text-3xl font-medium text-white font-sacramento border-none w-fit"
                    @click="goToStep3()"
                >Valider
                </button>
            </div>
            <div class="flex flex-col w-1/3 justify-center items-center">
                <ScoopComponent 
                    v-for="flavour in selectionStore.flavours"
                    :name="flavour"
                />
            </div>
            <div class="flex flex-col w-1/3 justify-center items-center">
                <div class="w-1/2 bg-white h-32 mt-20">
                    <ul>
                        <li class="list-disc ml-6">{{ selectionStore.flavours[1] }}</li>
                    </ul>
                </div>
                <div class="w-1/2 bg-white h-32 mt-20">
                    <ul>
                        <li class="list-disc ml-6">{{ selectionStore.flavours[2] }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>