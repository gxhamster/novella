<template>
  <PageContainer :max="true" title="Directory">
    <DataTable
      :data="bookstore.books"
      :dataProps="[
        'title',
        'author',
        'bnumber',
        'subject',
        'ddc',
        'language',
        'edition',
      ]"
      :headings="tableHeadings"
    />
  </PageContainer>
</template>

<script setup>
import { onMounted } from "vue";
import PageContainer from "@/components/PageContainer";
import DataTable from "../components/DataTable.vue";
import { bookStore } from "@/stores/store";

const bookstore = bookStore();

const tableHeadings = [
  "Title",
  "Author",
  "No.",
  "Genre",
  "DDC",
  "Language",
  "Edition",
];
bookstore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {});
  }
}, true);
onMounted(() => {});
</script>
