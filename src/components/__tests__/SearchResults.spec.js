import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SearchResults from "../VoiceActorSearch/SearchResults.vue";

const results = [
  {
    user: {
      name: "Sandrava Philips",
      username: "sandrava",
    },
    highlight: "I am a <span class='highlight'>voice</span> actor!",
    relevant_sample: {
      file: "https://v1-test-media.s3.us-west-2.amazonaws.com/samples/Voice123 - A voice recording - vachecktest.mp3",
    },
  },
];

const wrapper = mount(SearchResults, {
  props: { results: results, pages: 1, pageNumber: 2 },
});

describe("SearchResults", () => {
  it("renders properly when there are no results", () => {
    const noResultsWrapper = mount(SearchResults, { props: { results: [] } });
    expect(noResultsWrapper.text()).toContain(
      "No voice actors match your search"
    );
  });

  it("renders properly when there are results", () => {
    expect(wrapper.text()).toContain("Sandrava Philips");
  });

  it("no pagination displayed when there's only one page", () => {
    expect(wrapper.find(".pagination").exists()).toBe(false);
  });

  it("pagination is shown when there's more than one page", () => {
    const paginationWrapper = mount(SearchResults, {
      props: { results: results, pages: 2, pageNumber: 1 },
    });
    const pagination = paginationWrapper.find(".pagination");
    expect(pagination.text()).toContain("Next");
    expect(pagination.text()).toContain("1");
    expect(pagination.text()).toContain("2");
  });
});
