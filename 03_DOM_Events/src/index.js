const bookList = document.getElementById('book-list');
function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//////////////////////////////////////
// render functions  (Data => Display)
//////////////////////////////////////

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.getElementById('store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.getElementById('location').textContent = bookStore.location;
  document.getElementById('number').textContent = bookStore.number;
  document.getElementById('address').textContent = bookStore.address;
  document.getElementById('hours').textContent = bookStore.hours;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;
  li.append(h3);

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  li.append(pAuthor);
  
  const pPrice = document.createElement('p');
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  img.title = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  btn.addEventListener("click", () => {
    li.remove()
  })
  li.append(btn);

  bookList.append(li);
}


////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

renderHeader(bookStore);
renderFooter(bookStore);

bookStore.inventory.forEach(renderBook);

// for(book of bookStore.inventory){
//   renderBook(book)
//}


////////////////////////////////////////////
// Form Handling
////////////////////////////////////////////
const bookForm = document.getElementById("book-form")

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Get all data from the form
  const title = bookForm.title.value
  const author = bookForm.author.value
  const price = bookForm.price.value
  const imageUrl = bookForm.imageUrl.value
  const inventory = bookForm.inventory.value

  //put data into a book object
  const newBook = {
    title: title,
    author:author,
    price: price,
    inventory:inventory,
    imageUrl: imageUrl
  }

  renderBook(newBook)

});


hideButton = document.getElementById("toggleForm")

toggleBook = (e) => {
  //Hide the form to add a new book

  //If the book form is currently not displayed
  if (bookForm.style.display === "none") {
    //show the book form.
    bookForm.style.display = "block"
    hideButton.textContent = "Hide Book Form"
  } else {
    //hide the book form.
    bookForm.style.display = "none"
    hideButton.textContent = "Show Book Form"
  }
}

hideButton.addEventListener("click", toggleBook)


// Event Listener:
// hide the Book From by pressing the Escape key
//  while it is visible.
document.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    if (bookForm.style.display !== "none") {
      bookForm.style.display = "none";
      hideButton.textContent = "Show Book Form"
    }
  }
  // 
})

document.addEventListener()

/* a comment */

/*
1. Users should be able to delete books 
    by clicking the delete button 
    at the bottom of the book card
    [X]

2. Users should be able to add a book by
  filling in the form at the top of the page
  (the book they add should appear in the DOM)
  [X]

3. Users should be able to click the
  Hide Book Form button to hide the 
  form to add a new book
  [X]

4. Users should be able to show 
  the New Book form by clicking
  the button again
  [X]
Bonus: Users should be able to hide the
  Book From by pressing the Escape key
  while it is visible.
  [X]
  */