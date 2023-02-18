<template>
  <div>
    <Search @update-query="updateQuery" />
    <div v-show="query" class="results-container">
      <div v-if="loading">Loading...</div>

      <div v-else>
        <SearchResults
          :results="results"
          :pages="pages"
          :pageNumber="pageNumber"
          @update-page-number="updatePageNumber"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./Search.vue";
import SearchResults from "./SearchResults.vue";

export default {
  name: "VoiceActorSearch",
  components: { Search, SearchResults },
  data() {
    return {
      query: "",
      results: [],
      loading: true,
      pages: 0,
      pageNumber: 0,
    };
  },
  watch: {
    query(newValue, oldValue) {
      this.pages = 1;
      this.pageNumber = 1;
    },
    pageNumber(newValue, oldValue) {
      this.fetchResults(newValue > oldValue);
    },
  },
  methods: {
    async fetchResults(increasePages) {
      this.loading = true;
      const encodedUrl = encodeURIComponent(this.query);
      const response = await fetch(
        `https://api.sandbox.voice123.com/providers/search/?service=voice_over&keywords=${encodedUrl}&page=${this.pageNumber}`
      );

      if (response.ok) {
        const results = await response.json();
        this.results = this.addHighlights(results.providers);
        this.loading = false;
        if (increasePages && results.providers.length >= 10) this.pages += 1;
        console.log(this.pages);
      } else {
        this.loading = false;
        console.log("HTTP-Error: " + response.status);
      }
    },
    updateQuery(query) {
      this.query = query;
    },
    addHighlights(arr) {
      return arr.map((actor) => {
        let highlight = this.findQueryText(actor);
        highlight = highlight ? this.markQuery(highlight, this.query) : "";

        return { ...actor, highlight };
      });
    },
    findQueryText(obj) {
      const actorDetails = { ...obj };
      delete actorDetails.service_id;

      const actorProperties = Object.keys(actorDetails);

      for (const i of actorProperties) {
        if (
          typeof obj[i] === "string" &&
          obj[i].toLowerCase().includes(this.query.toLowerCase())
        ) {
          const splitString = obj[i].split("\n\n");
          if (splitString.length > 1) {
            return splitString.find((str) =>
              str.toLowerCase().includes(this.query.toLowerCase())
            );
          }
          return obj[i];
        } else if (obj[i] && obj[i].constructor === Object) {
          const result = this.findQueryText(obj[i]);
          if (result) return result;
        }
      }
    },
    markQuery(paragraph, query) {
      return paragraph.replace(
        new RegExp(query, "ig"),
        (match) => "<span class='highlight'>" + match + "</span>"
      );
    },
    updatePageNumber(value) {
      this.pageNumber = value;
    },
  },
};
</script>

<style>
.results-container {
  max-width: 700px;
  margin: 40px auto;
}
</style>
