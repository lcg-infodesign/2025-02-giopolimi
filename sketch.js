let headerHeight = 180;
let legendHeight = 220;
let table;

function preload() {
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  let outerPadding = 20;
  let padding = 40;
  let itemSize = 60;
  let headerHeight = 180;
  let legendHeight = 280;
  
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  let rows = ceil(table.getRowCount() / cols);
  
  let totalHeight = outerPadding * 2 + headerHeight + legendHeight + rows * itemSize + (rows - 1) * padding + 60;
  
  createCanvas(windowWidth, totalHeight);
  background(238, 222, 197);
  
  // Disegna il titolo
  drawHeader(headerHeight);
  
  // Disegna la legenda a destra
  drawLegend(headerHeight, legendHeight);
  
  // Calcola la larghezza totale della griglia
  let gridWidth = cols * (itemSize + padding) - padding;
  let gridStartX = (windowWidth - gridWidth) / 2; // centra orizzontalmente
  let startY = headerHeight + legendHeight + outerPadding;
  
  let colCount = 0;
  let rowCount = 0;
  
  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {
    let data = table.getRow(rowNumber).obj;
    
    // posizione base del quadrato invisibile per posizionare ogni glifo
    let xPos = gridStartX + colCount * (itemSize + padding);
    let yPos = startY + rowCount * (itemSize + padding);
    
    // centro fisso del quadrato
    let centerX = xPos + itemSize / 2;
    let centerY = yPos + itemSize / 2;
    
    // chiama la funzione che disegna la foglia
    drawLeaf(centerX, centerY, data);
    
    // avanzamento colonna
    colCount++;
    if (colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}

function drawHeader(headerHeight) {
  push();
  // Titolo
  fill(101, 67, 33);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(32);
  textStyle(BOLD);
  text("Assigment 2: Glyph Sistem", 100, 100);
  
  // Descrizione del compito - allineata a sinistra
  textSize(21);
  textStyle(NORMAL);
  fill(120, 90, 60);
  let description = "Creazione di una funzione che genera glifi riconoscibili";
  let description1 = "come parte dello stesso linguaggio visivo,";
  let description2 = "utilizzando trasformazioni geometriche e mapping dei dati";
  let description3 = "per creare variazioni uniche ma coerenti.";
  text(description, 100, 175);
  text(description1, 100, 200);
  text(description2, 100, 225);
  text(description3, 100, 250);
  pop();
}

function drawLegend(startY, legendHeight) {
  let boxWidth = 500;
  let boxX = windowWidth - boxWidth - 100;
  let boxStartY = 80;
  
  // Box della legenda con trasparenza e ombra esterna
  push();
  // imposta trasparenza del riempimento
  fill(255, 250, 245, 180);
  // bordo leggermente più tenue
  stroke(180, 150, 120, 180);
  strokeWeight(2);
  // aggiungo ombra esterna
  drawingContext.shadowOffsetX = 4;
  drawingContext.shadowOffsetY = 6;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 0, 0, 60);
  rect(boxX, boxStartY + 20, boxWidth, legendHeight - 40, 10);
  pop();
  
  // Titolo legenda
  fill(101, 67, 33);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  textStyle(BOLD);
  text("Legenda delle Variabili", boxX + 20, boxStartY + 35);
  
  textSize(13);
  textStyle(NORMAL);
  fill(80, 60, 40);
  let yOffset = boxStartY + 70;
  let lineHeight = 35;
  
  // Colonna 0
  textStyle(BOLD)
  text("• Colonna 0 (Dimensione):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Controlla la grandezza della foglia sulla base dei valori", boxX + 40, yOffset + 18);
  
  // Colonna 1
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 1 (Rotazione):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Angolo di rotazione della foglia sulla base dei valori", boxX + 40, yOffset + 18);
  
  // Colonna 2
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 2 (Forma Bordi):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Valori positivi = bordi arrotondati, Valori negativi = bordi appuntiti", boxX + 40, yOffset + 18);
  
  // Colonna 3
  textStyle(BOLD)
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 3 (Tipo di Foglia):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Valori pari = foglia ovale liscia, Valori dispari = foglia lobata", boxX + 40, yOffset + 18);
  
  // Colonna 4 - con rettangolini colorati
  textStyle(BOLD)
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 4 (Colore):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Gradiente da:  MAX        a MIN", boxX + 40, yOffset + 18);
  
  // Disegna i rettangolini colorati
  let colorBoxSize = 16;
  let color1 = color('#792318');
  text("max")
  let color2 = color('#FFC249');
  
  // Primo colore
  fill(color1);
  stroke(80, 60, 40);
  strokeWeight(1);
  rect(boxX + 160, yOffset + 15, colorBoxSize, colorBoxSize);
  
  // Secondo colore
  fill(color2);
  stroke(80, 60, 40);
  strokeWeight(1);
  rect(boxX + 202 + colorBoxSize + 8, yOffset + 15, colorBoxSize, colorBoxSize);
  
  // Testo descrizione
  fill(100, 80, 60);
  textSize(13);
  pop();
}

function drawLeaf(centerX, centerY, data) {
  // COLONNA 0: Determina la grandezza della foglia
  let sizeValue = data["column0"];
  let allSizeValues = table.getColumn("column0");
  let sizeMin = min(allSizeValues);
  let sizeMax = max(allSizeValues);
  let leafSize = map(sizeValue, sizeMin, sizeMax, 20, 50);
  
  // COLONNA 1: Determina la rotazione della foglia
  let rotationValue = data["column1"];
  let allRotationValues = table.getColumn("column1");
  let rotationMin = min(allRotationValues);
  let rotationMax = max(allRotationValues);
  let rotation = map(rotationValue, rotationMin, rotationMax, -PI / 3, PI / 3);
  
  // COLONNA 2: Determina il tipo di bordi (positivo = arrotondato, negativo = appuntito)
  let edgeValue = data["column2"];
  let isRounded = (edgeValue >= 0);
  
  // COLONNA 3: Determina il tipo di foglia (pari = ovale, dispari = lobata)
  let typeValue = data["column3"];
  let isEven = (typeValue % 2 == 0);
  
  // COLONNA 4: Determina il colore con lerpColor tra #792318 e #C89839
  let colorValue = data["column4"];
  let allColorValues = table.getColumn("column4");
  let colorMin = min(allColorValues);
  let colorMax = max(allColorValues);
  let colorMapped = map(colorValue, colorMin, colorMax, 0, 1);
  
  // Colore da #792318 (rosso scuro) a #FFC249 (oro)
  let color1 = color('#792318');
  let color2 = color('#FFC249');
  let leafColor = lerpColor(color1, color2, colorMapped);
  
  push();
  translate(centerX, centerY);
  rotate(rotation);
  
  // Disegna la foglia in base al tipo
  fill(leafColor);
  stroke(red(leafColor) * 0.7, green(leafColor) * 0.7, blue(leafColor) * 0.7);
  strokeWeight(1.5);
  
  if (isEven) {
    // Foglia ovale liscia
    drawOvalLeaf(0, 0, leafSize, isRounded);
  } else {
    // Foglia lobata
    drawLobedLeaf(0, 0, leafSize, isRounded);
  }
  
  // Nervatura centrale
  stroke(red(leafColor) * 0.5, green(leafColor) * 0.5, blue(leafColor) * 0.5);
  strokeWeight(2);
  line(0, -leafSize / 2, 0, leafSize / 2);
  
  // Nervature secondarie
  strokeWeight(1);
  let numVeins = 4;
  for (let i = 1; i <= numVeins; i++) {
    let veinY = map(i, 1, numVeins, -leafSize / 3, leafSize / 3);
    let veinLength = leafSize * 0.6 * 0.3;
    line(0, veinY, -veinLength, veinY - veinLength * 0.3);
    line(0, veinY, veinLength, veinY - veinLength * 0.3);
  }
  
  pop();
}

// Foglia ovale liscia
function drawOvalLeaf(x, y, size, isRounded) {
  if (isRounded) {
    // Bordi arrotondati - curvatura più morbida
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6;
      let yOffset = sin(angle) * r;
      curveVertex(x + xOffset, y + yOffset);
    }
    // Chiudi la curva aggiungendo i primi punti
    for (let angle = 0; angle < 0.3; angle += 0.1) {
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6;
      let yOffset = sin(angle) * r;
      curveVertex(x + xOffset, y + yOffset);
    }
    endShape();
  } else {
    // Bordi appuntiti - forma più angolare
    beginShape();
    let numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      let angle = map(i, 0, numPoints, 0, TWO_PI);
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6;
      let yOffset = sin(angle) * r;
      vertex(x + xOffset, y + yOffset);
    }
    endShape(CLOSE);
  }
}

