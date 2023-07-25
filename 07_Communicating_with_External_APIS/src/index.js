const resultsDiv = document.getElementById('results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.getElementById('api-Search');

  
  apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);


    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${ query }`

    fetch( apiUrl, {
      headers: {
        'x-api-key': SPOONACULAR_API_KEY
      }
    })
    .then( r => r.json() )
    .then( console.log )
    
  })
})

// console.log( SPOONACULAR_API_KEY )