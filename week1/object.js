let persona = {
    nome: "Luigi",
    cognome: "De Russis",
    //ta: 47
};

let persona3 = {
    nome: "Luigi",
    surname: "De Russis",
    eta: 47
};

const nome = "cognome"; //!!!
persona["eta"] = 37;

for (const chiave in persona){  //iterare su un oggetto
    console.log(chiave + " è " +persona[chiave]);
}

for (let [c, v] of Object.entries(persona)){    //iterare con coppia chiave valore
    console.log(c + ' ' + v);
}


nuovaPersona = Object.assign({}, persona3);
nuovaPersona = Object.assign({}, persona3, persona3);
nuovaPersona = Object.assign(persona2, persona3);

console.log(nuovaPersona);

console.log(persona.nome);
console.log(persona["nome"]);
console.log(persona["eta"]);
console.log(persona[nome]); //stampa persona["cognome"] !!!