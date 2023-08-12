<script setup lang="js">
    function goToStep1(){
        var title1Element = document.getElementById('title1')
        title1Element.scrollIntoView({ behavior: 'smooth' })
    }
</script>

<template>
    <div class="w-screen h-screen bg-front-page bg-cover bg-center">
        <h1 class="text-8xl font-sacramento pt-60 pl-20 neonText">Gelato Creazioni</h1>
        <div class="w-[40%] mt-40 ml-20 text-lg text-gray-600">
            <p class="font-montserrat font-light">Plongez dans un tourbillon de créativité glacée avec Gelato Creazioni ! Choisissez 3 parfums pour créer votre chef-d'œuvre glacé. Découvrez si votre combo est une star nutritive ou une rockstar gourmande. Personnalisez votre création avec un nom original et gourmand. Et tada ! Découvrez si d'autres ont déjà pris ce chemin délicieusement crémeux. <br />En prime, créez votre fiche recette en PDF : parce que partager, c'est bien, mais garder jalousement sa recette de génie, c'est mieux !</p>
        </div>
        <button 
            class="mt-36 ml-20 border bg-pink-red rounded-lg p-4 text-5xl font-medium text-white font-sacramento"
            @click="goToStep1()"
        >Andiamo</button>
    </div>
</template>

<style setup>
    .neonText {
        color: #fff;
    text-shadow:
        0 0 7px #fff,
        0 0 10px #fff,
        0 0 21px #fff,
        0 0 42px #B90100,
        0 0 82px #B90100,
        0 0 92px #B90100,
        0 0 102px #B90100,
        0 0 151px #B90100;
    }
</style>