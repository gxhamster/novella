<template>
  <PageContainer title="Issue books to students">
    <FormControl
      @firebaseSend="addIssuedBookToFirebase"
      :formData="[...student_fields, ...book_fields, ...date_fields]"
      class="flex flex-col justify-between h-full"
    >
      <div class="flex gap-x-14">
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl text-gray-800"
            >Student Details</span
          >
          <div class="flex flex-col justify-between gap-y-7 flex-grow mt-6">
            <div
              v-for="(field, index) in student_fields"
              :key="field.id"
              class="flex space-x-4"
            >
              <SearchInput
                v-if="field.searchable"
                v-model="student_fields[index].text"
                :searchData="field.search_data"
                @dropdownItemSelected="autocompleteStudentData"
                :title="field.title"
                class="w-full"
                :ref="(el) => (student_fields[index].elem = el)"
              />
              <InputText
                :canEdit="false"
                v-else
                v-model="student_fields[index].text"
                class="w-full"
                :title="field.title"
                :width="field.title == 'Student Grade' ? '48' : 'full'"
                :ref="(el) => (student_fields[index].elem = el)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="desktop:text-2xl laptop:text-1.5xl text-gray-800"
            >Book Details</span
          >
          <div class="flex flex-col flex-grow gap-y-7 justify-between mt-6">
            <div
              v-for="(field, index) in book_fields"
              :key="field.id"
              class="flex space-x-4"
            >
              <SearchInput
                v-if="field.searchable"
                v-model="book_fields[index].text"
                :searchData="field.search_data"
                @dropdownItemSelected="autocompleteBookData"
                :title="field.title"
                class="w-full"
                :ref="(el) => (book_fields[index].elem = el)"
              />
              <InputText
                :canEdit="false"
                v-else
                v-model="book_fields[index].text"
                class="w-full"
                :title="field.title"
                width="full"
                :ref="(el) => (book_fields[index].elem = el)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-12">
        <DateInput
          v-model="date_fields[0].date"
          :title="date_fields[0].title"
          :ref="(el) => (date_fields[0].elem = el)"
        />
        <DateInput
          v-model="date_fields[1].date"
          :title="date_fields[1].title"
          :ref="(el) => (date_fields[1].elem = el)"
        />
      </div>
      <SubmitButtonsGroup />
    </FormControl>
  </PageContainer>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import InputText from "@/components/InputText";
import DateInput from "@/components/DateInput";
import FormControl from "@/components/FormControl";
import PageContainer from "@/components/PageContainer";
import SearchInput from "@/components/SearchInput";
import SubmitButtonsGroup from "@/components/SubmitButtonsGroup";
import { userStore, bookStore } from "@/stores/store";
import { SearchItemClass } from "@/utils/search";
import {
  prettyCapitalize,
  PageLayoutData,
  fiveDaysAfterDate,
} from "@/utils/helper";

import {
  getFirestore,
  setDoc,
  doc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

const userstore = userStore();
const bookstore = bookStore();

const date_fields = ref([
  new PageLayoutData("Issue Date", {
    firebase_field: "issue_date",
    date: new Date(),
  }),
  new PageLayoutData("Due Date", {
    firebase_field: "due_date",
    date: fiveDaysAfterDate(new Date()),
  }),
]);

const student_fields = ref([
  new PageLayoutData("Student Index", {
    full: true,
    firebase_field: "index",
    searchable: true,
  }),
  new PageLayoutData("Student Name", {
    required: false,
    firebase_field: "name",
    full: true,
  }),
  new PageLayoutData("Student Grade", {
    firebase_field: "grade",
    required: false,
  }),
]);
const book_fields = ref([
  new PageLayoutData("Book ID", {
    firebase_field: "book_id",
    searchable: true,
  }),
  new PageLayoutData("Book Name", {
    firebase_field: "book_name",
    required: false,
  }),
  new PageLayoutData("Author", {
    firebase_field: "author",
    required: false,
  }),
]);

function autocompleteStudentData(obj) {
  student_fields.value[0].text = obj.optional.index;
  student_fields.value[1].text = obj.title;
  student_fields.value[2].text = obj.optional.grade;
}

function autocompleteBookData(obj) {
  book_fields.value[0].text = obj.title;
  book_fields.value[1].text = obj.optional.title;
  book_fields.value[2].text = obj.optional.author;
}

function userStoreGetData() {
  // Remove duplicate titles
  const user_results = [
    ...userstore.users.map(
      (v) =>
        new SearchItemClass(prettyCapitalize(v.name), "user", {
          index: v.index === "" ? "N/A" : v.index,
          grade: v.grade,
        })
    ),
  ];

  return [...user_results];
}

function bookStoreGetData() {
  // Remove duplicate titles
  const book_results = [
    ...bookstore.books.map(
      (v) =>
        new SearchItemClass(v.bnumber === "" ? "N/A" : v.bnumber, "book", {
          title: v.title === "" ? "N/A" : prettyCapitalize(v.title),
          author: prettyCapitalize(v.author),
        })
    ),
  ];

  return [...book_results];
}

async function addIssuedBookToFirebase(formData) {
  const dueBookObj = {};
  formData.map((field) => {
    if (field.date === null) {
      dueBookObj[field.firebase_field] = field.text;
    } else {
      dueBookObj[field.firebase_field] = field.date;
    }
  });
  const db = getFirestore();

  // Check if book has been issued before
  const dues_ref = collection(db, "dues");
  const q = query(dues_ref, where("book_id", "==", dueBookObj.book_id));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size === 0) {
    const key = `${dueBookObj.index}-${dueBookObj.book_id}`.trim();
    const due_ref = doc(db, "dues", key);
    await setDoc(due_ref, dueBookObj);
  } else {
    // TODO: Put some popup from app to show error
    console.error("Cannot issue the same book !");
  }
}

bookstore.$onAction(({ name, after }) => {
  if (name === "setDataFetched") {
    after(() => {
      const result = bookStoreGetData();
      book_fields.value = book_fields.value.map((v) => v.setSearchData(result));
    });
  }
});

userstore.$onAction(({ name, after }) => {
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
  const book_result = bookStoreGetData();
  book_fields.value = book_fields.value.map((v) =>
    v.setSearchData(book_result)
  );
});

// Due Date automatically becomes 5 days after
watch(date_fields.value[0], () => {
  date_fields.value[1].date = fiveDaysAfterDate(date_fields.value[0].date);
});
</script>