// Foglia lobata
function drawLobedLeaf(x, y, size, isRounded) {
  if (isRounded) {
    // Bordi arrotondati - lobi morbidi
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let r = size / 2;
      let lobes = 5;
      let lobeDepth = 0.2;
      let radiusVariation = 1 + lobeDepth * sin(angle * lobes);
      let xOffset = cos(angle) * r * 0.6 * radiusVariation;
      let yOffset = sin(angle) * r * radiusVariation;
      curveVertex(x + xOffset, y + yOffset);
    }
    // Chiudi la curva
    for (let angle = 0; angle < 0.3; angle += 0.1) {
      let r = size / 2;
      let lobes = 5;
      let lobeDepth = 0.2;
      let radiusVariation = 1 + lobeDepth * sin(angle * lobes);
      let xOffset = cos(angle) * r * 0.6 * radiusVariation;
      let yOffset = sin(angle) * r * radiusVariation;
      curveVertex(x + xOffset, y + yOffset);
    }
    endShape();
  } else {
    // Bordi appuntiti - lobi angolari
    beginShape();
    let numPoints = 25;
    for (let i = 0; i < numPoints; i++) {
      let angle = map(i, 0, numPoints, 0, TWO_PI);
      let r = size / 2;
      let lobes = 5;
      let lobeDepth = 0.3;
      let radiusVariation = 1 + lobeDepth * sin(angle * lobes);
      let xOffset = cos(angle) * r * 0.6 * radiusVariation;
      let yOffset = sin(angle) * r * radiusVariation;
      vertex(x + xOffset, y + yOffset);
    }
    endShape(CLOSE);
  }
}

function draw() {
  // vuoto, tutto disegnato in setup
}