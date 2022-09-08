<template>
  <div class="box relative desktop:w-96 laptop:w-80">
    <MagnifyIcon
      class="text-primary absolute desktop:top-3 desktop:right-6 laptop:top-2 laptop:right-6"
      icon="fa-regular fa-magnifying-glass"
    />
    <input
      @input="filterResults"
      :value="searchText"
      class="bg-secondary custom-shadow text-gray-500 rounded-full appearance-none text-right outline-none w-full pr-16 desktop:py-3 laptop:py-2"
      placeholder="Search..."
    />
    <SearchDropdown
      class="dropdown"
      :showAddBtn="false"
      @itemClicked="dropdownItemClicked"
      :data="filteredResults"
    />
  </div>
</template>

<script setup>
import { ref, onUnmounted, watch, reactive } from "vue";
import MagnifyIcon from "vue-material-design-icons/Magnify.vue";
import { userStore, bookStore } from "@/stores/store";
import SearchDropdown from "./SearchDropdown";
import { prettyCapitalize, filteredTextInput } from "@/utils/helper";
import { SearchItemClass, filterPromise, groupByTitle } from "@/utils/search";

const store = userStore();
const bookstore = bookStore();
const searchText = ref("");
const filteredResults = ref([]);
const inputDelay = 550;
let results = [];
let timeout = null;
const result_obj = reactive({
  user_data: null,
  book_data: null,
});

function setResult() {
  results = [...result_obj.book_data, ...result_obj.user_data];
  filteredResults.value = results;
}

watch(result_obj, (new_result_obj) => {
  // Wait for both stores to get fetch data
  if (Object.values(new_result_obj).filter((v) => v === null).length === 0) {
    setResult();
  }
});

function dropdownItemClicked(obj) {
  console.log(obj);
}

store.$onAction(({ name, after }) => {
  // When data has been fetched add those to searcable results
  if (name === "setDataFetched") {
    after(() => {
      result_obj.user_data = [
        ...store.users.map(
          (v) =>
            new SearchItemClass(prettyCapitalize(v.name), "user", {
              index: v.index,
              grade: v.grade,
              address: v.address,
              island: v.island,
            })
        ),
      ];
    });
  }
}, true);

bookstore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {
      // Remove duplicate titles
      const book_results = [
        ...bookstore.books.map(
          (v) =>
            new SearchItemClass(prettyCapitalize(v.title), "book", {
              author: v.author === "" ? "N/A" : prettyCapitalize(v.author),
              subject: prettyCapitalize(v.subject),
              publisher: prettyCapitalize(v.publisher),
            })
        ),
      ];

      // Group objects by title
      const grouped_result = groupByTitle(book_results);

      const final_result = [];
      for (const arr of grouped_result.values()) {
        if (arr.length > 1) arr[0].optional.stock = arr.length;
        final_result.push(arr[0]);
      }
      result_obj.book_data = [...final_result];
    });
  }
}, true);

function setFilterResults(result) {
  filteredResults.value = result;
}

const filterResults = (event) => {
  searchText.value = filteredTextInput(event.target.value);
  timeout = setTimeout(() => {
    if (searchText.value === "") {
      filteredResults.value = results;
    }
    filterPromise(searchText, results)
      .then(setFilterResults)
      .catch(setFilterResults);
  }, inputDelay);
};

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<style scoped>
.dropdown {
  will-change: transform;
  will-change: opacity;
  transform: translateY(-15px);
  transition: all 250ms ease;
  opacity: 0;
  pointer-events: none;
}

.dropdown:hover {
  transform: translateY(0px);
  opacity: 1;
  pointer-events: auto;
}

.box:focus-within .dropdown {
  transform: translateY(0px);
  pointer-events: auto;
  opacity: 1;
}
</style>
