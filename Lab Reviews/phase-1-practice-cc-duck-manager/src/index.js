// Steps to Success!
// 0) Define global variables! ( urls, elements from the DOM, etc. )
// 1) Fetch our data from server
// 2) Render data to the page
// 3) Hook up event listeners
// 4) Make event listeners manipulate the page



// write your code here!
const baseUrl = 'http://localhost:3000'
const ducksUrl = baseUrl + '/ducks'

// You may need to do something to make sure your script tag is working in the HTML first...

fetchDucks()

// When the #new-duck-form is submitted
const newDuckForm = document.getElementById( 'new-duck-form' )

newDuckForm.onsubmit = ( event ) => {
    // it generates a new duck image in the #duck-nav. When clicked, it acts like the other images in the #duck-nav and shows a name, image, and like button in the #duck-display. A duck starts with 0 likes.
    event.preventDefault()
    const newDuck = {
        name: newDuckForm['duck-name-input'].value,
        img_url:  newDuckForm['duck-image-input'].value,
        likes: 0
    }

    renderDuck( newDuck )

}


// When the page loads, fetch the ducks 
function fetchDucks () {
    fetch( ducksUrl )
    .then( r => r.json() )
    .then( ducksData => renderDucks( ducksData ) )
}



function renderDucks ( ducks ) {
    ducks.forEach( function ( duck ) {
        renderDuck( duck )
    })
}

function renderDuck ( duck ) {
    // display each duck image in the #duck-nav.
    const duckNav = document.getElementById( 'duck-nav' )
    
    const duckImage = document.createElement( 'img' )
    duckNav.appendChild( duckImage )
    duckImage.src = duck.img_url
    
    // When a user clicks one of the duck images
    duckImage.onclick = () => displayDuckDetails( duck )
}


function displayDuckDetails ( duck ) {
    // it shows the duck's name, the image, and a likes button with the number of likes in the #duck-display
    
    const duckName = document.getElementById( 'duck-display-name' )
    duckName.textContent = duck.name

    const duckImage = document.getElementById( 'duck-display-image' )
    duckImage.src = duck.img_url

    const duckLikeButton = document.getElementById( 'duck-display-likes' )
    duckLikeButton.textContent = duck.likes + ' likes'
    
    // When the likes button is clicked
    duckLikeButton.onclick = () => {
        // it increments the number of likes displayed for that duck. Be sure that the button continues to read "X likes".
        duck.likes += 1
        duckLikeButton.textContent = duck.likes + ' likes'

    }
}





