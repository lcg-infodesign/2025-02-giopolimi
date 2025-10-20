let table;

function preload() {
  // carica il dataset CSV
  table = loadTable("dataset.csv", "csv", "header");
}

function setup() {
  let outerPadding = 20;
  let padding = 40;
  let itemSize = 60;
  let headerHeight = 180;
  let legendHeight = 280;
  
  // calcola il numero di colonne e righe per la griglia
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));
  let rows = ceil(table.getRowCount() / cols);
  
  // calcola l'altezza totale del canvas
  let totalHeight = outerPadding * 2 + headerHeight + legendHeight + rows * itemSize + (rows - 1) * padding + 60;
  
  createCanvas(windowWidth, totalHeight);
  background(238, 222, 197);
  
  // per verificare che il CSV sia caricato correttamente
  if (table.getRowCount() === 0) { // verifica che il numero di righe sia esattamente zero, senza conversioni di tipo
    fill(255, 0, 0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("ERRORE: Il file dataset.csv non è stato caricato correttamente", windowWidth / 2, windowHeight / 2);
    return;
  }
  
  // funzione che disegna il titolo
  drawHeader(headerHeight);
  
  // funzione che disegna la legenda a destra
  drawLegend(headerHeight, legendHeight);
  
  // calcola la larghezza totale della griglia e centra orizzontalmente
  let gridWidth = cols * (itemSize + padding) - padding;
  let gridStartX = (windowWidth - gridWidth) / 2;
  let startY = headerHeight + legendHeight + outerPadding;
  
  let colCount = 0;
  let rowCount = 0;
  

  for (let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) { // ciclo su ogni riga del dataset per disegnare i glifi
    let data = table.getRow(rowNumber).obj; // prendo i dati della riga corrente dal CSV (solo obj)
    
    // calcola la posizione base del quadrato invisibile per posizionare ogni glifo
    let xPos = gridStartX + colCount * (itemSize + padding);
    let yPos = startY + rowCount * (itemSize + padding);
    
    // trovo il centro del quadrato (pivot per rotazioni e trasformazioni)
    let centerX = xPos + itemSize / 2;
    let centerY = yPos + itemSize / 2;
    
    // funzione che disegna il glifo (foglia) usando i dati della riga
    drawLeaf(centerX, centerY, data);
    
    // avanza alla colonna successiva
    colCount++;
  
    if (colCount == cols) { // se la riga è finita passo alla riga successiva
      colCount = 0;
      rowCount++;
    }
  }
}


