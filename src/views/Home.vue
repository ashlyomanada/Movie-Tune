<template>
  <div class="container">
    <nav class="navbar" :style="{ left: toggleStyle ? '0' : '-100%' }">
      <div class="logo-container">
        <h1>MOVIETUNE</h1>
        <button class="menuBtn" @click.prevent="toggleNav">
          <i class="fa-solid fa-xmark fa-2xl"></i>
        </button>
      </div>
      <hr />
      <ul class="navlist">
        <li>
          <button class="buttons buttons-active" data-btn-id="1">
            <i class="fa-solid fa-house fa-xl"></i>HOME
          </button>
        </li>
        <li>
          <button class="buttons">
            <i class="fa-solid fa-video fa-xl"></i>MOVIES
          </button>
        </li>
        <li>
          <button class="buttons">
            <i class="fa-solid fa-clapperboard fa-xl"></i>SERIES
          </button>
        </li>
        <li>
          <button class="buttons">
            <i class="fa-regular fa-heart fa-xl"></i>FAVORITE
          </button>
        </li>
      </ul>
      <hr />
      <ul class="navlist">
        <h2 class="nav-title">Account</h2>
        <li>
          <button class="buttons">
            <i class="fa-solid fa-user-check fa-xl"></i>JOHNSON
          </button>
        </li>
        <li>
          <button class="buttons">
            <i class="fa-solid fa-user fa-xl"></i>LYLIA
          </button>
        </li>
      </ul>
      <hr />
      <div class="logout-container">
        <button class="buttons logOutBtn">
          <i class="fa-solid fa-right-from-bracket fa-xl"></i>LOGOUT
        </button>
      </div>
    </nav>

    <div class="searchbar-container">
      <div class="menuBtn-container">
        <button class="menuBtn" @click.prevent="toggleNav">
          <i class="fa-solid fa-bars fa-2xl"></i>
        </button>
      </div>
      <div class="searchbar">
        <input
          type="text"
          v-model="searchValue"
          id="searchbar"
          placeholder="Search"
          @change="getMovies"
        />
        <button class="search-btn" @click.prevent="searchMovies">
          <i class="fa-solid fa-magnifying-glass fa-xl"></i>
        </button>
      </div>
      <div class="notification-container">
        <button class="notificationBtn">
          <i class="fa-regular fa-bell fa-xl"></i>
        </button>
        <p class="acctName">johnson</p>
        <span><i class="fa-solid fa-circle-user fa-xl"></i></span>
      </div>
    </div>

    <div class="mainContainer">
      <div v-for="movie in movies" :key="movie">
        <button class="movie-box" @click.prevent="toggleMovie(movie)">
          <div class="movie-picture">
            <img
              class="picture"
              :src="IMGPATH + movie.poster_path"
              :alt="movie.title"
            />
          </div>
          <div class="movie-details">
            <p>{{ movie.title }}</p>
            <div class="details">
              <span :class="getClassByRate(movie.vote_average)">{{
                movie.vote_average
              }}</span>
              <p>&#9675;</p>
              <p>{{ movie.release_date }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="display-container" v-if="toggle">
      <div
        class="main-container"
        :style="`background-image: url(${IMGPATH + selectedMovie.backdropImg})`"
      >
        <button class="movieExitBtn" @click="toggleClose">
          <i class="fa-solid fa-xmark fa-2xl"></i>
        </button>
      </div>
      <h2 class="movie-title">{{ selectedMovie.movieTitle }}</h2>
      <p class="short-description">{{ selectedMovie.overview }}</p>
    </div>

    <!-- <button class="movieExitBtn" @click="getPageMovies(page++)">
      Page {{ page }}
    </button> -->

    <h2>{{ errorMessage }}</h2>
  </div>
</template>

<script>
import Movies from "../components/Movies.vue";
export default {
  data() {
    return {
      movies: [],
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
      searchValue: "",
      errorMessage: "",
      toggle: false,
      selectedMovie: {
        backdropImg: "",
        movieTitle: "",
        overview: "",
      },
      page: 2,
      toggleStyle: true,
    };
  },
  components: {
    Movies,
  },

  async mounted() {
    await this.getMovies();
  },

  methods: {
    async getMovies() {
      const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;
      this.movies = movies;
      console.log(respdata);
      this.errorMessage = null;
    },

    async getPageMovies(page) {
      const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;
      this.movies = movies;
      // console.log(respdata);
      this.errorMessage = null;
    },

    async searchMovies() {
      const searchMovieUrl =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
      const response = await fetch(searchMovieUrl + this.searchValue);
      const respdata = await response.json();
      const movies = respdata.results;

      if (movies.length > 0) {
        this.movies = movies;
      } else {
        this.movies = null;
        this.errorMessage = "No movies found";
      }
    },

    getClassByRate(vote) {
      if (vote > 8) {
        return "green";
      } else if (vote >= 5) {
        return "orange";
      } else {
        return "red";
      }
    },

    toggleMovie(movie) {
      this.toggle = !this.toggle;
      this.selectedMovie.backdropImg = movie.backdrop_path;
      this.selectedMovie.movieTitle = movie.original_title;
      this.selectedMovie.overview = movie.overview;
    },

    toggleClose() {
      this.toggle = !this.toggle;
    },

    toggleNav() {
      this.toggleStyle = !this.toggleStyle;
    },
  },
};
</script>

<style></style>
