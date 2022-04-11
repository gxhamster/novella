<template>
  <PageContainer :max="true" :title="pageTitle">
    <template #titleContent>
      <span class="flex gap-2">
        <DirectoryPageBtn
          v-for="btn in btnState"
          :key="btn.name"
          :isSmall="!btn.state"
          :title="btn.name"
          @clicked="toggleBtnState(btn)"
        >
          <template #icon><component :is="btn.icon" /></template>
        </DirectoryPageBtn>
      </span>
    </template>
    <DataTable
      :data="dataTableState.data"
      :dataProps="dataTableState.props"
      :headings="dataTableState.headings"
    />
  </PageContainer>
</template>

<script setup>
import { reactive, shallowRef, ref, onMounted } from "vue";
import PageContainer from "@/components/PageContainer";
import DataTable from "../components/DataTable.vue";
import { bookStore, userStore } from "@/stores/store";
import DirectoryPageBtn from "@/components/DirectoryPageBtn.vue";
import BookIcon from "vue-material-design-icons/Book.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";

const bookstore = bookStore();
const userstore = userStore();
const pageTitle = ref("Book directory");
const dataTableCollection = reactive({
  books: {
    headings: ["Title", "Author", "No.", "Genre", "DDC", "Language", "Edition"],
    data: bookstore.books,
    props: [
      "title",
      "author",
      "bnumber",
      "subject",
      "ddc",
      "language",
      "edition",
    ],
  },
  users: {
    headings: ["Name", "Index", "Class", "Address", "Island/City", "Mobile"],
    data: userstore.users,
    props: ["name", "index", "grade", "address", "island", "number"],
  },
});
const dataTableState = ref(dataTableCollection.books);
const btnState = shallowRef([
  {
    name: "Student",
    pageTitleName: "Student directory",
    state: false,
    icon: AccountGroupIcon,
    collectionName: "users",
  },
  {
    name: "Book",
    pageTitleName: "Book directory",
    state: true,
    icon: BookIcon,
    collectionName: "books",
  },
]);

function toggleBtnState(btn) {
  btnState.value = btnState.value.map((v) => {
    return { ...v, state: !v.state };
  });
  pageTitle.value = btn.pageTitleName;
  dataTableState.value = dataTableCollection[btn.collectionName];
}

bookstore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {});
  }
}, true);
onMounted(() => {});
</script>
