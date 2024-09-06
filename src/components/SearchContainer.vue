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
          <form @submit.prevent="searchMovies" class="d-flex gap-2">
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Search for movies..."
              v-model="searchValue"
              required
            />
            <button type="submit" class="signBtn">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div class="searchedSectionContainer" v-if="isFound">
    <div class="searchHeader">
      <h3>Search results for: {{ findedValue }}</h3>
      <div class="d-flex gap-1">
        <button class="search" @click.prevent="searchMovie">Search</button>
        <button class="btn btn-dark" @click.prevent="closeSearchContainer">
          <i class="fa-solid fa-xmark fa-2xl"></i>
        </button>
      </div>
    </div>
    <div class="searchMovieboxesContainer">
      <div
        class="movieBox"
        v-for="movie in searchedMovies"
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
          <h5 class="title">{{ limitWord(movie.title) }}</h5>
          <span class="subTitle" :class="getClassByRate(movie.vote_average)">{{
            movie.vote_average
          }}</span>
        </div>
      </div>
    </div>
    <h2 style="color: white">{{ errorMessage }}</h2>
  </div>

  <div class="showMovieInfoContainer" v-if="isShowMovieInfo">
    <div class="movieBackdropContaiiner">
      <div class="selectedMovieInnfo">
        <h3>{{ selectedMovie.title }}</h3>
        <p>{{ selectedMovie.overview }}</p>
        <p>Released : {{ selectedMovie.release_date }}</p>
        <p>
          Rating:
          <span :class="getClassByRate(selectedMovie.vote_average)">{{
            selectedMovie.vote_average
          }}</span>
        </p>
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

  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    id="searchTrailer"
    tabindex="-1"
    aria-labelledby="trailerModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="trailerModalLabel">Movie Trailer</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="closeShowTrailer"
          >
            <i class="fa-solid fa-xmark fa-2xl"></i>
          </button>
        </div>
        <div class="modal-body">
          <iframe
            width="100%"
            height="400"
            :src="trailerLink"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      searchValue: "",
      findedValue: "",
      searchedMovies: [],
      selectedMovie: [],
      trailerLink: "",
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
      isFound: false,
      isShowMovieInfo: false,
    };
  },

  methods: {
    async searchMovies() {
      const searchMovieUrl =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
      const response = await fetch(searchMovieUrl + this.searchValue);
      const respdata = await response.json();
      const movies = respdata.results;
      this.isFound = true;
      setTimeout(() => {}, 500);

      if (movies.length > 0) {
        this.searchedMovies = movies;
        this.findedValue = this.searchValue;
        console.log(movies);
      } else {
        this.searchedMovies = null;
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
      this.selectedMovie.vote_average = movies.vote_average;
      this.isShowMovieInfo = !this.isShowMovieInfo;
      console.log(movies);
    },

    async getMovieTrailer(movieId) {
      const APIKEY = "04c35731a5ee918f014970082a0088b1";
      const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}`;
      const response = await fetch(videoUrl);
      const respData = await response.json();
      const trailers = respData.results;

      const founded = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      this.trailerLink = `https://www.youtube.com/embed/${founded.key}`;
      this.isTrailerShow = true;
      const modalElement = document.getElementById("searchTrailer");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
      // console.log(this.trailerLink);
    },

    limitWord(word) {
      let sliceWord = "";
      if (window.innerWidth <= 768) {
        sliceWord = word.slice(0, 9);
        return sliceWord + "...";
      } else {
        return word;
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

    closeMovieInfo() {
      this.isShowMovieInfo = !this.isShowMovieInfo;
    },

    searchMovie() {
      const modalElement = document.getElementById("searchModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },

    closeSearchContainer() {
      this.isFound = !this.isFound;
      this.searchValue = null;
    },
  },
};
</script>

<style></style>
