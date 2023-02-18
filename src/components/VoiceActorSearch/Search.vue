<template>
  <form @submit.prevent="$emit('update-query', q)">
    <input
      type="search"
      placeholder="Find voice actors with any keyword..."
      id="voice-search"
      v-model="q"
      minlength="3"
    />
    <button type="submit" class="submit-search">Search</button>
  </form>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      q: "",
    };
  },
  emits: ["update-query"],
  methods: {
    updateQuery() {
      console.log(this.q);
    },
  },
};
</script>

<style>
form {
  display: flex;
  justify-content: space-between;
}

#voice-search {
  width: calc(100% - 12rem);
  height: 50px;
}

.submit-search {
  height: 50px;
  width: 150px;
  background-color: #1e88e5;
  color: #ffffff;
  border-color: #1e88e5;
  box-shadow: none;
  border: none;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  form {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .submit-search {
    margin-top: 20px;
  }
}
</style>
