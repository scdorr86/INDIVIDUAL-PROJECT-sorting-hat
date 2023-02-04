//dataset
const students = [];
const houses = {1:"Gryffindor", 2:"Hufflepuff", 3:"Ravenclaw", 4:"Slytherin"};
let nonExpelledStudents = [];
let expelArray = [];

//get elements from DOM
const startBTN = document.querySelector("#startBtn");
const formDiv = document.querySelector("#get-started-form");
const filterDiv = document.getElementById('filter-row');
const addSection = document.querySelector(".get-started-container");
const cardSection = document.querySelector(".cards-display-container")
const sortBtn = document.querySelector("#sortBtn");
const formEl = document.querySelector("#add-student-input");

//render cards to card divs
function renderSort(array) {
    
  const cardRender = document.querySelector("#cards-div");
  let cardHtml = "<h1>First Year's</h1>";

  array.forEach ((studentIndex) => {
    cardHtml +=
      `<div class="card product" style="width: 18rem;">
      <img src=${studentIndex.imageUrl} class="card-img-top" alt="..."> 
      <div class="card-body">
        <h3 class="card-name">${studentIndex.name}</h3>
        <h5>${studentIndex.house}</h5>
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
      `<div class="card product" style="width: 18rem;">
      <img src=${studentIndex.imageUrl} class="card-img-top" alt="..."> 
      <div class="card-body">
        <h3 class="card-name">${studentIndex.name}</h3>
        <h5>${studentIndex.house}</h5>
        <button class="btn btn-outline-danger" id="rehouse--${studentIndex.studentId}">Rehouse</button>
      </div>
    </div>`
  });
    
expelRender.innerHTML = expelHtml;
}

//random number generator for house selection
function randomNum() {
  return Math.floor(Math.random() * (5 - 1) ) + 1;
};

//Add a student and render added student cards
function addRender () {

  const newStudentObj = {
    name: document.querySelector("#nameInput").value,
    house: randomNum(),
    studentId: students.length + 1,
    expelled: false,
    imageUrl: ""
  };

  students.push(newStudentObj);

  nonExpelledStudents = students.map((index) => {
      if (!index.expelled) {
        return {...index, house: houses[index.house]};
      }
  });

  for (let i = 0; i < nonExpelledStudents.length; i++) {
    if (nonExpelledStudents[i].house === "Gryffindor") {
      nonExpelledStudents[i].imageUrl = "https://cdn.shopify.com/s/files/1/1742/2597/products/Gryffindor_Crest_Harry_Potter_JK_Rowling_200x200.jpg?v=1498517435"
    } else if (nonExpelledStudents[i].house === "Hufflepuff") {
      nonExpelledStudents[i].imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrJg-Phmi7_vAbHtwKksDlaHiAMBynv0nsRz9ZL-Kj7nMVasIMyg02F_BkP1T-djleawA&usqp=CAU"
    } else if (nonExpelledStudents[i].house === "Ravenclaw") {
      nonExpelledStudents[i].imageUrl = "https://qph.cf2.quoracdn.net/main-thumb-697960226-200-eemyzihzgvqcufewyfcszclopjlpxban.jpeg"
    } else if (nonExpelledStudents[i].house === "Slytherin") {
      nonExpelledStudents[i].imageUrl = "https://www.topironons.com/image/cache/catalog/product/slytherin-harry-potter-t-shirt-iron-on-transfer-decal-3-2118-200x200.jpg"
    }
  }

  renderSort(nonExpelledStudents);
  
  formEl.reset();
}

//Filter Button Row
function griff () {
  let grifFilter = nonExpelledStudents.filter(index => index.house === "Gryffindor");
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

//Link filter buttons from DOM to functions
const grifbtn = document.querySelector("#grifbtn");
const allbtn = document.querySelector("#allbtn");
const huffbtn = document.querySelector("#huffbtn");
const ravbtn = document.querySelector("#ravbtn");
const slybtn = document.querySelector("#slybtn");
const studentContainer = document.querySelector("#cards-div");
const armyContainer = document.querySelector("#expel-div");
grifbtn.addEventListener("click", griff);
allbtn.addEventListener("click", All);
huffbtn.addEventListener("click", huff);
ravbtn.addEventListener("click", raven);
slybtn.addEventListener("click", slyth);

//toggle filter menu
function toggleAdd () {
  addSection.classList.toggle("unhide");
  //cardSection.classList.toggle(".unhide2");
}

//link render functions to start button click event
startBTN.addEventListener("click", toggleAdd);
sortBtn.addEventListener("click", () => {addRender()});

studentContainer.addEventListener("click", (event) => {
  if (event.target.id.includes("expel")) {
    
    const [, id] = event.target.id.split("--");
    const indexOfStudent = nonExpelledStudents.findIndex (
      (obj) => obj.studentId === Number(id)
      );

    console.log(indexOfStudent);
    console.log(nonExpelledStudents);
    console.log(id);
    nonExpelledStudents[indexOfStudent].house = "EXEPLLED MINION"
    nonExpelledStudents[indexOfStudent].imageUrl = "https://upload.wikimedia.org/wikipedia/en/a/a3/Lordvoldemort.jpg" 
    nonExpelledStudents[indexOfStudent].expelled = true;
    students[indexOfStudent].expelled = true; 
    expelArray.push(nonExpelledStudents[indexOfStudent])
    console.log(expelArray);

    renderArmy(expelArray);

    nonExpelledStudents.splice(indexOfStudent, 1);
    //students.splice(indexOfStudent, 1);
    console.log(nonExpelledStudents);
    console.log(students); 

    renderSort(nonExpelledStudents); 
  }
});

armyContainer.addEventListener("click", (event) => {
  if (event.target.id.includes("rehouse")) {
    console.log("rehouse")
  }
});
