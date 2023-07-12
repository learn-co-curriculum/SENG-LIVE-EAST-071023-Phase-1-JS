function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

// Main Method Code:
const bookList = document.getElementById("book-list")

// const firstBook = bookStore.inventory[0]
// console.log(firstBook)
// renderBook(firstBook)

//Let's do it for all the books
for (book of bookStore.inventory) {
  renderBook(book)
}


// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

function renderBook(book) {
// should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript : A Modern Introduction to Programming</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  //   <button>Delete</button>
  // </li>
  const li = document.createElement("li")
 
  li.className = "list-li"
  //Give it an id for removal
  li.id = book.id
  
  // Define Child elements
  const header = document.createElement("h3")
  header.textContent = book.title

  const author = document.createElement("p")
  author.textContent = book.author

  const price = document.createElement("p")
  price.textContent = formatPrice(book.price) //(formatted price)

  const image = document.createElement("img")
  image.src = book.imageUrl
  image.alt = book.title

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"
 
  const deleteEvent = () => {
    li.remove()
  }
  
  deleteButton.addEventListener("click", deleteEvent)
  // deleteButton.addEventListener("click", removeBook(book.id))

  li.append(header)
  li.append(author)
  li.append(price)
  li.append(image)
  li.append(deleteButton)

  //Now that we have a complete list item as described, we need to render it!
  // bookList.append(li)
  bookList.appendChild(li)
}

//removes a book li from the DOM by its index in the ul
function removeBook(index) {
  // bookList.getElementById(index).remove()
}

// Code to make the font bigger on every P tag
const allPTags = document.querySelectorAll("p")
console.log("every p tag:")
console.log(allPTags)

for (pTag of allPTags) {
  pTag.style = "font-size:40px"
}

// Code to grab every List-LI (list item)
const allListItems = document.getElementsByClassName("list-li")
console.log("All Books:")

for (book of allListItems){
  console.log(book)
}


  /* Tasks that we should do :D
X Select single DOM elements with:
X .querySelector() and
X .getElementById()
X Select multiple elements with:
X .querySelectorAll() and
X .getElementsByClassName()
X Add content with .textContent=
X Create elements with .createElement
X Append elements to the DOM with .appendChild and .append
X Explain the dangers of innerHTML=
X Remove content with .remove
  */