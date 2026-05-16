// API 1: https://www.omdbapi.com/?apikey=8e59a55

/*
GLOBAL STORAGE
*/
let currentSearchResults = [];

/*
SEARCH FUNCTION
*/ 

async function performSearch() {
    const searchInputValue = document.getElementById("searchQuery").value.trim();
    if (!searchInputValue) {
        alert("Please enter a movie name to search.");
        return;
    }

    await fetchMovieData(searchInputValue);
}

/*
ARRAY OF MOVIES / RESULTS
*/ 

async function fetchMovieData(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=8e59a55&s=${encodeURIComponent(searchTerm)}`);
    const movieData = await response.json();
    const resultsElement = document.querySelector(".results__container");

    if (!movieData || movieData.Response === "False") {
        resultsElement.innerHTML = `<p class="no-results">No results found for "${searchTerm}".</p>`;
        currentSearchResults = [];
        return;
    }

    currentSearchResults = movieData.Search;
    displayMovies(currentSearchResults);
}

function displayMovies(movies) {
    const resultsElement = document.querySelector(".results__container");
    const moviesHTML = movies.map((movie) => `
        <div class="display__box">
            <figure>
                <img class="movie__img" src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}" alt="Movie Poster">
            </figure>
            <figcaption class="figure__caption">${movie.Title}</figcaption>
            <p class="movie__year">Year: ${movie.Year}</p>
            <p class="film__type">Type: ${movie.Type}</p>
        </div>
    `).join("");

    resultsElement.innerHTML = moviesHTML;
}

/*
ENTER KEY EVENT LISTENER
*/ 

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchQuery");
    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                performSearch();
            }
        });
    }
});

/*
SORT FUNCTION
*/ 

function sortResults(sortType) {
    if (!currentSearchResults.length) return;
    
    let sorted = [...currentSearchResults];
    
    if (sortType === "movie") {
        sorted = currentSearchResults.filter(movie => movie.Type === "movie");
    } else if (sortType === "tv") {
        sorted = currentSearchResults.filter(movie => movie.Type === "series");
    } else if (sortType === "year__newest_to_oldest") {
        sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (sortType === "year__oldest_to_newest") {
        sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }
    
    displayMovies(sorted);
}

