'use strict';

/* Construction functions */
function Exam(code, name, credits, date, score, laude = false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = dayjs(date);
  this.score = score;
  this.laude = laude;
}

function ExamList() {
  this.list = [];

  this.init = () => {
    this.list.push(
      new Exam('02GOL', 'Architetture dei sistemi di elaborazione', 10, '2021-02-01', 28),
      new Exam('01SQM', 'Data Science e Tecnologie per le Basi di Dati', 8, '2020-06-02', 30, true),
      new Exam('02KPN', 'Tecnologie e servizi di rete', 6, '2020-02-15', 26),
    );
  };

  this.getAll = () => {
    return this.list;
  };

  this.get2021 = () => {
    return this.list.filter(exam => exam.date.isAfter('2021-01-01'));
  }

  this.remove = (exam) =>{
    for (let i=0; i<this.list.length; i++){
      if (this.list[i] == exam)
        this.list.splice(i, 1);
    }
  };

  this.add = (exam) => {
    this.list.push(exam);
  };

}

/* DOM manipulation */

/* MODO 1: template tramite string literals */
/*function createExamRow(exam) {
  return `<tr>
  <td>${exam.date.format('DD/MM/YYYY')}</td>
  <td>${exam.name}</td>
  <td>${exam.credits}</td>
  <td>${exam.score}${exam.laude ? 'L' : ''}</td>
  <td><button class="btn btn-danger">X</button></td>
</tr>`;
}*/

/* MODO 2: creazione dei singoli elementi */
function createExamRow(exam) {
  const tr = document.createElement('tr');

  const tdDate = document.createElement('td');
  tdDate.innerText = exam.date.format('DD/MM/YYYY');
  tr.appendChild(tdDate);

  const tdName = document.createElement('td');
  tdName.innerText = exam.name;
  tr.appendChild(tdName);

  const tdCredits = document.createElement('td');
  tdCredits.innerText = exam.credits;
  tr.appendChild(tdCredits);

  const tdScore = document.createElement('td');
  tdScore.innerText = exam.score + (exam.laude ? 'L' : '');
  tr.appendChild(tdScore);

  const tdButton = document.createElement('td');
  tdButton.innerHTML = `<button id="exam-${exam.code}" class="btn btn-danger">X</button>`;
  tdButton.addEventListener('click', e => {
    tr.remove();
    console.log('Removed ' + e.target.id);
    examList.remove(exam);
  });
  tr.appendChild(tdButton);

  return tr;
}

/* Riempio la tabella */
function fillExamTable(exams) {
  const examTable = document.getElementById('exam-table');
  for(const exam of exams) {
    // creare la riga della tabella
    const examEl = createExamRow(exam);
    // aggiungiamo la riga nella pagina
    // MODO 1
    // examTable.insertAdjacentHTML('afterbegin', examEl);
    // MODO 2:
    examTable.prepend(examEl);
  }
}

/* Svuoto (inizializzo) la tabella */
function initTable() {
  const examTable = document.getElementById('exam-table');
  examTable.innerHTML = `<tr>
    <td><input class="form-control" type="date"></td>
    <td><input class="form-control" type="text"></td>
    <td><input class="form-control" type="text" size="2"></td>
    <td><input class="form-control" type="text" size="3"></td>
    <td><button class="btn btn-success" id="add-exam">+</button></td>
  </tr>`;
}

/* Event Listener & Handler */
document.querySelector('#filter-2021').addEventListener('click', (event) => {
  const exams = examList.get2021();
  initTable();
  fillExamTable(exams);
});

document.querySelector('#filter-all').addEventListener('click', (event) => {
  const exams = examList.getAll();
  initTable();
  fillExamTable(exams);
});


/* Questo qui non funziona: a questo punto, la tabella è ancora vuota
document.querySelector('#exam-02GOL').addEventListener('click', event => {
  console.log("cancello" + event.target.id);
});*/

/* Main */
const examList = new ExamList();
// init la lista degli esami
examList.init();
// prendo tutti gli esami
const exams = examList.getAll();
// riempio la tabella
fillExamTable(exams);

