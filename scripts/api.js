const APIKEY = "04c35731a5ee918f014970082a0088b1";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);
}
getMovies(APIURL);

function showMovies(movies) {
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, release_date, backdrop_path } =
      movie;
    const movieEl = document.createElement("div");
    const movieContainer = document.querySelector(".movie-container");

    movieEl.innerHTML = `
    <button class="movie-box" data-details="${backdrop_path}">
            <div class="movie-picture">
              <img class="picture" src="${
                IMGPATH + poster_path
              }" alt="${title}" />
            </div>
            <div class="movie-details">
              <p>${title}</p>
              <div class="details">
              <span class="${getClassByRate(
                vote_average
              )}">${vote_average}</span>
                <p>&#9675;</p>
                <p>${release_date}</p>
              </div>
            </div>
          </button>
    `;
    movieContainer.appendChild(movieEl);
  });

  const buttons = document.querySelectorAll(".movie-box");
  const mainContainer = document.querySelector("#mainContainer");
  const body = document.querySelector("body");
  const shortdescripEl = document.querySelector(".short-description");
  const movieTitle = document.querySelector(".movie-title");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const buttonId = btn.dataset.details;
      let matchingItem = "";
      movies.forEach((movies) => {
        if (movies.backdrop_path === buttonId) {
          matchingItem = movies;
          mainContainer.style.backgroundImage = `url("${
            IMGPATH + matchingItem.backdrop_path
          }")`;
          body.style.backgroundImage = `url("${
            IMGPATH + matchingItem.backdrop_path
          }")`;
          shortdescripEl.innerHTML = matchingItem.overview;
          movieTitle.innerHTML = matchingItem.title;
        }
      });

      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");
    });
  });
}

function getClassByRate(vote) {
  if (vote > 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const searchBtn = document.querySelector(".search-btn");
const searchEl = document.querySelector("#searchbar");
const movieContainer = document.querySelector(".movie-container");
const navBtn = document.querySelectorAll(".buttons");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchValue = searchEl.value;

  if (searchValue) {
    getMovies(SEARCHAPI + searchValue);
    searchEl.value = "";
    movieContainer.innerHTML = "";
    navBtn.forEach((btn) => {
      btn.classList.remove("buttons-active");
    });
  }
});

navBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    navBtn.forEach((btn) => {
      btn.classList.remove("buttons-active");
    });
    btn.classList.add("buttons-active");
  });
});

const menuBtn = document.querySelector(".menuBtn");
const navBar = document.querySelector(".navbar");
const menuContainer = document.querySelector(".menuBtn-container");
const menuExitBtn = document.querySelector(".menuExitBtn");

menuBtn.addEventListener("click", () => {
  navBar.style.left = "0%";
  menuContainer.style.visibility = "hidden";
});

menuExitBtn.addEventListener("click", () => {
  navBar.style.left = "-100%";
  menuContainer.style.visibility = "unset";
});
