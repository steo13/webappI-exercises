'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('transcript.sqlite',
    (err) => { if (err) throw err; });


let result = [];
let sql = "SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode" ;
db.all(sql, [], (err,rows)=>{
    if(err) throw err;
    for (let row of rows) {
        //console.log(row); 
        result.push(row);
    }
});

//in questo caso si stampano solo gli asterischi in quanto db.all viene eseguita ma in maniera asincrona e per tanto l'esecuzione del programma andrà avanti indipendentemente
console.log('*************');
for (let row of result) {
    console.log(row);
}