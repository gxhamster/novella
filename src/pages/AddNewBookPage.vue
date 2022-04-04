<template>
  <PageContainer title="Add new book">
    <FormControl
      class="grid grid-cols-2 h-full gap-x-14"
      :formData="[...book_fields, ...small_fields_left, ...small_fields_right]"
    >
      <div
        v-for="(field, index) in book_fields"
        :key="field.title"
        class="relative"
      >
        <SearchInput
          v-if="field.searchable"
          @dropdownItemSelected="(obj) => (book_fields[index].text = obj.title)"
          :searchData="field.search_data"
          v-model="book_fields[index].text"
          :title="field.title"
          :validate="book_fields[index].validator"
          :ref="(el) => (book_fields[index].elem = el)"
        />
        <InputText
          v-else
          v-model="book_fields[index].text"
          :title="field.title"
          :validate="book_fields[index].validator"
          :ref="(el) => (book_fields[index].elem = el)"
        />
      </div>
      <div class="flex gap-x-6">
        <div v-for="(field, index) in small_fields_left" :key="field.title">
          <InputText
            v-model="small_fields_left[index].text"
            :searchable="field.searchable"
            :title="field.title"
            :validate="small_fields_left[index].validator"
            :ref="(el) => (small_fields_left[index].elem = el)"
          />
        </div>
      </div>
      <section class="flex gap-x-6">
        <div v-for="(field, index) in small_fields_right" :key="field.title">
          <InputText
            v-model="small_fields_right[index].text"
            :searchable="field.searchable"
            :title="field.title"
            :validate="small_fields_right[index].validator"
            :ref="(el) => (small_fields_right[index].elem = el)"
          />
        </div>
      </section>
      <SubmitButtonsGroup class="col-span-2" />
    </FormControl>
  </PageContainer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import InputText from "@/components/InputText";
import FormControl from "@/components/FormControl";
import PageContainer from "@/components/PageContainer";
import SearchInput from "@/components/SearchInput";
import SubmitButtonsGroup from "../components/SubmitButtonsGroup.vue";
import { bookStore } from "@/stores/store";
import { prettyCapitalize, PageLayoutData } from "@/utils/helper";
import { groupByKey, SearchItemClass } from "@/utils/search";
import { validate } from "@/utils/validation";

const bookstore = bookStore();

const book_fields = ref([
  new PageLayoutData("Title", {
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 20,
        message: "Title should be between 5 and 20",
      }),
  }),
  new PageLayoutData("Author", {
    searchable: true,
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 30,
        message: "Author should be between 5 and 30",
      }),
  }),
  new PageLayoutData("Book Number", {
    validator: (text) => validate(text).isNumeric(),
  }),
  new PageLayoutData("Genre", {
    searchable: true,
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 30,
        message: "Genre should be between 5 and 30",
      }),
    required: false,
  }),
  new PageLayoutData("DDC", {
    validator: (text) =>
      validate(text).isAlpha({
        message: "DDC should contain a-z 0-9 or .",
      }),
  }),
  new PageLayoutData("Publisher", {
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 5,
        max: 20,
        message: "Publisher should be between 5 and 20",
      }),
  }),
]);
const small_fields_left = ref([
  new PageLayoutData("Edition", {
    validator: (text) => validate(text).isNumeric(),
    required: false,
  }),
  new PageLayoutData("Pages", {
    validator: (text) => validate(text).isNumeric(),
    required: false,
  }),
]);

const small_fields_right = ref([
  new PageLayoutData("Language", {
    validator: (text) => validate(text).isNumeric(),
    required: false,
  }),
  new PageLayoutData("Year", {
    validator: (text) => validate(text).isNumeric(),
    required: false,
  }),
]);

function storeGetAuthorData() {
  // Remove duplicate titles
  const book_results = [
    ...bookstore.books.map(
      (v) =>
        new SearchItemClass(
          prettyCapitalize(v.author === "" ? "N/A" : v.author),
          "user",
          {}
        )
    ),
  ];

  // Group objects by author
  const grouped_result = groupByKey("title", book_results, false);

  const final_result = [];
  for (const arr of grouped_result.values()) {
    if (arr.length >= 1) arr[0].optional["books written"] = arr.length;
    final_result.push(arr[0]);
  }
  return [...final_result];
}

function storeGetGenreData() {
  // Remove duplicate titles
  const book_results = [
    ...bookstore.books.map(
      (v) =>
        new SearchItemClass(
          prettyCapitalize(v.subject === "" ? "N/A" : v.subject),
          "book",
          {}
        )
    ),
  ];
  // Group objects by author
  const grouped_result = groupByKey("title", book_results, false);
  const final_result = [];
  for (const arr of grouped_result.values()) {
    final_result.push(arr[0]);
  }
  return [...final_result];
}

function setStoreData() {
  const author_result = storeGetAuthorData();
  const genre_result = storeGetGenreData();
  book_fields.value = book_fields.value.map((v) => {
    if (v.title === "Author") return v.setSearchData(author_result);
    else if (v.title === "Genre") return v.setSearchData(genre_result);
    else return v;
  });
}

bookstore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {
      setStoreData();
    });
  }
}, true);

onMounted(() => {
  setStoreData();
});
</script>
