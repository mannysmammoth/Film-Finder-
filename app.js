// API 1: https://www.omdbapi.com/?apikey=8e59a55

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
        return;
    }

    resultsElement.innerHTML = movieData.Search.map((movie) => `
        <div class="display__box">
            <figure>
                <img class="movie__img" src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster'}" alt="Movie Poster">
            </figure>
            <figcaption class="figure__caption">${movie.Title}</figcaption>
            <p class="movie__year">Year: ${movie.Year}</p>
            <p class="film__type">Type: ${movie.Type}</p>
        </div>
    `).join("");
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