// funzione che disegna l'intestazione con titolo e descrizione del progetto
function drawHeader(headerHeight) {
  push();
  // titolo
  fill(101, 67, 33);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(32);
  textStyle(BOLD);
  text("Assignment 2: Glyph System", 100, 100);
  
  // descrizione del compito
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

// funzione che disegna la legenda
function drawLegend(startY, legendHeight) {
  let boxWidth = 500;
  let boxX = windowWidth - boxWidth - 100;
  let boxStartY = 80;
  
  // impostazioni per trasparenza e ombra esterna
  push();
  fill(255, 250, 245, 180);
  stroke(180, 150, 120, 180);
  strokeWeight(2);
  // aggiungi ombra esterna per effetto di profondità
  drawingContext.shadowOffsetX = 4;
  drawingContext.shadowOffsetY = 6;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(0, 0, 0, 60);
  rect(boxX, boxStartY + 20, boxWidth, legendHeight - 40, 10);
  pop();
  
  // titolo della legenda
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
  
  // colonna 0 - dimensione
  textStyle(BOLD);
  text("• Colonna 0 (Dimensione):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Controlla la grandezza della foglia sulla base dei valori", boxX + 40, yOffset + 18);
  
  // colonna 1 - rotazione
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 1 (Rotazione):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Angolo di rotazione della foglia sulla base dei valori", boxX + 40, yOffset + 18);
  
  // colonna 2 - forma bordi
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 2 (Forma Bordi):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Valori positivi = bordi arrotondati, Valori negativi = bordi appuntiti", boxX + 40, yOffset + 18);
  
  // colonna 3 - tipo di foglia
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 3 (Tipo di Foglia):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Valori pari = foglia ovale liscia, Valori dispari = foglia lobata", boxX + 40, yOffset + 18);
  
  // colonna 4 - colore con campioni visivi
  textStyle(BOLD);
  fill(80, 60, 40);
  yOffset += lineHeight;
  text("• Colonna 4 (Colore):", boxX + 20, yOffset);
  textStyle(ITALIC);
  fill(100, 80, 60);
  text("Gradiente da:  MAX        a MIN", boxX + 40, yOffset + 18);
  
  // Disegna i rettangolini colorati per mostrare il gradiente
  let colorBoxSize = 16;
  let color1 = color('#792318');
  let color2 = color('#FFC249');
  
  // Campione colore massimo
  fill(color1);
  stroke(80, 60, 40);
  strokeWeight(1);
  rect(boxX + 161, yOffset + 15, colorBoxSize, colorBoxSize);
  
  // Campione colore minimo
  fill(color2);
  stroke(80, 60, 40);
  strokeWeight(1);
  rect(boxX + 202 + colorBoxSize + 8, yOffset + 15, colorBoxSize, colorBoxSize);
  
  pop();
}

// funzione che disegna le foglie
function drawLeaf(centerX, centerY, data) {
  
  // COLONNA 0: mappa il valore sulla dimensione della foglia
  let sizeValue = data["column0"];
  let allSizeValues = table.getColumn("column0");
  let sizeMin = min(allSizeValues);
  let sizeMax = max(allSizeValues);
  let leafSize = map(sizeValue, sizeMin, sizeMax, 20, 50);
  
  // COLONNA 1: mappa il valore sull'angolo di rotazione cambiando orientamento glifi
  let rotationValue = data["column1"];
  let allRotationValues = table.getColumn("column1");
  let rotationMin = min(allRotationValues);
  let rotationMax = max(allRotationValues);
  let rotation = map(rotationValue, rotationMin, rotationMax, -PI / 3, PI / 3);
  
  // COLONNA 2: determina il tipo di bordi (positivo = arrotondato, negativo = appuntito) - variabile booleana
  let edgeValue = data["column2"];
  let isRounded = (edgeValue >= 0);
  
  // COLONNA 3: determina il tipo di foglia (pari = ovale, dispari = lobata) - variabile booleana
  let typeValue = data["column3"];
  let isEven = (typeValue % 2 == 0);
  
  // COLONNA 4: mappa il valore su un gradiente di colore con funzione lerpColor
  let colorValue = data["column4"];
  let allColorValues = table.getColumn("column4");
  let colorMin = min(allColorValues);
  let colorMax = max(allColorValues);
  let colorMapped = map(colorValue, colorMin, colorMax, 0, 1);
  
  let color1 = color('#792318');
  let color2 = color('#FFC249');
  let leafColor = lerpColor(color1, color2, colorMapped);
  
  // applica le trasformazioni geometriche
  push();
  translate(centerX, centerY); // sposta l'origine al centro del glifo
  rotate(rotation); // ruota in base ai dati della colonna 1
  
  // stile del glifo
  fill(leafColor);
  stroke(red(leafColor) * 0.7, green(leafColor) * 0.7, blue(leafColor) * 0.7);
  strokeWeight(1.5);
  
  // disegna la forma della foglia in base al tipo (colonna 3)
  if (isEven) {
    drawOvalLeaf(0, 0, leafSize, isRounded);
  } else {
    drawLobedLeaf(0, 0, leafSize, isRounded);
  }
  
  // nervatura centrale (dettagli)
  stroke(red(leafColor) * 0.5, green(leafColor) * 0.5, blue(leafColor) * 0.5);
  strokeWeight(2);
  line(0, -leafSize / 2, 0, leafSize / 2);
  
  // nervature secondarie (dettagli)
  strokeWeight(1);
  let numVeins = 4;
  for (let i = 1; i <= numVeins; i++) {
    let veinY = map(i, 1, numVeins, -leafSize / 3, leafSize / 3);
    let veinLength = leafSize * 0.6 * 0.3;
    line(0, veinY, -veinLength, veinY - veinLength * 0.3);
    line(0, veinY, veinLength, veinY - veinLength * 0.3);
  }
  
  pop(); // ripristina le trasformazioni
}

// disegna una foglia ovale liscia
function drawOvalLeaf(x, y, size, isRounded) {
  if (isRounded) {
    // bordi arrotondati
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6; // forma ellittica (più stretta)
      let yOffset = sin(angle) * r;
      curveVertex(x + xOffset, y + yOffset); // per curvature morbide
    }
    // chiudi la curva aggiungendo i primi punti
    for (let angle = 0; angle < 0.3; angle += 0.1) {
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6;
      let yOffset = sin(angle) * r;
      curveVertex(x + xOffset, y + yOffset);
    }
    endShape();
  } else {
    // bordi appuntiti 
    beginShape();
    let numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      let angle = map(i, 0, numPoints, 0, TWO_PI);
      let r = size / 2;
      let xOffset = cos(angle) * r * 0.6;
      let yOffset = sin(angle) * r;
      vertex(x + xOffset, y + yOffset); // forma più angolare
    }
    endShape(CLOSE);
  }
}

// disegna una foglia lobata (dentellature)
function drawLobedLeaf(x, y, size, isRounded) {
  if (isRounded) {
    // bordi arrotondati (lobi morbidi creati con variazione sinusoidale del raggio)
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      let r = size / 2;
      let lobes = 5; // n° lobi
      let lobeDepth = 0.2; // profondità lobi
      let radiusVariation = 1 + lobeDepth * sin(angle * lobes);
      let xOffset = cos(angle) * r * 0.6 * radiusVariation;
      let yOffset = sin(angle) * r * radiusVariation;
      curveVertex(x + xOffset, y + yOffset);
    }
    // chiudi la curva
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
    // bordi appuntiti
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
      vertex(x + xOffset, y + yOffset); // lobi angolari
    }
    endShape(CLOSE);
  }
}

function draw() {
  // Vuoto - tutto viene disegnato in setup()
}