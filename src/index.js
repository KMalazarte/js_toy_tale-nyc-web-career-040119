const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
let addToy = false

fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {
    toys.forEach(function(toy) {
    toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button id=${toy.id} class="like-btn">Like <3</button>
    </div>`
    })
  });


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

  const newToyForm = document.querySelector(".add-toy-form")
  const newToyName = document.querySelector("#name")
  const newToyImg = document.querySelector("#image")

  newToyForm.addEventListener("submit" , function(e) {
    e.preventDefault()
    fetch('http://localhost:3000/toys' , {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ "name": newToyName.value, "image": newToyImg.value, "likes": 0})
    })
    .then(function(res){
      return res.json()
    })
    .then(function(info) {
      debugger
      toyCollection.innerHTML += `
      <div class="card">
      <h2>${info.name}</h2>
      <img src=${info.image} class="toy-avatar" />
      <p>0 Likes</p>
      <button id=${info.id} class="like-btn">Like <3</button>
      </div>`
    })


    newToyForm.reset()
  })

  toyCollection.addEventListener("click", function(e) {
    let clickedToyId = e.target.id
    let pTag = e.target.previousElementSibling
    let likeNum = parseInt(pTag.innerText)
    pTag.innerText = `${++likeNum} Likes`

    fetch(`http://localhost:3000/toys/${clickedToyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: ++likeNum})
    })
  })
