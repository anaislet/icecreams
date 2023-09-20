<script setup lang="js">
import { onBeforeMount, onMounted } from "vue";
import ScoopComponent from "../components/ScoopComponent.vue";
import { useSelectionStore } from "@/stores/selection";
import { PDFDocument, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';
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

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16)/255,
    green: parseInt(result[2], 16)/255,
    blue: parseInt(result[3], 16)/255
  } : null;
}

async function editPDF() {

  // Créez un nouveau document PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);

  // Chargez les polices personnalisées depuis un fichier
  const customFontBytesMontserrat = await fetch('../src/assets/Montserrat-VariableFont_wght.ttf').then((response) => response.arrayBuffer());
  const customFontBytesSacramento = await fetch('../src/assets/Sacramento-Regular.ttf').then((response) => response.arrayBuffer());
  pdfDoc.registerFontkit(fontkit);
  const customFontSacramento = await pdfDoc.embedFont(customFontBytesSacramento);
  const customFontMontserrat = await pdfDoc.embedFont(customFontBytesMontserrat);


  // Ajouter un titre centré sur la page
  const pageWidth = page.getSize().width
  const pageHeight = page.getSize().height;
  const titleWidth = customFontSacramento.widthOfTextAtSize(this.title, 40);
  const centerX = (pageWidth - titleWidth) / 2;

  page.drawText(this.title, { 
    x: centerX,
    y: 770,
    size: 40,
    font: customFontSacramento,
    color: rgb(0.2196, 0.2196, 0.2196) 
  });

  // Définissez les coordonnées des cercles et l'image
  const circles = [
    { x: 240, y: 620, radius: 60, color: hexToRgb(selectionStore.flavours[0].color) },
    { x: 300, y: 670, radius: 60, color: hexToRgb(selectionStore.flavours[1].color) },
    { x: 320, y: 590, radius: 60, color: hexToRgb(selectionStore.flavours[2].color) },
  ];

  // Ajoutez les cercles au document
  for (const circle of circles) {
    page.drawCircle({
      x: circle.x,
      y: circle.y,
      size: circle.radius,
      color: rgb(circle.color.red, circle.color.green, circle.color.blue),
      borderWidth: 0,
    });
  }

  // Ajouter le cornet de glace
  const imageUrl = 'https://media.istockphoto.com/id/621260058/fr/photo/c%C3%B4ne-de-wafer-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=3XVFyIuLd-r2Mh83n-oagQdEdqiumMadb2RjOk_u6Zs=';

  const imageBytes = await fetch(imageUrl).then((response) => response.arrayBuffer());
  const image = await pdfDoc.embedJpg(imageBytes);
  page.drawImage(image, {
    x: 90,
    y: 300,
    opacity: 0.5,
    width: 320,
    height: 320,
    rotation: 0,
  });

  // Ajouter les parfums sélectionnés
  const leftMargin = 60;
  const rightMargin = 60;
  const availableWidth = pageWidth - (leftMargin + rightMargin);

  const flavor0 = selectionStore.flavours[0].name
  const flavor1 = selectionStore.flavours[1].name
  const flavor2 = selectionStore.flavours[2].name

  const flavor0Width = customFontMontserrat.widthOfTextAtSize(flavor0, 20);
  const flavor1Width = customFontMontserrat.widthOfTextAtSize(flavor1, 20);
  const flavor2Width = customFontMontserrat.widthOfTextAtSize(flavor2, 20);
  const totalWidth = flavor0Width + flavor1Width + flavor2Width + 20

if(totalWidth < availableWidth) {
  const flavors = flavor0 + ' - ' + flavor1 + ' - ' + flavor2
  const centerXFlavors = (pageWidth - totalWidth) / 2;
  page.drawText(flavors, { x: centerXFlavors, y: 234, size: 20, font: customFontMontserrat, color: rgb(0, 0, 0) });

}
else {
  const centerXFlavor0 = (pageWidth - flavor0Width) / 2;
  const centerXFlavor1 = (pageWidth - flavor1Width) / 2;
  const centerXFlavor2 = (pageWidth - flavor2Width) / 2;

  page.drawText(flavor0, { 
    x: centerXFlavor0,
    y: 258,
    size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });

  page.drawText(flavor1, { 
    x: centerXFlavor1,
    y: 234,
    size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });

  page.drawText(flavor2, { 
    x: centerXFlavor2,
    y: 210,
    size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });
}
  // Ajouter les informations de présence d'alcool ou de gluten

  const withAlcool = 'Cette coupe glacée contient de l\'alcool.'
  const withoutAlcool = 'Cette coupe glacée ne contient pas d\'alcool.'
  const withGluten = 'Cette coupe glacée contient du gluten.'
  const withoutGluten = 'Cette coupe glacée ne contient pas de gluten.'

  const alcoolWidth = customFontMontserrat.widthOfTextAtSize(withAlcool, 10);
  const centerXWithAlcool = (pageWidth - alcoolWidth) / 2;

  const NoAlcoolWidth = customFontMontserrat.widthOfTextAtSize(withoutAlcool, 10);
  const centerXWithoutAlcool = (pageWidth - NoAlcoolWidth) / 2;

  const glutenWidth = customFontMontserrat.widthOfTextAtSize(withGluten, 10);
  const centerXGluten = (pageWidth - glutenWidth) / 2;

  const NoGlutenWidth = customFontMontserrat.widthOfTextAtSize(withoutGluten, 10);
  const centerXWithoutGluten = (pageWidth - NoGlutenWidth) / 2;

if(this.alcool ==  true) {
  page.drawText(withAlcool, { 
    x: centerXWithAlcool,
    y: 95,
    size: 10,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });
}
else {
  page.drawText(withoutAlcool, { 
    x: centerXWithoutAlcool,
    y: 95,
    size: 10,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });
}

if(this.gluten == true) {
  page.drawText(withGluten, { 
    x: centerXGluten,
    y: 80,
    size: 10,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });
}
else {
  page.drawText(withoutGluten, { 
    x: centerXWithoutGluten,
    y: 80,
    size: 10,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
  });
}

  // Ajouter les informations nutritionnelles
  const borderNutriWidth = 1;

  page.drawRectangle({
    x: 40,
    y: 65,
    width: pageWidth-80,
    height: 100,
    borderWidth: borderNutriWidth,
    borderColor: rgb(0.2196, 0.2196, 0.2196),
    opacity: 0.5,
    borderDashArray: []
  });

  const TotalCal = 'Total calories : ' + this.total.totalCal + ' kcal'
  const TotalMg = 'Total matières grasses : ' + this.total.totalMg + ' g' 
  const TotalProt = 'Total protéine : ' + this.total.totalProt + ' g'
  const TotalGlu = 'Total glucide : ' + this.total.totalGlu + ' g'
  
  page.drawText(TotalCal, { x: 60, y: 145, size: 10, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });
  page.drawText(TotalMg, { x: 60, y: 125, size: 10, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });
  page.drawText(TotalProt, { x: 340, y: 145, size: 10, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });
  page.drawText(TotalGlu, { x: 340, y: 125, size: 10, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });

  // Ajouter un cadre
  const borderWidth = 3;

  const raspberryColor = {red : 231, green : 65, blue : 77}
  page.drawRectangle({
    x: 20,
    y: 20,
    width: pageWidth-40,
    height: pageHeight-40,
    borderWidth: borderWidth,
    borderColor: rgb(raspberryColor.red/255, raspberryColor.green/255, raspberryColor.blue/255),
    opacity: 0.5,
    borderDashArray: []
  });

  // Ajouter une signature
  page.drawText('Gelato Creazioni', { 
    x: 478,
    y: 30,
    size: 16,
    font: customFontSacramento,
    color: rgb(raspberryColor.red/255, raspberryColor.green/255, raspberryColor.blue/255), 
  });

  // Enregistrez le document PDF généré
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'fiche_recette.pdf';
  a.style.display = 'none';


  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
}

