<template></template>

<script>
export default {
  async mounted() {
    this.getPexels();
  },

  methods: {
    getPexels() {
      // Replace 'YOUR_API_KEY' with your actual Pexels API key
      const apiKey = "IV8KdIPgykN5IW2iC20OvNtqKwnBVPdKHCPFOPhLQ2LwbwEIMI6Nj0Ta";

      // Search query (e.g., "nature", "technology", etc.)
      const query = "nature";

      // Number of photos to retrieve per page
      const perPage = 10;

      // Construct the URL for the API request
      const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`;

      // Make the API request
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: apiKey,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Pexels Data:", data);

          // Example: Display the first image in the console
          if (data.photos && data.photos.length > 0) {
            data.photos.forEach((photo) => {
              console.log(`Photo URL: ${photo.src.original}`);
            });
          } else {
            console.log("No photos found.");
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    },
  },
};
</script>

<style></style>
