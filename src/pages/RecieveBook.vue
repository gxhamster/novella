<template>
  <PageContainer :max="true" title="Receive book">
    <FormControl
      @firebase-send="addToReceivedBooks"
      class="flex flex-col justify-between h-full"
      :form-data="[...student_fields]"
    >
      <span
        class="desktop:text-2xl laptop:text-1.5xl text-gray-800 laptop:px-7 desktop:px-14"
        >Student Details</span
      >
      <div class="flex gap-x-7 flex-grow mt-6 laptop:px-7 desktop:px-14">
        <div
          v-for="(field, index) in student_fields"
          :key="index"
          class="flex-grow"
        >
          <SearchInput
            v-if="field.searchable"
            v-model="student_fields[index].text"
            :search-data="field.search_data"
            @dropdown-item-selected="autocompleteUserData"
            title="Student Index"
            class="w-full"
            :ref="(el) => (student_fields[index].elem = el)"
          />
          <InputText
            v-else
            v-model="student_fields[index].text"
            :title="field.title"
            :can-edit="false"
            class="w-full"
            :ref="(el) => (student_fields[index].elem = el)"
          />
        </div>
      </div>
      <DataTable
        class="my-4"
        @item-selected="setSelectedItem"
        :headings="[
          'Title',
          'Author',
          'No.',
          'Genre',
          'DDC',
          'Language',
          'Issued Date',
        ]"
        :data="booksIssuedToUser"
        :data-props="[
          'book_name',
          'author',
          'book_id',
          'genre',
          'ddc',
          'language',
          'issue_date_formatted',
        ]"
      />
      <SubmitButtonsGroup :names="['Recieve', 'Cancel']" />
    </FormControl>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import PageContainer from "@/components/PageContainer.vue";
import InputText from "../components/InputText.vue";
import SearchInput from "../components/SearchInput.vue";
import FormControl from "../components/FormControl.vue";
import SubmitButtonsGroup from "../components/SubmitButtonsGroup.vue";
import DataTable from "../components/DataTable.vue";
import { PageLayoutData, prettyCapitalize } from "../utils/helper";
import { userStore, dueStore } from "@/stores/store";
import { SearchItemClass } from "../utils/search";
import { receiveStore } from "../stores/store";
import { getFirestore, doc, setDoc, deleteDoc } from "@firebase/firestore";

const userstore = userStore();
const duestore = dueStore();
const receivestore = receiveStore();

interface IssuedBookFormatted {
  name: string;
  index: number;
  grade: string;
  book_name: string;
  book_id: string;
  author: string;
  days: number;
  issue_date: { nanoseconds: number; seconds: number };
  issue_date_formatted: string;
  due_date: { nanoseconds: number; seconds: number };
}

const booksIssuedToUser = computed(() => {
  const index = student_fields.value[0].text;
  const filteredBooks = duestore.dues
    .filter((v) => v.index == parseInt(index))
    .map((v) => {
      const date = new Date(v.issue_date.seconds * 1000);
      const d = date.getUTCDate();
      const m = date.getUTCMonth() + 1; // getUTCMonth() is zero based
      const y = date.getUTCFullYear();
      const n: IssuedBookFormatted = {
        ...v,
        issue_date_formatted: `${d}/${m}/${y}`,
      };
      return n;
    });

  return filteredBooks;
});

const bookToReceive = ref<IssuedBookFormatted>();
const student_fields = ref([
  new PageLayoutData("Student Index", {
    firebase_field: "index",
    searchable: true,
  }),
  new PageLayoutData("Student Name", {
    required: false,
    firebase_field: "name",
  }),
]);

function setSelectedItem(item: IssuedBookFormatted) {
  bookToReceive.value = item;
}

async function addToReceivedBooks() {
  console.log(bookToReceive.value, receivestore.received);
  const db = getFirestore();
  const receiveObj = {
    ...bookToReceive.value,
    receive_date: {
      seconds: Date.now() / 1000,
      nanoseconds: Date.now() * 1000000,
    },
  };
  const key = `${receiveObj.book_id}-${receiveObj.receive_date.seconds}`;
  const receiveRef = doc(db, "received", key);
  await setDoc(receiveRef, receiveObj);
  removeReceivedFromDues(receiveObj);
}

async function removeReceivedFromDues(bookObj: any) {
  const db = getFirestore();
  const dueRef = doc(db, "dues", `${bookObj.index}-${bookObj.book_id}`);
  deleteDoc(dueRef);
}

function autocompleteUserData(dropdownData: any) {
  student_fields.value[0].text = dropdownData.optional.index;
  student_fields.value[1].text = dropdownData.title;
}

function userStoreGetData() {
  const result = userstore.users.map(
    (v) =>
      new SearchItemClass(prettyCapitalize(v.name), "user", {
        index: v.index,
        grade: v.grade,
      })
  );
  const usersIssued = new Map();
  for (const user of result) {
    for (const due of duestore.dues) {
      if (user.optional.index == due.index)
        usersIssued.set(user.optional.index, user);
    }
  }
  const usersIssuedArr = Array.from(usersIssued.values());
  return usersIssuedArr;
}

// When a new duebook is added search data should be updated
duestore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {
      const result = userStoreGetData();
      student_fields.value = student_fields.value.map((v) =>
        v.setSearchData(result)
      );
    });
  }
});

onMounted(() => {
  const user_result = userStoreGetData();
  student_fields.value = student_fields.value.map((v) =>
    v.setSearchData(user_result)
  );
});
</script>
