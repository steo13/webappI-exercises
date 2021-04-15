"use strict"

const score = [25, 30, 18, 27, 28, 27, 30, 26];
const betterScore = [...score]; //copio l'array score in betterScore

//eliminare i due voti più bassi
let minScore = Math.min(...betterScore);
let index = betterScore.indexOf(minScore);
betterScore.splice(index, 1); //rimozione di 1 elemento a partire dalla posizione index

minScore = Math.min(...betterScore);
index = betterScore.indexOf(minScore);
betterScore.splice(index, 1); //rimozione di 1 elemento a partire dalla posizione index

/*//SORT + RIMOZIONE
betterScore.sort((a,b) => (a-b)); //arrow function (simile alle lambda function) ritorna il risultato di a-b
betterScore.shift(); //elimina il primo elemento dell'array
betterScore.shift(); //eimina il primo elemento dell'array*/

//calcolare la media
let avg = 0;
for (const s of betterScore){
    avg += s;
}
avg /= betterScore.length

//arrotondare la media
avg = Math.round(avg);

//aggiungerla due volte all'array
betterScore.push(avg); //aggiungere in coda
betterScore.push(avg); //aggiungere in coda

console.log('better score: ' + betterScore);
console.log('original score: ' + score);
