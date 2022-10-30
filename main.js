let input = document.querySelector(".input")
let btn = document.querySelector(".add")
let addfild = document.querySelector(".tasks")
let allrem = document.querySelector(".all")


let myArray = []


// window.localStorage.clear()
if (localStorage.getItem("tasks")) {
  myArray = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocal()

btn.onclick = () => {
  if (input.value !== "") {
    addTask(input.value)

    input.value = "";
  }
}

function addTask(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  }

  myArray.push(task)

  addEle(myArray)

  addtolocal(myArray)
}

function addEle(myArray) {
  addfild.innerHTML = "";

  myArray.forEach((task) => {
    let div = document.createElement("div")
    div.className = "task"
    div.setAttribute("data-id", task.id)
    div.setAttribute("condation" , task.completed)
    let pom = document.createElement("p")
    pom.appendChild(document.createTextNode(task.title))
    div.appendChild(pom)
    let btno = document.createElement("button")
    btno.className = "del"
    btno.appendChild(document.createTextNode("Delete"))
    div.appendChild(btno)
    addfild.appendChild(div)
    if (task.completed) {
      div.className = "task done"
    }
  });
}

function addtolocal(myArray) {
  window.localStorage.setItem("tasks" , JSON.stringify(myArray))
}

function getDataFromLocal() { 
  let data = window.localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data)
    addEle(tasks)
  }
}

function deleteWithId(ID) {
  myArray = myArray.filter((e) => { e.id != ID })
  addtolocal(myArray)
}

addfild.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove()

    deleteWithId(e.target.parentElement.getAttribute("data-id"))
    
  }

  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done")

    fromTtoF(e.target.getAttribute("data-id"))
  }
})

function fromTtoF(ID) {
  for (let i = 0; i < myArray.length; i++){
    if (myArray[i].id == ID) {
      myArray[i].completed == false ? (myArray[i].completed = true) : (myArray[i].completed = false)
    }
  }
  addtolocal(myArray)
}

allrem.onclick = () => {
  addfild.innerHTML = ""

  window.localStorage.removeItem("tasks")
}