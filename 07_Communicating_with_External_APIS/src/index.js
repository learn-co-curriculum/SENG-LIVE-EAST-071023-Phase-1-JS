const resultsDiv = document.querySelector('#results');
document.addEventListener('DOMContentLoaded', () => {
  const apiSearchForm = document.querySelector('#api-Search');
  
  apiSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);
    resultsDiv.innerHTML = "";
    // fetch(`https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`)
    //   .then(response => response.json())
    //   .then(show => {
    //     const elements = [
    //       createElement('h1', { textContent: show.name }),
    //       createElement('img', { src: show.image.medium, alt: `${show.name} poster` }),
    //       createElement('div', { innerHTML: show.summary }),
    //       // for each episode we'll do these 3 lines below
    //     ];
    //     resultsDiv.append(...elements);
    //     show._embedded.episodes.forEach(episode => {
    //       const episodeElements = [
    //         createElement('h2', { textContent: `S${episode.season} E${episode.number}. ${episode.name}` }),
    //         createElement('img', { src: episode.image?.medium, alt: `${episode.name} poster` }),
    //         createElement('div', { innerHTML: episode.summary })
    //       ]
    //       resultsDiv.append(...episodeElements)
    //     })
    //   })

    // Google books
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        const items = results.items;
        
        items.forEach(item => {
          const h1 = document.createElement('h1');
          h1.textContent = item.volumeInfo.title;
  
          resultsDiv.append(h1);
  
          const pAuthor = document.createElement('p');
          pAuthor.textContent = `by ${item.volumeInfo.authors.join(', ')}`
          resultsDiv.append(pAuthor);
  
          if (item.volumeInfo.imageLinks) {
            const img = document.createElement('img');
            img.src = item.volumeInfo.imageLinks.thumbnail;
            img.alt = `${item.volumeInfo.title} cover`
            resultsDiv.append(img);
          } else {
            resultsDiv.append("No image available")
          }
  
          const pDescription = document.createElement('p');
          pDescription.textContent = item.volumeInfo.description;
          resultsDiv.append(pDescription);
        })
        
      })
  })

  // const elements = [
  //   createElement('button', {
  //     textContent: 'Click Me!',
  //     onClick: () => console.log('thanks')
  //   }),
  //   createElement('img', {
  //     src: 'https://static.tvmaze.com/uploads/images/medium_portrait/379/948380.jpg'
  //   })
  // ];
  // resultsDiv.append(...elements);
})

