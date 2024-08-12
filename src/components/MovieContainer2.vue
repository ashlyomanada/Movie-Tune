<template>
  <div
    class="modal fade"
    id="searchModal"
    tabindex="-1"
    aria-labelledby="searchModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="searchModalLabel">Search Movie</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark fa-2xl"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex gap-2">
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Search for movies..."
              v-model="searchValue"
              @change="getMovies"
            />
            <button class="signBtn" @click.prevent="searchMovies">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="moviesSection2" class="moviesContainer">
    <div class="centerContainer">
      <h3>Movies</h3>
      <div class="boxesContainer">
        <div
          class="movieBox"
          v-for="movie in moreMovies"
          :key="movie"
          @click.prevent="showMovieInfo2(movie)"
        >
          <div class="moviePosterContainer">
            <img
              class="moviePoster"
              :src="IMGPATH + movie.poster_path"
              :alt="movie.title"
            />
          </div>
          <div class="movieInfos">
            <h5>{{ movie.title }}</h5>
          </div>
        </div>
      </div>
      <h2>{{ errorMessage }}</h2>
    </div>

    <div class="paginationNav">
      <button class="signBtn" @click.prevent="getPageMovies(page--)">
        Previous
      </button>
      <button class="nextBtn" @click.prevent="getPageMovies(page++)">
        Next
      </button>
    </div>

    <div class="showMovieInfoContainer" v-if="isShowMovieInfo">
      <div class="movieBackdropContaiiner">
        <div class="selectedMovieInnfo">
          <h3>{{ selectedMovie.title }}</h3>
          <p>{{ selectedMovie.overview }}</p>
          <p>Released : {{ selectedMovie.release_date }}</p>
          <div class="btnContainers">
            <button
              @click.prevent="getMovieTrailer(selectedMovie.id)"
              class="signBtn"
            >
              Watch Trailer
            </button>
            <button class="closeBtn" @click.prevent="closeMovieInfo">
              Close
            </button>
          </div>
        </div>
        <img
          class="showedImage"
          :src="IMGPATH + selectedMovie.backdrop_path"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      moreMovies: [],
      errorMessage: "",
      selectedMovie: [],
      isShowMovieInfo: false,
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
    };
  },

  async mounted() {
    await this.getMoreMovies();
  },

  methods: {
    async getMoreMovies() {
      const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=2";

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;

      this.moreMovies = movies;
    },

    async getPageMovies(page) {
      const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${page}`;

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;
      this.moreMovies = movies;
    },

    async searchMovies() {
      const searchMovieUrl =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
      const response = await fetch(searchMovieUrl + this.searchValue);
      const respdata = await response.json();
      const movies = respdata.results;

      if (movies.length > 0) {
        this.moreMovies = movies;
        // this.scrollToSection("moviesSection");
      } else {
        this.moreMovies = null;
        this.errorMessage = "No movies found";
      }
    },

    showMovieInfo2(movies) {
      this.selectedMovie.id = movies.id;
      this.selectedMovie.title = movies.title;
      this.selectedMovie.backdrop_path = movies.backdrop_path;
      this.selectedMovie.overview = movies.overview;
      this.selectedMovie.poster_path = movies.poster_path;
      this.selectedMovie.release_date = movies.release_date;
      this.isShowMovieInfo = !this.isShowMovieInfo;
      //   console.log(this.selectedMovie.id);
    },

    closeMovieInfo() {
      this.isShowMovieInfo = !this.isShowMovieInfo;
    },
  },
};
</script>

<style></style>
