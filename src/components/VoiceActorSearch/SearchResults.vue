<template>
  <div>
    <p v-if="!results.length">No voice actors match your search</p>

    <div v-else>
      <div v-for="actor in results">
        <SearchResultCard :actor="actor" />
      </div>

      <div class="pagination">
        <div
          class="pag-controls"
          v-show="pageNumber - 1"
          @click="$emit('update-page-number', pageNumber - 1)"
        >
          Previous
        </div>
        <div v-for="num in numberOfPages">
          <span
            :class="`page ${pageNumber === num ? 'active' : ''}`"
            role="button"
            @click="$emit('update-page-number', num)"
            >{{ num }}</span
          >
        </div>
        <div
          class="pag-controls"
          v-show="pageNumber < pages"
          @click="$emit('update-page-number', pageNumber + 1)"
        >
          Next
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchResultCard from "./SearchResultCard.vue";

export default {
  name: "SearchResults",
  components: { SearchResultCard, SearchResultCard },
  props: ["results", "pages", "pageNumber"],
  emits: ["update-page-number"],
  computed: {
    numberOfPages() {
      const pageLength = this.pages > 10 ? 10 : this.pages;
      const extraPages = this.pages > 10 ? this.pages - 10 : 1;

      return Array.from({ length: pageLength }, (_, i) => i + extraPages);
    },
  },
  methods: {},
};
</script>


<style>
.pagination {
  display: flex;
  margin: 20px auto;
  width: fit-content;
  color: #1e88e5;
  font-weight: bold;
}

.page {
  padding-left: 5px;
  padding-right: 5px;
}

.page:not(.active) {
  cursor: pointer;
}

.pag-controls {
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
}

.active {
  color: #000000;
}
</style>
