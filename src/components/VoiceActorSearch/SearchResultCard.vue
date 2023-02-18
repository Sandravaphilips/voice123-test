<template>
  <div class="result-card">
    <figure class="user-image">
      <img :src="profileUrl" alt="user-profile" />
    </figure>

    <div class="actor-details">
      <h3>
        <a
          :href="`https://voice123.com/${actor.user.username}`"
          target="_blank"
          class="actor-name"
          >{{ actorName }}</a
        >
      </h3>
      <div v-html="actor.highlight"></div>
      <audio controls :src="actor.relevant_sample.file">
        <a :href="actor.relevant_sample.file">Download audio</a>
      </audio>
    </div>
  </div>
</template>

<script>
import defaultProfile from "../../assets/default-profile.jpeg";

export default {
  name: "SearchResultCard",
  props: ["actor"],
  computed: {
    profileUrl() {
      return (
        this.actor.user.picture_small ||
        this.actor.user.picture_medium ||
        this.actor.user.picture_large ||
        defaultProfile
      );
    },
    actorName() {
      return this.actor.user.name
        .split(" ")
        .map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length)}`)
        .join(" ");
    },
    audioUrl() {
      return encodeURIComponent(this.actor.relevant_sample.file);
    },
  },
  methods: {
    // findQueryText(query) {
    //   if {}
    // }
  },
};
</script>

<style>
.result-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  margin-bottom: 40px;
  height: auto;
}

.user-image {
  width: 200px;
  height: 200px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actor-details {
  width: calc(100% - 250px);
}

.actor-name {
  color: #1e88e5;
  text-decoration: none;
}

.highlight {
  background-color: yellow;
  font-weight: bold;
}

audio {
  margin-top: 20px;
}

@media screen and (max-width: 700px) {
  .result-card {
    flex-direction: column;
  }
}
</style>
