<template>
  <PageContainer :max="true" :title="pageTitle">
    <template #titleContent>
      <span class="flex gap-2 relative">
        <DirectoryPageBtn
          v-for="btn in btnState"
          :key="btn.name"
          :isSmall="!btn.state"
          :title="btn.name"
          :direction="btn.transformDirection"
          @clicked="toggleBtnState(btn)"
        >
          <template #icon>
            <component :is="btn.icon" />
          </template>
        </DirectoryPageBtn>
      </span>
    </template>
    <DataTable
      :data="dataTableState.data"
      :dataProps="dataTableState.props"
      :headings="dataTableState.headings"
      :filter="dataTableState.filter"
    />
  </PageContainer>
</template>

<script setup>
import { reactive, shallowRef, ref, onMounted } from "vue";
import PageContainer from "@/components/PageContainer";
import DataTable from "@/components/DataTable.vue";
import DirectoryPageBtn from "@/components/DirectoryPageBtn.vue";
import BookIcon from "vue-material-design-icons/Book.vue";
import AccountGroupIcon from "vue-material-design-icons/AccountGroup.vue";
import { supabase } from "@/modules/auth/supabase";

async function getAllStudentsData() {
  let { data: students, error } = await supabase.from("students").select("*");
  if (error) {
    console.error("Cannot fetch students data from Supbase: ", error);
  } else {
    studentsData.value = students;
  }
}

async function getAllBooksData() {
  let { data: books, error } = await supabase.from("books").select("*");
  if (error) {
    console.error("Cannot fetch books data from Supbase: ", error);
  } else {
    booksData.value = books;
  }
}

const studentsData = ref([]);
const booksData = ref([]);
const pageTitle = ref("Book directory");
const dataTableCollection = reactive({
  books: {
    headings: ["Title", "Author", "ISBN", "Genre", "DDC", "Language"],
    filter: [
      { heading: "Title", prop: "title" },
      { heading: "Author", prop: "author" },
      { heading: "No.", prop: "bnumber" },
    ],
    data: booksData,
    props: ["title", "author", "isbn", "genre", "ddc", "language"],
  },
  users: {
    headings: ["Name", "Index", "Grade", "Address", "Island/City", "Mobile"],
    filter: [
      { heading: "Name", prop: "name" },
      { heading: "Index", prop: "index" },
      { heading: "Grade", prop: "grade" },
    ],
    data: studentsData,
    props: ["name", "index", "grade", "address", "island", "phone"],
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
    transformDirection: "left",
  },
  {
    name: "Book",
    pageTitleName: "Book directory",
    state: true,
    icon: BookIcon,
    collectionName: "books",
    transformDirection: "right",
  },
]);

function toggleBtnState(btn) {
  btnState.value = btnState.value.map((v) => {
    return { ...v, state: !v.state };
  });
  pageTitle.value = btn.pageTitleName;
  dataTableState.value = dataTableCollection[btn.collectionName];

  getAllBooksData();
  getAllStudentsData();
}

onMounted(() => {
  getAllBooksData();
  getAllStudentsData();
});
</script>
