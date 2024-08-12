<template>
  <div>
    <nav :class="['navBar', { scrolled: isScrolled }]">
      <div class="logo-container">
        <h5>MovieTune</h5>
      </div>
      <ul
        class="navLists"
        id="navlists"
        :style="{ visibility: isNavShow ? 'hidden' : 'visible' }"
      >
        <li>
          <a
            class="anchor"
            :class="{ active: activeNav === 'carouselExampleIndicators' }"
            @click.prevent="scrollToSection('carouselExampleIndicators')"
          >
            Home
          </a>
        </li>
        <li>
          <a
            class="anchor"
            :class="{ active: activeNav === 'moviesSection' }"
            @click.prevent="scrollToSection('moviesSection')"
          >
            Trending
          </a>
        </li>
        <li>
          <a
            class="anchor"
            :class="{ active: activeNav === 'moviesSection2' }"
            @click.prevent="scrollToSection('moviesSection2')"
          >
            Movies
          </a>
        </li>
        <li>
          <a
            class="anchor"
            :class="{ active: activeNav === 'newsletter' }"
            @click.prevent="scrollToSection('newsletter')"
          >
            Newsletter
          </a>
        </li>
      </ul>
      <button class="menuBtn" @click.prevent="showNavlists">
        <i class="fa-solid fa-bars" v-if="isNavShow"></i>
        <i class="fa-solid fa-x" v-else></i>
      </button>
      <button class="search" @click.prevent="searchMovie">Search</button>
    </nav>

    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="movieInfo">
            <h1 class="movieTitle">{{ firstMovie.title }}</h1>
            <button class="signBtn">Watch Now</button>
          </div>
          <img
            :src="IMGPATH + firstMovie.backdrop_path"
            class="d-block w-10"
            alt="Slide 1"
          />
        </div>
        <div class="carousel-item">
          <div class="movieInfo">
            <h1 class="movieTitle">{{ secondMovie.title }}</h1>
            <button class="signBtn">Watch Now</button>
          </div>
          <img
            :src="IMGPATH + secondMovie.backdrop_path"
            class="d-block w-10"
            alt="Slide 2"
          />
        </div>
        <div class="carousel-item">
          <div class="movieInfo">
            <h1 class="movieTitle">{{ thirdMovie.title }}</h1>
            <button class="signBtn">Watch Now</button>
          </div>
          <img
            :src="IMGPATH + thirdMovie.backdrop_path"
            class="d-block w-10"
            alt="Slide 3"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <MovieContainer />
    <MovieContainer2 />
    <Newsletter />
  </div>
</template>
<script>
import MovieContainer from "../components/MovieContainer.vue";
import MovieContainer2 from "../components/MovieContainer2.vue";
import Newsletter from "../components/Newsletter.vue";
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      isScrolled: false,
      movies: [],
      moreMovies: [],
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
      toggle: false,
      page: 2,
      toggleStyle: true,
      firstMovie: "",
      secondMovie: "",
      thirdMovie: "",
      isNavShow: false,
      activeNav: "carouselExampleIndicators",
    };
  },
  components: {
    MovieContainer,
    MovieContainer2,
    Newsletter,
  },

  async mounted() {
    window.addEventListener("scroll", this.handleScroll);
    await this.getMovies();
    if (window.innerWidth <= 768) {
      this.isNavShow = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    async getMovies() {
      const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;

      this.movies = movies;

      let randomInt1 = this.getRandomInt(1, 20);
      let randomInt2 = this.getRandomInt(1, 20);
      let randomInt3 = this.getRandomInt(1, 20);
      this.firstMovie = movies[randomInt1];
      this.secondMovie = movies[randomInt2];
      this.thirdMovie = movies[randomInt3];

      // console.log(movies[0]);
    },

    showNavlists() {
      this.isNavShow = !this.isNavShow;
    },

    setActiveNav(navId) {
      this.activeNav = navId;
      if (window.innerWidth <= 768) {
        this.isNavShow = !this.isNavShow;
      }
    },

    scrollToSection(id) {
      this.setActiveNav(id); // Update active state
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Scroll to the section smoothly
      }
    },

    handleScroll() {
      const moviesSection = document.getElementById("moviesSection");
      const moviesSection2 = document.getElementById("moviesSection2");
      const homeSection = document.getElementById("carouselExampleIndicators");
      const newsletterSection = document.getElementById("newsletter");

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const moviesSectionTop = moviesSection.offsetTop;
      const moviesSection2Top = moviesSection2.offsetTop;
      const homeSectionTop = homeSection.offsetTop;
      const newsletterSectionTop = newsletterSection.offsetTop;

      // console.log(newsletterSectionTop);

      // Check each section's position relative to the scroll position
      if (scrollPosition >= newsletterSectionTop) {
        this.activeNav = "newsletter";
      } else if (scrollPosition >= moviesSection2Top) {
        this.activeNav = "moviesSection2";
      } else if (scrollPosition >= moviesSectionTop) {
        this.activeNav = "moviesSection";
      } else if (scrollPosition >= homeSectionTop) {
        this.activeNav = "carouselExampleIndicators";
      }
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    searchMovie() {
      const modalElement = document.getElementById("searchModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },
  },
};
</script>

<style>
/* .carousel-inner {
  height: 500px;
} */

.carousel-item img {
  object-fit: cover;
  height: 100vh;
  width: 100%;
}

.custom-modal-content {
  background-color: #000; /* Black background */
  color: #fff; /* White text color for contrast */
}

.modal-content {
  background-color: #000; /* Black background */
  color: #fff; /* White text color for contrast */
}
/* Optional: Customize the header for consistency */
.custom-modal-content .modal-header {
  border-bottom: 1px solid #444; /* Optional: Darker border for the header */
}

.btn-close {
  color: #fff;
}
</style>
