const movies = [
  {
    id: 1,
    movieThumbnail: "thumbnails/buzz-lightyear.jpg",
    movieImage: "images/buzz-lightyear.jpg",
    movieTitle: "Lightyear",
    movieDescription:
      "The film follows Buzz Lightyear (Evans) operating as a space ranger who, after being marooned on the hostile planet T'Kani Prime with his commander and crew, tries to find a way back home while encountering a threat to the universe's safety.",
    movieDate: "2022",
    movieLength: "1h 45m",
  },
  {
    id: 2,
    movieThumbnail: "thumbnails/quantumania.jpeg",
    movieImage: "images/quantumania.jpg",
    movieTitle: "Quantumania",
    movieDescription:
      "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scott's daughter Cassie. Together they must find a way to escape, but what secrets is Hope's mother hiding? And who is the mysterious Kang?",
    movieDate: "2023",
    movieLength: "2h 5m",
  },
  {
    id: 3,
    movieThumbnail: "thumbnails/mariobros.jpg",
    movieImage: "images/mariobros.jpg",
    movieTitle: "Mario Bros",
    movieDescription:
      "A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess. A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.",
    movieDate: "2023",
    movieLength: "1h 32m",
  },
  {
    id: 4,
    movieThumbnail: "thumbnails/meg.jpg",
    movieImage: "images/meg2.jpg",
    movieTitle: "Meg2",
    movieDescription:
      "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation. A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.",
    movieDate: "2023",
    movieLength: "1h 56m",
  },
  {
    id: 5,
    movieThumbnail: "thumbnails/Rise-of-the-Beasts.jpg",
    movieImage: "images/transformer.jpg",
    movieTitle: "Transformer Rise of the Beast",
    movieDescription:
      "The planet-eating Unicron attacks the homeworld of the Maximals, an advanced race of Transformers with alternate beast modes. The Terrorcons, Unicron's heralds led by Scourge, seek to obtain the Transwarp Key which can open portals through space and time .",
    movieDate: "2023",
    movieLength: "2h 7m",
  },
];

const movieContainerEl = document.querySelector(".movie-container");
let moviebox = "";

movies.forEach((movie) => {
  moviebox += `
<button class="movie-box" data-details="${movie.movieThumbnail}">
            <div class="movie-picture">
              <img class="picture" src="${movie.movieImage}" alt="" />
            </div>
            <div class="movie-details">
              <p>${movie.movieTitle}</p>
              <div class="details">
                <p>${movie.movieDate}</p>
                <p>&#9675;</p>
                <p>${movie.movieLength}</p>
              </div>
            </div>
          </button>
`;
});
movieContainerEl.innerHTML = moviebox;

const movieboxBtn = document.querySelectorAll(".movie-box");
let matchingItem = "";

movieboxBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonThumbnail = button.dataset.details;
    const mainContainer = document.getElementById("mainContainer");
    const body = document.querySelector("body");
    const movieTitleEl = document.querySelector(".movie-title");
    const shortdescripEl = document.querySelector(".short-description");
    const navbar = document.querySelector(".navbar");
    const searchbarContainer = document.querySelector(".searchbar-container");

    movies.forEach((movie) => {
      if (movie.movieThumbnail === buttonThumbnail) {
        matchingItem = movie;
        mainContainer.style.backgroundImage = `url(${matchingItem.movieThumbnail})`;
        body.style.backgroundImage = `url(${matchingItem.movieThumbnail})`;
        movieTitleEl.innerHTML = matchingItem.movieTitle;
        shortdescripEl.innerHTML = matchingItem.movieDescription;
      }
    });

    movieboxBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    navbar.classList.add("navbar-animation");
    searchbarContainer.classList.add("searchbar-animation");
    setTimeout(() => {
      navbar.classList.remove("navbar-animation");
      searchbarContainer.classList.remove("searchbar-animation");
    }, 500);
  });
});

const buttons = document.querySelectorAll(".buttons");
const displayContainer = document.querySelector(".display-container");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("buttons-active");
    });
    button.classList.add("buttons-active");
  });
});
