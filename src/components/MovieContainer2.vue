<template>
  <div id="moviesSection2" class="movieSection">
    <div class="movieSectionContainer">
      <h3>Movies</h3>
      <div class="movieboxesContainer">
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
            <h5 class="title">{{ limitWord(movie.title) }}</h5>
            <span
              class="subTitle"
              :class="getClassByRate(movie.vote_average)"
              >{{ movie.vote_average }}</span
            >
          </div>
        </div>
      </div>
      <h2>{{ errorMessage }}</h2>
    </div>

    <div class="paginationNav">
      <button
        class="signBtn"
        :disabled="page < 2"
        @click.prevent="getPageMovies(page--)"
      >
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
  </div>

  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    id="trailerModal3"
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
      moreMovies: [],
      errorMessage: "",
      selectedMovie: [],
      trailerLink: "",
      isShowMovieInfo: false,
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
      page: 1,
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
      console.log(page);
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
      const modalElement = document.getElementById("trailerModal3");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
      // console.log(this.trailerLink);
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
      // console.log(movies);
    },

    closeMovieInfo() {
      this.isShowMovieInfo = !this.isShowMovieInfo;
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

    limitWord(word) {
      let sliceWord = "";
      if (window.innerWidth <= 768) {
        sliceWord = word.slice(0, 9);
        return sliceWord + "...";
      } else {
        return word;
      }
    },

    closeShowTrailer() {
      const modalElement = document.getElementById("trailerModal3");
      const modalInstance = new Modal(modalElement);
      modalInstance.hide();
      this.trailerLink = null;
    },
  },
};
</script>

<style></style>