</script>

<template>
  <div class="w-screen h-screen bg-raspberry-light">
    <h1 class="text-7xl font-sacramento pt-10 pl-10 neonText" id="title3">
      Ma création
    </h1>
    <div class="flex flex-row h-5/6">
      <div class="flex flex-col w-1/2 h-full bg-beige my-10 mx-10 items-center rounded">
        <div v-if="title == ''" class="h-[140px]"></div>
        <h2 v-else class="text-6xl font-sacramento my-[40px]">{{ title }}</h2>
        <ScoopComponent
          v-for="flavour in selectionStore.flavours"
          :color="flavour.color"
        />
        <div class="flex flex-row gap-10 my-auto">
          <h2 v-for="flavour in selectionStore.flavours" class="font-montserrat font-light text-2xl">
            {{ flavour.name }}
          </h2>
        </div>
      </div>
      <div
        class="flex flex-col w-1/2 h-full bg-beige my-10 mr-10 pl-10 items-start justify-around rounded"
      >
      <div>
        <h1 class="mb-2 font-montserrat font-light text-2xl">Je choisis un nom pour ma coupe glacée :</h1>
        <input
          type="text"
          placeholder="Donner un titre à votre composition (max 40 carac.)"
          maxlength="40"
          class="h-20 w-full border p-3 font-montserrat font-light text-2xl"
          v-model="title"
        />
      </div>
        <div v-if="selectionStore.compositionCount == 1" class="mb-2 font-montserrat font-medium text-2xl text-raspberry">Vous êtes le.a premier.ère à avoir créé cette coupe glacée !</div>
        <div v-else class="mb-2 font-montserrat font-medium text-2xl text-raspberry">Vous êtes le.a {{ selectionStore.compositionCount }}ème à avoir créé cette coupe glacée !</div>
        <div class="mb-2 font-montserrat font-light text-lg flex flex-col gap-3">
          <p v-if="alcool == true">⚠️ Cette coupe glacée contient de l'alcool.</p>
          <p v-else>✔️ Cette coupe glacée ne contient pas d'alcool.</p>
          <p v-if="gluten == true">⚠️ Cette coupe glacée contient du gluten.</p>
          <p v-else>✔️ Cette coupe glacée ne contient pas de gluten.</p>
        </div>
        <div class="mb-2 font-montserrat font-light text-lg">
          <p class="mb-3">Informations nutritionnelles concernant ma coupe glacée :</p>
          <p>Total calories : {{ total.totalCal }} kcal</p>
          <p>Total matières grasses : {{ total.totalMg }} g</p>
          <p>Total protéine : {{ total.totalProt }} g</p>
          <p>Total glucide : {{ total.totalGlu }} g</p>
        </div>
        <button
          class="border bg-raspberry rounded-lg p-4 text-5xl mt-10 font-medium text-white font-sacramento"
          @click="editPDF()"
        >
          Editer ma fiche recette
        </button>
      </div>
    </div>
  </div>
</template>
