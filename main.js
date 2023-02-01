console.log("test setup")

//dataset
const students = []
const houses = {1:"Gryffndor", 2:"Hufflepuff", 3:"Ravenclaw", 4:"Slytherin"}

const studentIds = students.map(student => student.id).sort((a, b) => a - b);
const id = studentIds.length ? studentIds[(studentIds.length - 1)] + 1 : 1;



//get elements from DOM
const startBTN = document.querySelector("#startBtn")
const formDiv = document.querySelector("#get-started-form")
const filterDiv = document.getElementById('filter-row')
const addSection = document.querySelector(".get-started-container")
const sortBtn = document.querySelector("#sortBtn")
const formEl = document.querySelector("#add-student-input")

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
      <button class="btn btn-outline-danger" id="delete--${studentIndex.id}">Expel</button>
    </div>
  </div>`
  })
    
cardRender.innerHTML = cardHtml;
}

//random number generator for house selection
function randomNum() {
  return Math.floor(Math.random() * (5 - 1) ) + 1;
}

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

function test () {
  console.log("muliple function click test")
  const newStudentObj = {
    name: document.querySelector("#nameInput").value,
    house: randomNum(),
    studentId: students.length +1,
    expelled: false
  }

  students.push(newStudentObj);

  const nonExpel = students.map((index) => {
      if (!index.expelled) {
        return {...index, house: houses[index.house]};
      }
  })

  renderSort(nonExpel)
  console.log(nonExpel)
  formEl.reset()
}

function toggleAdd () {
  addSection.classList.toggle("unhide")
}
//link render functions to start button click event
startBTN.addEventListener("click", toggleAdd)
sortBtn.addEventListener("click", () => {
  //newStudent
  test()
  //renderSort(students)
})