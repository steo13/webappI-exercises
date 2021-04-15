"use strict"

const dayjs = require("dayjs");
const sqlite = require('sqlite3');
const { resolve } = require("uri-js");

function Exam (code, name, cfu, date, score, laude = false){
    this.code = code;
    this.name = name;
    this.cfu = cfu;
    this.date = dayjs(date);
    this.score = score;
    this.laude = laude;
}

function ExamList (){
    const db = new sqlite.Database('exams.sqlite', (err) => { if (err) throw err; });

    //add
    this.add = (exam) => {
        return new Promise ((resolve, reject) =>{
            const sql = 'insert into score (coursecode, score, laude, datepassed) values (?,?,?,date(?));';
            db.run(sql, [exam.code, exam.score, exam.laude, exam.date.format('YYYY-MM-DD')], function (err) {
                if (err)
                    reject(err);
                else
                    resolve(this.lastID);
                });
        });
    };

    //getAll
    this.getAll = () => {
        return new Promise ((resolve, reject) => {
            const sql = 'select * from course, score where course.code=score.coursecode;';
            db.all(sql, [], function (err, rows) {
                if (err)
                    reject(err);
                else{
                    const exams = rows.map(row => new Exam (row.code, row.name, row.CFU, row.datepassed, row.score, row.laude==1));
                    resolve(exams);
                }
            });
        })
    };

    //find
    this.find = (courseCode => {
        return new Promise ((resolve, reject) => {
            const sql = 'select * from course where code = ?';
            db.all(sql, [courseCode], function (err, rows) {
                if (err)
                    reject(err);
                else{
                    const exam = rows.map(row => new Exam (row.code, row.name, row.CFU, row.datepassed, row.score, row.laude==1));
                    resolve(exam);
                }
            });
        });
    });

    //afterDate
    this.afterDate = (myDate => {
        return new Promise ((resolve, reject) => {
            const sql = 'select * from score, course where course.code = score.coursecode and score.datepassed > date(?)';
            db.all(sql, [myDate], function (err, rows) {
                if (err)
                    reject(err);
                else{
                    const exam = rows.map(row => new Exam (row.code, row.name, row.CFU, row.datepassed, row.score, row.laude==1));
                    resolve(exam);
                }
            });
        });     
    });

    //getWorst
    this.getWorst = (num => {
        let cont = 0;
        return new Promise ((resolve, reject) => {
            const sql = 'select * from score, course where course.code = score.coursecode order by score asc limit ?'
            db.all(sql, [num], function (err, rows) {
                if (err)
                    reject(err);
                else{
                    const exam = rows.map(row => new Exam (row.code, row.name, row.CFU, row.datepassed, row.score, row.laude==1));
                    resolve(exam);
                }
            });
        });     
    });

    
}


const main = async () =>{
    const aw1 = new Exam('01TXYOV', 'Web Applications I', 6, '2021-07-01', 30, true);
    const ds = new Exam('01SQJOV', 'Data Science and Database Technology', 6, '2021-06-15', 28);
    const ca = new Exam('02LSEOV', 'Computer architectures', 10, '2021-08-18', 25);

    const exams = new ExamList();
    try{
        /*const id = await exams.add(ca);
        console.log(id);*/

        /*const myExams = await exams.getAll();
        console.log(myExams);*/

        /*const examSearched = await exams.find(aw1.code);
        console.log(examSearched);*/

        /*const afterExams = await exams.afterDate('2021-06-14');
        console.log(afterExams);*/

        const worstExams = await exams.getWorst(2);
        console.log(worstExams);

    } catch (error){
        console.log(error);
    }
}

main();

