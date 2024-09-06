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
        <button @click.prevent="searchMovie" class="miniSearch search">
          Search
        </button>
      </ul>
      <button class="menuBtn" @click.prevent="showNavlists">
        <i class="fa-solid fa-bars" v-if="isNavShow"></i>
        <i class="fa-solid fa-x" v-else></i>
      </button>
      <button class="search" @click.prevent="searchMovie">Search</button>
    </nav>
    <SearchContainer />
    <CarousselContainer />
    <MovieContainer />
    <MovieContainer2 />
    <Newsletter />
  </div>
</template>
<script>
import MovieContainer from "../components/MovieContainer.vue";
import MovieContainer2 from "../components/MovieContainer2.vue";
import Newsletter from "../components/Newsletter.vue";
import CarousselContainer from "../components/CarousselContainer.vue";
import SearchContainer from "../components/SearchContainer.vue";
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
      isNavShow: false,
      activeNav: "carouselExampleIndicators",
    };
  },
  components: {
    MovieContainer,
    MovieContainer2,
    Newsletter,
    CarousselContainer,
    SearchContainer,
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

      if (scrollPosition >= newsletterSectionTop) {
        this.activeNav = "newsletter";
        this.isScrolled = true;
      } else if (scrollPosition >= moviesSection2Top) {
        this.activeNav = "moviesSection2";
        this.isScrolled = true;
      } else if (scrollPosition >= moviesSectionTop) {
        this.activeNav = "moviesSection";
        this.isScrolled = true;
      } else if (scrollPosition >= homeSectionTop) {
        this.activeNav = "carouselExampleIndicators";
        this.isScrolled = false;
      }
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
