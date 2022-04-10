<template>
  <PageContainer :max="true" title="Directory">
    <template #titleContent>
      <span class="flex gap-2">
        <DirectoryPageBtn :isSmall="true" @clicked="() => false" title="Book"
          ><template #icon><BookIcon /> </template>
        </DirectoryPageBtn>
        <DirectoryPageBtn @clicked="() => false" title="Book"
          ><template #icon><BookIcon /> </template>
        </DirectoryPageBtn>
      </span>
    </template>
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
import DirectoryPageBtn from "@/components/DirectoryPageBtn.vue";
import BookIcon from "vue-material-design-icons/Book.vue";

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
