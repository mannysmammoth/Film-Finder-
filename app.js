// API 1: https://www.omdbapi.com/?i=tt3896198&apikey=8e59a55
// API 2: 

async function fetchMovieData() {
    const movie = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=8e59a55&s=Run");
    const movieData = await movie.json();
    const resultsElement = document.querySelector(".results__container");

    console.log(movieData);

    resultsElement.innerHTML = movieData.Search.map((movie) => `<div class="display__box">
        <figure>
        <img class="movie__img" src="" alt="Movie Poster">
        </figure>
        <figcaption class="figure__caption">Movie Title</figcaption>
            <p class="movie__year">Year:</p>
            <p class="imdb__rating">IMDB Rating:</p>
            <p class="film__type">Type:</p>
        </div>`)
         
    
}


fetchMovieData();