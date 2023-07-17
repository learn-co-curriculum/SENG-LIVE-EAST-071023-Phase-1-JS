const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const storeForm = document.getElementById('store-form');
const toggleBookFormButton = document.getElementById('toggleBookForm');
const toggleStoreFormButton = document.getElementById('toggleStoreForm');

const baseUrl = 'http://localhost:3000'
const booksUrl = baseUrl + '/books'
const storesUrl = baseUrl + '/stores'



//////////////////////////////////////////////////////////
// Fetch Data & Call render functions to populate the DOM
//////////////////////////////////////////////////////////
getJSON('http://localhost:3000/stores')
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0])
    renderFooter(stores[0])
  })
  .catch(err => {
    console.error(err);
    // renderError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
  });

// load all the books and render them
getJSON("http://localhost:3000/books")
  .then((books) => {
    books.forEach(book => renderBook(book))
  })
  .catch(renderError);


//////////////////////////////////////////
// render functions (for DOM Manipulation)
//////////////////////////////////////////
function renderHeader(bookStore) {
  document.getElementById('store-name').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.getElementById('location').textContent = bookStore.location;
  document.getElementById('address').textContent = bookStore.address;
  document.getElementById('number').textContent = bookStore.number;
  document.getElementById('hours').textContent = bookStore.hours;
}

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // target the select tag
  const storeSelector = document.getElementById('store-selector');
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore)
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener('change', (e) => {
    getJSON(`http://localhost:3000/stores/${e.target.value}`)
      .then(store => {
        renderHeader(store);
        renderFooter(store);
      })
  })
}

const storeSelector = document.getElementById('store-selector');

function addSelectOptionForStore(store) {
  const option = document.createElement('option');
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
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
  pPrice.textContent = `${formatPrice(book.price)}`;
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

  btn.addEventListener('click', (e) => {
    li.remove();
  })
  li.append(btn);

  bookList.append(li);
}

function renderError(error) {
  const main = document.getElementById('ain');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';
  if (error.message === "Failed to fetch") {
    errorDiv.textContent = "Whoops! Looks like you forgot to start your JSON-server!"
  } else {
    errorDiv.textContent = error;
  }
  main.prepend(errorDiv);
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  })
}

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

// fill in a form's with the data in an object
function fillIn(form, data) {
  for (field in data) {
    // use [] notation for accessing data stored 
    // in an object at variable keys, i.e. when
    // we don't know the key name up front.
    // In this case, it comes from an argument.
    form[field].value = data[field]
  }
}

////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////

// UI Events
////////////////////////////////////////////////////////////////

function toggleBookForm() {
  const bookFormHidden = bookForm.classList.toggle('collapsed');
  if (bookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

function toggleStoreForm() {
  const storeFormHidden = storeForm.classList.toggle('collapsed');
  if (storeFormHidden) {
    toggleStoreFormButton.textContent = "New Store";
  } else {
    toggleStoreFormButton.textContent = "Hide Store Form";
  }
}

// hide and show the new book/store form when toggle buton is clicked
toggleBookFormButton.addEventListener('click', toggleBookForm);
toggleStoreFormButton.addEventListener('click', toggleStoreForm);

// also hide both form when they're visible and the escape key is pressed

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!bookForm.classList.contains('collapsed')) {
      toggleBookForm();
    };
    if (!storeForm.classList.contains('collapsed')) {
      toggleStoreForm();
    };
  }
})

// Data persisting events
////////////////////////////////////////////////////////////////

// this is what a book looks like in db.json
// {
//   id:1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
// }
// we can use a book as an argument for renderBook!  This will add the book's info to the webpage.
bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: Number.parseFloat(e.target.price.value),
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
  // pass the info as an argument to renderBook for display!
  // renderBook(book);
  // 1. Add the ability to perist the book to the database when the form is submitted. When this works, we should still see the book that is added to the DOM on submission when we refresh the page.
  postBook( book )

  e.target.reset();
})

// 2. Hook up the new Store form so it that it works to add a new store to our database and also to the DOM (as an option within the select tag)
const postBook = book => {
  
  // fetch( booksUrl, {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json',
  //     'accepts':  'application/json'
  //   },
  //   body: JSON.stringify( book )
  // })

  const postRequest = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'accepts':  'application/json'
    },
    body: JSON.stringify( book )
  }

  fetch( booksUrl, postRequest )
  // .then( r => r.json() )
  // .then( newBookData => renderBook( newBookData ) )
  // .then( renderBook )
  // .then( function( newBookData ) {
  //   renderBook( newBookData )
  // })
  .then( r => {
    if ( r.ok )
      return r.json()
    else
      console.log( r )
  })
  .then( renderBook )
}








// we're filling in the storeForm with some data
// for a new store programatically so we don't 
// have to fill in the form every time we test
// the functionality
fillIn(storeForm, {
  name: "BooksRUs",
  location: "LaLaLand",
  number: "555-555-5555",
  address: "555 Shangri-La",
  hours: "Monday - Friday 9am - 6pm"
})



