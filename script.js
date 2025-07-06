const API_KEY = "152950f3";
const inputElement = document.getElementById("searchInput");
const buttonElement = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const movieResults = document.getElementById("movieResults");
const favourite = document.getElementById("favorites");
const messageElement = document.getElementById("message");


// Load favourite movie from Local
const favouriteMovies = JSON.parse(localStorage.getItem("favourites")) || [];

// OnLoading Favourite movies load and show from Local Storage
document.addEventListener("DOMContentLoaded", () => {
  const lastSearch = sessionStorage.getItem("lastSearch");
  if (lastSearch) {
    inputElement.value = lastSearch; // prefill input box
    searchMovies(lastSearch); // auto-fetch movies
  }
  displayFavorites(); // existing favourite loader
});


// Searching click or enter button
function handleSearchEvent(event) {
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter")
  ) {
    const query = inputElement.value.trim();
    if (query) {
      messageElement.textContent="";
      sessionStorage.setItem("lastSearch", query);
      searchMovies(query);
    }else{
      messageElement.textContent="Please enter a movie name..."
      return;
    }
  }
}

// ✅ Attach same handler to both elements
buttonElement.addEventListener("click", handleSearchEvent);
inputElement.addEventListener("keydown", handleSearchEvent);

// search the movies
async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      movieResults.innerHTML = `<p>No movies found for "${query}".</p>`;
    } else {
      displayMovies(data.Search);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// display the movies and info
function displayMovies(movies) {
  movieResults.innerHTML = "";

  movies.forEach((movie) => {
    // ek div banana hai
    const movieCard = document.createElement("div");

    // 🛠️ FIX: Escape ALL single quotes in title using regex
    const safeTitle = movie.Title.replace(/'/g, "\\'");

    // 🛠️ FIX: Check if already in favourites to show 'Added'
    const isFavourite = favouriteMovies.some((m) => m.id === movie.imdbID);

    movieCard.classList.add("movie-card");

    // 🛠️ FIX:
    // - Removed extra spaces in poster/year
    // - Added `data-id` instead of duplicate id="buttonToAdd"
    // - Added disabled if already in favourites
    // - Set text based on state
    movieCard.innerHTML = `
       <img src="${
         movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
       }" alt="${movie.Title}">
       <h3>${movie.Title}</h3>
       <p>${movie.Year}</p>
       <button 
         data-id="${movie.imdbID}"
         onclick="  addToFavourites('${movie.imdbID}', '${safeTitle}', '${
      movie.Poster
    }', '${movie.Year}', this)  " ${isFavourite ? "disabled" : ""}>
         ${isFavourite ? "Added ✅" : "Add to Favourites"}
       </button>
    `;

    movieResults.appendChild(movieCard);
  });
}

// Add To favourites
function addToFavourites(id, title, poster, year, btnElement) {
  // check already in list
  if (!favouriteMovies.some((movie) => movie.id === id)) {
    favouriteMovies.push({ id, title, poster, year });
    localStorage.setItem("favourites", JSON.stringify(favouriteMovies));

    // 🛠️ FIX: mark button as added & disable
    btnElement.textContent = "Added ✅";
    btnElement.disabled = true;

    // show updated list
    displayFavorites();
  }
}

// Display Favourites
function displayFavorites() {
  favourite.innerHTML = "";
  if (favouriteMovies.length === 0) {
    favourite.innerHTML = `<p>No favourites added yet.</p>`;
    return;
  }
  // har ek movie ke liye ek div banao
  // then css add kar do
  // usme details like poster title year addd kar do
  // then element ko favourite wale me jo box hai usme add kar de (append) // HTML wala me

  favouriteMovies.forEach((movie) => {
    const favouriteCard = document.createElement("div");
    favouriteCard.classList.add("movie-card");

    favouriteCard.innerHTML = `
    <img src="${
      movie.poster !== "N/A" ? movie.poster : "placeholder.jpg"
    }" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <button onclick="removeFavourite('${movie.id}')">Remove</button>
    `;
    favourite.append(favouriteCard); // finally iss fourite card ko append kar do
  });
}

function removeFavourite(id) {
  const updatedFavourites = favouriteMovies.filter((movie) => movie.id !== id);
  localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

  // update in-memory array
  favouriteMovies.length = 0;
  favouriteMovies.push(...updatedFavourites);

  displayFavorites();

  // 🛠️ FIX: Re-enable original search result button if it's visible
  const addBtn = document.querySelector(`button[data-id="${id}"]`);
  if (addBtn) {
    addBtn.textContent = "Add to Favourites";
    addBtn.disabled = false;
  }
}
