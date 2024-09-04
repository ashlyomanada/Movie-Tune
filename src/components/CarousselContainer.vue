<template>
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
          <button
            class="signBtn"
            @click.prevent="showMainMovieTrailer(firstMovie.id)"
          >
            Watch Now
          </button>
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
          <button
            class="signBtn"
            @click.prevent="showMainMovieTrailer(secondMovie.id)"
          >
            Watch Now
          </button>
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
          <button
            class="signBtn"
            @click.prevent="showMainMovieTrailer(thirdMovie.id)"
          >
            Watch Now
          </button>
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

  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    id="trailerModal"
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
            class="btn-close d-flex align-items-center justify-content-center"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="closeMainMovieTrailer"
          >
            <i class="fa-solid fa-xmark fa-2xl"></i>
          </button>
        </div>
        <div class="modal-body">
          <iframe
            width="100%"
            height="400"
            :src="maintrailerLink"
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
      firstMovie: "",
      secondMovie: "",
      thirdMovie: "",
      IMGPATH: "https://image.tmdb.org/t/p/w1280/",
      maintrailerLink: "",
    };
  },

  async mounted() {
    await this.getMainMovies();
  },

  methods: {
    async getMainMovies() {
      const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

      const response = await fetch(APIURL);
      const respdata = await response.json();
      const movies = respdata.results;

      let randomInt1 = this.getRandomInt(1, 20);
      let randomInt2 = this.getRandomInt(1, 20);
      let randomInt3 = this.getRandomInt(1, 20);
      this.firstMovie = movies[randomInt1];
      this.secondMovie = movies[randomInt2];
      this.thirdMovie = movies[randomInt3];
    },

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getMainMovieTrailer() {
      const modalElement = document.getElementById("trailerModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },

    async showMainMovieTrailer(movieId) {
      const APIKEY = "04c35731a5ee918f014970082a0088b1";
      const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}`;
      const response = await fetch(videoUrl);
      const respData = await response.json();
      const trailers = respData.results;

      const founded = trailers.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      this.maintrailerLink = `https://www.youtube.com/embed/${founded.key}`;
      this.isTrailerShow = true;
      const modalElement = document.getElementById("trailerModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    },

    closeMainMovieTrailer() {
      const modalElement = document.getElementById("trailerModal");
      const modalInstance = new Modal(modalElement);
      modalInstance.hide();
      this.maintrailerLink = null;
    },
  },
};
</script>

<style>
.fa-xmark {
  color: white;
}
.fa-xmark:hover {
  color: white;
}
</style>
