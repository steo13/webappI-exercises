"use strict";

let a = 6; //let, const, var o semplicemente scrivendola --> modi per scrivere una variabile
const b = 6; //variabile che non si può ridefinire

//const b = [1,2]; gli elementi dell'array possono essere rimdificati solo in un pezzo

console.log(c); //hoisting --> utilizzare variabili prima di averle sefinite, let non ha il comportamento di hoisting, pertanto si usa sempre let e const e mai var
var c = 5; //variabile generica
//c = null;
//c = undefined;
//d;

if (a === b){  //col triplo uguale non si effettua nessun tipo di conversione
    console.log("sono uguali");
}

for (let i=0; i<5; i++){
    console.log(i);
}

c = "ciao";
a = "miao";

console.log(a);
console.log(b);