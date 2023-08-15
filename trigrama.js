// Importar el módulo fs (sistema de archivos) para trabajar con archivos
const fs = require('fs');

// Función que lee el archivo y genera los trigramas
function getTrigrams(filename) {
    let trigrams = {}; // Objeto para almacenar los trigramas
    let text = fs.readFileSync(filename, 'utf8'); // Leer el contenido del archivo en formato UTF-8
    // Reemplazar todas las secuencias de escape \r\n por espacios en blanco
    text = text.replace(/\r\n/g, ' ');
    let words = text.split(' '); // Dividir el texto en palabras

    // Generar trigramas a partir de las palabras
    for (let i = 0; i < words.length - 2; i++) {
        let bigram = words[i] + ' ' + words[i + 1]; // Crear un bigrama
        let trigram = words[i + 2]; // Tomar la palabra siguiente como trigram

        if (!trigrams[bigram]) {
            trigrams[bigram] = []; // Inicializar un array si el bigrama no existe en los trigramas
        }

        trigrams[bigram].push(trigram); // Agregar el trigram al array correspondiente
    }

    return trigrams; // Devolver el objeto de trigramas generado
}

// Función que genera nuevo texto a partir de los trigramas
function generateText(trigrams, startBigram, longitud) {
    let newText = startBigram; // Inicializar el nuevo texto con el bigrama inicial

    // Generar el texto con la longitud deseada
    for (let i = 0; i < longitud; i++) {
        let bigram = newText.split(' ').slice(-2).join(' '); // Tomar los dos últimos términos del texto como bigrama

        if (!trigrams[bigram]) break; // Detener si no hay trigramas disponibles para el bigrama actual

        let options = trigrams[bigram]; // Obtener las opciones de trigramas para el bigrama actual
        let nextWord = options[Math.floor(Math.random() * options.length)]; // Elegir una palabra siguiente aleatoriamente

        newText += ' ' + nextWord; // Agregar la palabra siguiente al nuevo texto
    }

    return newText; // Devolver el texto generado
}

// Obtener trigramas del archivo de texto 'texto.txt'
let trigrams = getTrigrams('texto.txt');

// Obtener el par inicial y la longitud desde la línea de comandos
let startBigram = process.argv[2]; // Tomar el segundo argumento de la línea de comandos
let longitud = parseInt(process.argv[3]) - 2; // Tomar el tercer argumento y restar 2 para ajustar la longitud

// Generar texto utilizando los trigramas, el bigrama inicial y la longitud especificada
let generatedText = generateText(trigrams, startBigram, longitud);

// Mostrar los trigramas obtenidos del archivo y el texto generado
console.log(getTrigrams('texto.txt'));
console.log(generatedText);


// se ejecuta con el comando node trigrama.js "la tierra" 6
