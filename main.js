console.log("test setup")

//dataset
const students = [];
const houses = {1:"Gryffndor", 2:"Hufflepuff", 3:"Ravenclaw", 4:"Slytherin"};
let nonExpelledStudents = [];
let expelArray = [];

//get elements from DOM
const startBTN = document.querySelector("#startBtn");
const formDiv = document.querySelector("#get-started-form");
const filterDiv = document.getElementById('filter-row');
const addSection = document.querySelector(".get-started-container");
const sortBtn = document.querySelector("#sortBtn");
const formEl = document.querySelector("#add-student-input");

/*render form and filter to DOM with start button
function renderForm () {
 
  let formHtml = `
  <form id="add-student-input">
    <div id="add-inpt" class="mb-3">
      <label for="student-input" class="form-label">Student:</label><input type="input" class="form-control" id="exampleInput1" aria-describedby="inputHelp">
    </div>
    <button id="sortBtn" type="submit" class="btn btn-primary">Sort!</button>
  </form>`

  formDiv.innerHTML = formHtml
}
function renderFilterRow () {
 
  let formHtml = 
  `<div id="filter-header">
    <h3>Filter Students</h3>
  </div>
  <div id="button-row">
    <button type="button" class="btn btn-secondary">All</button>
    <button type="button" class="btn btn-danger">Gryffndor</button>
    <button type="button" class="btn btn-warning">Hufflepuff</button>
    <button type="button" class="btn btn-primary">Ravenclaw</button>
    <button type="button" class="btn btn-success">Slytherin</button>
  </div>`

  filterDiv.innerHTML = formHtml
}*/

//render cards to card div
function renderSort(array) {
    
  const cardRender = document.querySelector("#cards-div");
  let cardHtml = "<h1>First Year's</h1>";

  array.forEach ((studentIndex) => {
    cardHtml +=
    `<div class="card" style="width: 18rem;">
    <div class="house-color card-img-top"></div> 
    <div class="card-body">
      <h2 class="card-name">${studentIndex.name}</h2>
      <h3>${studentIndex.house}</h3>
      <button class="btn btn-outline-danger" id="expel--${studentIndex.studentId}">Expel</button>
    </div>
  </div>`
  });
    
cardRender.innerHTML = cardHtml;
}
function renderArmy(array) {
    
  const expelRender = document.querySelector("#expel-div");
  let expelHtml = "<h1>He Who Must not be Named's Army</h1>";

  array.forEach ((studentIndex) => {
    expelHtml +=
    `<div class="card" style="width: 18rem;">
    <div class="house-color card-img-top"></div> 
    <div class="card-body">
      <h2 class="card-name">${studentIndex.name}</h2>
      <h3>${studentIndex.house}</h3>
      <button class="btn btn-outline-danger" id="expel--${studentIndex.studentId}">Expel</button>
    </div>
  </div>`
  });
    
expelRender.innerHTML = expelHtml;
}

//random number generator for house selection
function randomNum() {
  return Math.floor(Math.random() * (5 - 1) ) + 1;
};

console.log(randomNum())

//assign house to random number
/*function house () {
  students.forEach((index) => {
    if (index.house === 1){ 
      index.house = "Gryffndor"
    } else if (index.house === 2) {
      index.house = "Hufflepuff"
    } else if (index.house === 3) {
      index.house = "Ravenclaw"
    } else if (index.house === 4) {
      index.house = "Slytherin"
    } else {
      index.house = "Gryffndor"
    }
  })
}

//add student to students array
const newStudent = (event) => {
  if (event.target.id.includes("sortBtn")) {
  console.log("test newStudent")
  event.preventDefault();

  const newStudentObj = {
    name: document.querySelector("#nameInput"),
    house: randomNum(),
    studentId: students.length +1
  }

  students.push(newStudentObj);

  house()

  renderSort(students)
  formEl.reset()
  console.log(students)
  }
}*/

function addRender () {

  const newStudentObj = {
    name: document.querySelector("#nameInput").value,
    house: randomNum(),
    studentId: students.length + 1,
    expelled: false
  };

  students.push(newStudentObj);

  nonExpelledStudents = students.map((index) => {
      if (!index.expelled) {
        return {...index, house: houses[index.house]};
      }
  });

  renderSort(nonExpelledStudents);
  console.log(students);
  formEl.reset();
}

//Filter Button Row
function griff () {
  let grifFilter = nonExpelledStudents.filter(index => index.house === "Gryffndor");
  renderSort(grifFilter);
}

function huff () {
  const hufFilter = nonExpelledStudents.filter(index => index.house === "Hufflepuff");
  renderSort(hufFilter);
}

function raven () {
  const ravenFilter = nonExpelledStudents.filter(index => index.house === "Ravenclaw");
  renderSort(ravenFilter);
}

function slyth () {
  const slythFilter = nonExpelledStudents.filter(index => index.house === "Slytherin");
  renderSort(slythFilter);
}

function All () {
  renderSort(nonExpelledStudents);
}
//Link filter buttons to functions
const grifbtn = document.querySelector("#grifbtn");
const allbtn = document.querySelector("#allbtn");
const huffbtn = document.querySelector("#huffbtn");
const ravbtn = document.querySelector("#ravbtn");
const slybtn = document.querySelector("#slybtn");
const studentContainer = document.querySelector("#cards-div");
grifbtn.addEventListener("click", griff);
allbtn.addEventListener("click", All);
huffbtn.addEventListener("click", huff);
ravbtn.addEventListener("click", raven);
slybtn.addEventListener("click", slyth);

//toggle filter menu
function toggleAdd () {
  addSection.classList.toggle("unhide");
}
//link render functions to start button click event
startBTN.addEventListener("click", toggleAdd);
sortBtn.addEventListener("click", () => {
  //newStudent
  addRender()
  console.log(nonExpelledStudents)
  //renderSort(students)
});
studentContainer.addEventListener("click", (event) => {
  if (event.target.id.includes("expel")) {
    console.log("would be expelled")
    const [, id] = event.target.id.split("--");
    const indexOfStudent = nonExpelledStudents.findIndex (
      (obj) => obj.studentId === Number(id)
      );
      console.log(indexOfStudent);
      console.log(nonExpelledStudents);
      console.log(id);
    expelArray.push(nonExpelledStudents[indexOfStudent])
    console.log(expelArray);
    renderArmy(expelArray);
    nonExpelledStudents.splice(indexOfStudent, 1);
    console.log(nonExpelledStudents);
    renderSort(nonExpelledStudents) ; 
  }
});
