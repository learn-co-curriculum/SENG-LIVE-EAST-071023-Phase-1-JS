const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector('#book-form');
const storeForm = document.querySelector('#store-form');
const toggleBookFormButton = document.querySelector('#toggleBookForm');
const toggleStoreFormButton = document.querySelector('#toggleStoreForm');
const editStoreButton = document.querySelector('#edit-store');
const storeSelector = document.querySelector('#store-selector');
let storeEditMode = false;

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
    books.forEach(renderBook)
  })
  .catch(renderError);

///////////////////
// render functions
///////////////////
function renderHeader(store){
  document.querySelector('#store-name').textContent = store.name
}

function renderFooter(bookStore) {
  document.querySelector('#location').textContent = bookStore.location;
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#hours').textContent = bookStore.hours;
}

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
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
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);

  const inventoryInput = document.createElement('input');
  inventoryInput.type = 'number';
  inventoryInput.className = 'inventory-input';
  inventoryInput.value = book.inventory;
  inventoryInput.min = 0;
  li.append(inventoryInput);

  inventoryInput.addEventListener('change', (e) => {
    console.log(e.target.value);
    // optimistic approach
    // const newInventoryCount = parseInt(e.target.value);
    // fetch(`http://localhost:3000/books/${book.id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({inventory: newInventoryCount})
    // })
    // setInventoryText(pStock, newInventoryCount);

    // pessimitic approach
    const newInventoryCount = parseInt(e.target.value);
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({inventory: newInventoryCount})
    })
      .then(response => response.json())
      .then(book => {
        setInventoryText(pStock, book.inventory);
      })
  })
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  setInventoryText(pStock, book.inventory);
  li.append(pStock);
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement('button');
  // if we had an external event listener and didn't have book in scope
  btn.dataset.bookId = book.id; 
  btn.textContent = 'Delete';

  btn.addEventListener('click', (e) => {
    // optimistic approach
    // li.remove();
    // fetch(`http://localhost:3000/books/${book.id}`, {
    //   method: "DELETE"
    // })
    //   .then(res => {
    //     if (!res.ok) {
    //       bookList.append(li);
    //     }
    //   })
    
    // optimistic with more error handling for a more realistic situation in your own backend that you would build later on
    // li.classList.add('loading'); 
    // fetch(`http://localhost:3000/books/${book.id}`, {
    //   method: "DELETE"
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       li.remove();
    //     } else {
    //       li.classList.remove('loading');
    //       renderError("Something went wrong–delete didn't persist.")
    //     }
    //   })
    //   .catch(error => {
    //     li.classList.remove('loading');
    //     renderError(error)
    //   })
    // pessimistic approach
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          li.remove();
        }
      })
      .catch(renderError);
  })
  li.append(btn);

  bookList.append(li);
  return li;
}

function renderError(error) {
  const main = document.querySelector('main');
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

function fillIn(form, data) {
  for (field in data) {
    if(form[field]) {
      form[field].value = data[field]
    }
  }
}

function setInventoryText(paragraph, count) {
  if (count === 0) {
    paragraph.textContent = "Out of stock";
  } else if (count < 3) {
    paragraph.textContent = "Only a few left!";
  } else {
    paragraph.textContent = "In stock"
  }
}
// external named event handler for our delete button click
// alternative to adding the delete button click event handler 
// inside of renderBook()
// function handleDeleteClick(e) {
//   const li = e.target.closest('.list-li'); 
//   li.remove();
//   fetch(`http://localhost:3000/books/${e.target.dataset.bookId}`, {
//     method: "DELETE"
//   })
// }

// New Function to populate the store form with a store's data to update 
function populateStoreEditForm(store) {
  fillIn(storeForm, store);
  showStoreForm();
}

function formatPrice(price) {
  let formattedPrice = Number.parseFloat(price).toFixed(2);
  return `$${formattedPrice}`;
}

// Event Listeners/Handlers
toggleBookFormButton.addEventListener('click', toggleBookForm);
toggleStoreFormButton.addEventListener('click', toggleStoreForm)

window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    hideStoreForm();
    hideBookForm();
  }
})

bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
    
  // pessimistic rendering here:
  postJSON("http://localhost:3000/books", book)
    .then(book => {
      renderBook(book)
      e.target.reset();
    })
    .catch(renderError);  
})

storeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const storeId = e.target.dataset.storeId;
  const store = {
    name: e.target.name.value,
    address: e.target.address.value,
    number: e.target.number.value,
    hours: e.target.hours.value,
    location: e.target.location.value
  };
  
  if (storeEditMode) {
    // ✅ write code for updating the store here
    console.log(store);
    // pessimistic version
    // fetch(`http://localhost:3000/stores/${storeId}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(store)
    // })
    //   .then(response => response.json())
    //   .then(updatedStore => {
    //     renderHeader(updatedStore);
    //     renderFooter(updatedStore);
    //     storeSelector.querySelector(`option[value="${updatedStore.id}"]`).textContent = updatedStore.name;
    //   })
    //   .catch(renderError);
    
    // optimistic version
    fetch(`http://localhost:3000/stores/${storeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(store)
    })
    .catch(renderError)
    renderHeader(store);
    renderFooter(store);
    storeSelector.querySelector(`option[value="${storeId}"]`).textContent = store.name;
  } else {
    postJSON("http://localhost:3000/stores", store)
    .then(addSelectOptionForStore)
    .catch(renderError);
  }
  hideStoreForm()
  e.target.reset();
})

editStoreButton.addEventListener('click', (e) => {
  const selectedStoreId = document.querySelector('#store-selector').value;
  storeForm.dataset.storeId = selectedStoreId;
  storeEditMode = true;
  getJSON(`http://localhost:3000/stores/${selectedStoreId}`)
    .then(populateStoreEditForm)
})


// Book Form UI

function toggleBookForm() {
  const bookFormHidden = bookForm.classList.contains('collapsed')
  if (bookFormHidden) {
    showBookForm();
  } else {
    hideBookForm();
  }
}

function showBookForm() {
  bookForm.classList.remove('collapsed');
  toggleBookFormButton.textContent = "Hide Book form";
}

function hideBookForm() {
  bookForm.classList.add('collapsed');
  toggleBookFormButton.textContent = "New Book";
}


// Store Form UI

function toggleStoreForm() {
  let storeFormHidden = storeForm.classList.contains('collapsed');
  if (storeFormHidden) {
    showStoreForm();
  } else {
    hideStoreForm();
  }
}

function hideStoreForm() {
  storeForm.classList.add('collapsed');
  storeEditMode = false;
  storeForm.reset();
  toggleStoreFormButton.textContent = "New Store";
}

function showStoreForm() {
  storeForm.classList.remove('collapsed');
  toggleStoreFormButton.textContent = "Hide Store form";
  storeForm.querySelector('[type="submit"]').value = storeEditMode ? "SAVE STORE" : "ADD STORE";
}