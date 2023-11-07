import { PDFDocument, rgb } from 'pdf-lib';
import * as fontkit from 'fontkit';

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        red: parseInt(result[1], 16)/255,
      green: parseInt(result[2], 16)/255,
      blue: parseInt(result[3], 16)/255
    } : null;
}
 
export async function editPDF(title, total, alcool, gluten, flavors) {

    // Créez un nouveau document PDF
const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([595.28, 841.89]);
const pageWidth = page.getSize().width
const pageHeight = page.getSize().height;

// Chargez les polices personnalisées depuis un fichier
const customFontBytesMontserrat = await fetch('/Montserrat-VariableFont_wght.ttf').then((response) => response.arrayBuffer());
const customFontBytesSacramento = await fetch('/Sacramento-Regular.ttf').then((response) => response.arrayBuffer());
pdfDoc.registerFontkit(fontkit);
const customFontSacramento = await pdfDoc.embedFont(customFontBytesSacramento);
const customFontMontserrat = await pdfDoc.embedFont(customFontBytesMontserrat);

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

// Ajouter un titre centré sur la page
const titleWidth = customFontSacramento.widthOfTextAtSize(title, 50);
const centerX = (pageWidth - titleWidth) / 2;

page.drawText(title, { 
    x: centerX,
    y: 770,
    size: 50,
    font: customFontSacramento,
    color: rgb(0.2196, 0.2196, 0.2196) 
});

// Ajouter le cornet de glace
const imageUrl = 'https://media.istockphoto.com/id/621260058/fr/photo/c%C3%B4ne-de-wafer-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=3XVFyIuLd-r2Mh83n-oagQdEdqiumMadb2RjOk_u6Zs=';

const imageBytes = await fetch(imageUrl).then((response) => response.arrayBuffer());
const image = await pdfDoc.embedJpg(imageBytes);
page.drawImage(image, {
    x: 90,
    y: 300,
    width: 320,
    height: 320,
    rotation: 0,
});

// Définissez les coordonnées des cercles
const circles = [
    { x: 240, y: 602, radius: 60, color: hexToRgb(flavors[0].color) },
    { x: 300, y: 652, radius: 60, color: hexToRgb(flavors[1].color) },
    { x: 320, y: 572, radius: 60, color: hexToRgb(flavors[2].color) },
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

// Ajouter les parfums sélectionnés
const leftMargin = 60;
const rightMargin = 60;
const availableWidth = pageWidth - (leftMargin + rightMargin);

const flavor0 = flavors[0].name
const flavor1 = flavors[1].name
const flavor2 = flavors[2].name

const flavor0Width = customFontMontserrat.widthOfTextAtSize(flavor0, 20);
const flavor1Width = customFontMontserrat.widthOfTextAtSize(flavor1, 20);
const flavor2Width = customFontMontserrat.widthOfTextAtSize(flavor2, 20);
const totalWidth = flavor0Width + flavor1Width + flavor2Width + 20

if(totalWidth < availableWidth) {
    const flavors = flavor0 + ' - ' + flavor1 + ' - ' + flavor2
    const centerXFlavors = (pageWidth - totalWidth) / 2;
    page.drawText(flavors, { x: centerXFlavors, y: 254, size: 20, font: customFontMontserrat, color: rgb(0, 0, 0) });
    
}
else {
    const centerXFlavor0 = (pageWidth - flavor0Width) / 2;
    const centerXFlavor1 = (pageWidth - flavor1Width) / 2;
    const centerXFlavor2 = (pageWidth - flavor2Width) / 2;
    
    page.drawText(flavor0, { 
        x: centerXFlavor0,
        y: 278,
        size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
});

page.drawText(flavor1, { 
    x: centerXFlavor1,
    y: 254,
    size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
});

page.drawText(flavor2, { 
    x: centerXFlavor2,
    y: 230,
    size: 20,
    font: customFontMontserrat,
    color: rgb(0, 0, 0) 
});
}

// Ajouter les informations nutritionnelles
const borderNutriWidth = 0.1;

page.drawRectangle({
    x: 40,
    y: 85,
    width: pageWidth-80,
    height: 110,
    borderWidth: borderNutriWidth,
    borderColor: rgb(0.3764, 0.3764, 0.3764),
    opacity: 0.5,
    borderDashArray: []
});

const TotalCal = 'Total calories : ' + total.totalCal + ' kcal'
const TotalMg = 'Total matières grasses : ' + total.totalMg + ' g' 
const TotalProt = 'Total protéine : ' + total.totalProt + ' g'
const TotalGlu = 'Total glucide : ' + total.totalGlu + ' g'

page.drawText(TotalCal, { x: 60, y: 175, size: 15, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });
page.drawText(TotalMg, { x: 60, y: 155, size: 15, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196) });
page.drawText(TotalProt, { x: 400, y: 175, size: 15, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196), alignment: 'right' });
page.drawText(TotalGlu, { x: 400, y: 155, size: 15, font: customFontMontserrat, color: rgb(0.2196, 0.2196, 0.2196), alignment: 'right' });

// Ajouter les informations de présence d'alcool ou de gluten
const withAlcool = 'Cette coupe glacée contient de l\'alcool.'
const withoutAlcool = 'Cette coupe glacée ne contient pas d\'alcool.'
const withGluten = 'Cette coupe glacée contient du gluten.'
const withoutGluten = 'Cette coupe glacée ne contient pas de gluten.'

if(alcool ==  true) {
    page.drawText(withAlcool, { 
        x: 60,
        y: 115,
        size: 15,
        font: customFontMontserrat,
        color: rgb(0.2196, 0.2196, 0.2196) 
    });
}
else {
    page.drawText(withoutAlcool, { 
    x: 60,
    y: 115,
    size: 15,
    font: customFontMontserrat,
    color: rgb(0.2196, 0.2196, 0.2196) 
});
}

if(gluten == true) {
    page.drawText(withGluten, { 
        x: 60,
        y: 100,
        size: 15,
        font: customFontMontserrat,
        color: rgb(0.2196, 0.2196, 0.2196)
    });
}
else {
    page.drawText(withoutGluten, { 
        x: 60,
        y: 100,
        size: 15,
        font: customFontMontserrat,
        color: rgb(0.2196, 0.2196, 0.2196) 
    });
}

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
