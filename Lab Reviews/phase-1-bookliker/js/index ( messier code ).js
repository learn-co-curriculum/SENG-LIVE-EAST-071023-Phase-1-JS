// Steps to Success!
// 0) Define global variables! ( urls, elements from the DOM, etc. )
// 1) Fetch our data from server
// 2) Render data to the page
// 3) Hook up event listeners
// 4) Make event listeners manipulate the page

const baseUrl = 'http://localhost:3000'
const booksUrl = baseUrl + '/books'
const usersUrl = baseUrl + '/users'

// Colors of variable names change based off what it was declared with
let exampleVariable = ''
const exampleVariable2 = ''

// This information should be displayed in the div#show-panel element.
const showPanel = document.getElementById( 'show-panel' )
// console.log( showPanel )

let bookImage = document.createElement( 'img' )
showPanel.appendChild( bookImage )

// title in bold, subtitle, author, description, and a list of users
const bookTitleH2 = document.createElement( 'h2' )
showPanel.appendChild( bookTitleH2 )

const bookSubtitle = document.createElement( 'h2' )
showPanel.appendChild( bookSubtitle )

const bookAuthor = document.createElement( 'h2' )
showPanel.appendChild( bookAuthor )

const bookDesc = document.createElement( 'p' )
showPanel.appendChild( bookDesc )

const bookUsers = document.createElement( 'ul' )
showPanel.appendChild( bookUsers )

const likeButton = document.createElement( 'button' )
showPanel.appendChild( likeButton )
likeButton.textContent = 'LIKE! 💖'



// When the page loads, get a list of books from http://localhost:3000/books 
const fetchBooks = () => {
    fetch( booksUrl )
    .then( r => r.json() )
    .then( books => renderBooks( books ) )
    // .then( renderBooks )
}

fetchBooks()

let users = []
const fetchUsers = () => {
    fetch( usersUrl )
    .then( r => r.json() )
    .then( usersData => {
        users = usersData
        console.log( users )
    })
}

fetchUsers()

// display their titles by creating a li for each book and adding each li to the ul#list element.
const renderBooks = ( books ) => {
    // console.log( books )
    books.forEach( 
        book => {
            // console.log( book )
            const li = document.createElement( 'li' )
            li.textContent = book.title
            const bookUlList = document.getElementById( 'list' )
            bookUlList.appendChild( li )
            
            
            // When a user clicks the title of a book
            // li.addEventListener( 'click', )
            li.onclick = () => {
                // console.log( book )

                // display the book's image, title in bold, subtitle, author, description, and a list of users who have liked the book. 
                bookImage.src = book.img_url
                bookTitleH2.textContent = book.title
                bookSubtitle.textContent = book.subtitle
                bookAuthor.textContent = book.author
                bookDesc.textContent = book.description

                // console.log( book.users )

                bookUsers.innerHTML = ''
                book.users.forEach( user => {
                    // console.log( user )
                    const userLi = document.createElement( 'li' )
                    userLi.textContent = user.username
                    bookUsers.appendChild( userLi )
                })

                likeButton.onclick = () => {
                    const userLikeLi = document.createElement( 'li' )
                    userLikeLi.textContent = users[0].username
                    bookUsers.appendChild( userLikeLi )

                    book.users.push( users[0] )
                }


            }

        }
    );

    
// books.forEach(
//         function ( book ) {

//         }
//     )
}