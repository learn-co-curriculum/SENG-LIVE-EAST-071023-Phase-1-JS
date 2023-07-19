// Steps to get started!
// 0) Define global variables! ( aka urls, elements from the DOM )
// 1) Fetch data from url(s) ✅
// 2) Render the data to the page/DOM ✅
// 3) Hook up event listeners!
// 4) Make page do things

let addToy = false;

const addBtn = document.getElementById("new-toy-btn");
const toyFormContainer = document.getElementById("toy-form-container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

const toyForm = document.getElementById( 'new-toy-form' )

toyForm.onsubmit = ( event ) => {
  event.preventDefault()
  
  const newToy = {
    name: toyForm.name.value,
    image: toyForm.image.value,
    likes: 0
  }

  postNewToy( newToy )

}

const postNewToy = toy => {

  const postRequest = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accepts': 'application/json'
    },
    body: JSON.stringify( toy )
  }
    // body: JSON.stringify({
    //   name: toy.name,
    //   image: toy.image,
    //   likes: toy.likes
    // })

  fetch( toysUrl, postRequest )
  .then( r => r.json() )
  // .then( newToyData => renderToy( newToyData ) )
  .then( renderToy )

}

const baseUrl = 'http://localhost:3000'
const toysUrl = baseUrl + '/toys'

const fetchToys = () =>
  fetch( toysUrl )
  .then( r => r.json() )
  // .then( toyData => toyData.forEach( toy => renderToy( toy ) ) )
  .then( toyData => toyData.forEach( renderToy ) )


fetchToys()


const renderToy = toy => {

  let toyCollection = document.getElementById( 'toy-collection' )
  // console.log( toyCollection )

  let toyCard = document.createElement( 'div' )
  toyCard.className = 'card'
  toyCollection.appendChild( toyCard )

  let h2 = document.createElement( 'h2' )
  h2.textContent = toy.name
  toyCard.appendChild( h2 )

  let img = document.createElement( 'img' )
  img.src = toy.image
  img.className = "toy-avatar"
  toyCard.appendChild( img )

  let p = document.createElement( 'p' )
  p.textContent = `${ toy.likes } Likes`
  toyCard.appendChild( p )

  let likeBtn = document.createElement( 'button' )
  likeBtn.id = toy.id
  likeBtn.className = "like-btn"
  likeBtn.textContent = "Like 💝"
  toyCard.appendChild( likeBtn )

  likeBtn.onclick = ( event ) => {
    toy.likes += 1
    
    increaseToyLikes( toy, p )

  }

}

const increaseToyLikes = ( toy, p ) => {

  const patchRequest = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'accepts': 'application/json'
    },
    body: JSON.stringify( toy )
    // body: JSON.stringify({ likes: toy.likes })
  }

  fetch( toysUrl + '/' + toy.id, patchRequest )
  .then( r => r.json() )
  .then( updatedToyData => p.textContent = `${ updatedToyData.likes } Likes` )

}