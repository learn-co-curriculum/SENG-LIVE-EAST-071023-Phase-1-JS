const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const toggleBookFormButton = document.getElementById('toggleForm');


// Create variables to hold onto the URLs so we don't hardcode them in. This will make life easy for us in the future!!! 🤓
const baseUrl = 'http://localhost:3001'
const storesUrl = baseUrl + '/stores'
const booksUrl = baseUrl + '/books'
const turtlesUrl = baseUrl + '/turtles'

// Write a function to fetch the books from our db.json file!!! 🙌
const fetchBooks = () => {
  fetch( booksUrl )
  .then( response => response.json() )
  .then( booksData => booksData.forEach( book => renderBook( book ) ) )
}

fetchBooks()

// A function that will now fetch our store information!
const fetchStores = () =>
  fetch( storesUrl )
  .then( r => r.json() )
  .then( storesData => {

    let index = 0
    renderHeader( storesData[ index ] )
    renderFooter( storesData[ index ] )
    
    // Using a setInterval to change the bookstore info every 5 seconds 😉
    setInterval( ()=> {
      if ( index >= storesData.length )
        index = 0
      index += 1
      renderHeader( storesData[ index ] )
      renderFooter( storesData[ index ] )
    }, 5000 )
  })

fetchStores()



function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//////////////////////////////////////
// render functions (DOM Manipulation)
//////////////////////////////////////
function renderHeader(bookStore) {
  document.getElementById('store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.getElementById('location').textContent = bookStore.location;
  document.getElementById('address').textContent = bookStore.address;
  document.getElementById('number').textContent = bookStore.number;
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
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  li.append(pStock);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');
  btn.textContent = 'Delete';
  li.append(btn);

  btn.addEventListener('click', (e) => {
    li.remove();
  })


  document.getElementById('book-list').append(li);
}


function toggleBookForm() {
  const isBookFormHidden = bookForm.classList.toggle('collapsed');
  if (isBookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////

// hide and show the new book form when toggle buton is clicked
toggleBookFormButton.addEventListener('click', toggleBookForm);

// also hide the form when it's visible and the escape key is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const isVisible = !bookForm.classList.contains("collapsed");
    if (isVisible) {
      toggleBookForm();
    }
  }
})

// handle submitting new book form
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newBook = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: []
  }
  
  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(newBook); // display new book to DOM
})



////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

// renderHeader(bookStore)
// renderFooter(bookStore)
// bookStore.inventory.forEach(renderBook)



