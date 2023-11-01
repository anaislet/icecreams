<script setup lang="js">
function goToStep1() {
  var title1Element = document.getElementById("title1");
  title1Element.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <div class="w-screen h-screen bg-front-page bg-cover bg-center flex flex-col justify-around">
    <h1 class="text-9xl font-sacramento  pl-20 neonText">
      Gelato Creazioni
    </h1>
    <div class="w-[40%] ml-20 text-xl text-gray-600">
      <p class="font-montserrat font-light">
        Plongez dans un tourbillon de créativité givrée avec Gelato Creazioni !
        Choisissez 3 parfums pour créer votre chef-d'œuvre glacé. Découvrez si
        votre combo est un modèle nutritif ou une rockstar gourmande.
        Personnalisez votre création avec un nom original et savoureux. Et tada !
        Découvrez si d'autres ont déjà pris ce chemin délicieusement crémeux.
        <br /><br />En prime, créez votre fiche recette en PDF : parce que partager,
        c'est bien, mais garder jalousement sa recette de génie, c'est mieux !
      </p>
    </div>
    <button
      class=" w-60 ml-20 border bg-raspberry rounded-lg p-4 text-5xl font-medium text-white font-sacramento"
      @click="goToStep1()"
    >
      Andiamo
    </button>
  </div>
</template>

<style setup>
.neonText {
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #e7414d,
    0 0 21px #e7414d,
    0 0 42px #e7414d,
    0 0 82px #e7414d,
    0 0 92px #e7414d,
    0 0 102px #e7414d,
    0 0 151px #e7414d;
}
</style>
