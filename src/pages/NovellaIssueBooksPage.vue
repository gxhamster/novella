<template>
  <page-container title="Issue Books to Students">
    <novella-form
      ref="formElem"
      :handle-submit="handleSubmit"
      :default-values="{
        student_index: {
          value: '2416',
        },
        start_date: {
          value: todayDateStr,
        },
        end_date: {
          value: fiveDaysAfterToday,
        },
      }"
      class="flex flex-col items-center justify-between h-full"
    >
      <div class="flex w-full flex-grow gap-x-14">
        <div class="flex flex-col justify-between flex-grow">
          <novella-search-input-text
            name="student_index"
            label="Student Index"
            :search-items="studentIndexSearchData"
            @dropdownItemClicked="setStudentFields"
            :validation="
              (text) => new Validator(text).isAlpha().required().unwrap()
            "
          ></novella-search-input-text>
          <novella-input-text
            name="student_name"
            label="Student Name"
          ></novella-input-text>
          <novella-input-text
            name="student_grade"
            label="Student Grade"
          ></novella-input-text>
        </div>
        <div class="flex flex-col justify-between flex-grow">
          <novella-search-input-text
            name="book_id"
            label="Book ID"
            :search-items="bookIdSearchData"
            @dropdownItemClicked="setBookFields"
            :validation="
              (text) => new Validator(text).isAlpha().required().unwrap()
            "
          ></novella-search-input-text>
          <novella-input-text
            name="book_name"
            label="Book Name"
          ></novella-input-text>
          <novella-input-text
            name="book_author"
            label="Book Author"
          ></novella-input-text>
        </div>
      </div>
      <div class="flex flex-grow items-center gap-x-14">
        <novella-input-text type="date" name="start_date" label="Start Date" />
        <novella-input-text type="date" name="end_date" label="End Date" />
      </div>
      <div class="col-span-2 flex gap-x-5">
        <novella-form-button label="Submit" />
        <novella-form-button-cancel label="Cancel" />
      </div>
    </novella-form>
  </page-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import PageContainer from "@/components/PageContainer.vue";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import NovellaSearchInputText from "@/components/NovellaSearchInputText.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import NovellaFormButtonCancel from "@/components/NovellaFormButtonCancel.vue";
import { FormData } from "@/components/NovellaForm.vue";
import { Validator } from "@/utils/validation";
import { supabase } from "@/modules/auth/supabase";
import { NovellaSearchDropdownField } from "@/components/NovellaSearchDropdown.vue";

const studentIndexSearchData = ref<NovellaSearchDropdownField | []>([]);
const bookIdSearchData = ref<NovellaSearchDropdownField | []>([]);
const formElem = ref<InstanceType<typeof NovellaForm> | null>(null);

const todayDateStr = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const format = `${year}-${month}-${day}`;

  return format;
});

const fiveDaysAfterToday = computed(() => {
  // five days after calculation
  const date = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const format = `${year}-${month}-${day}`;

  return format;
});

function handleSubmit(data: FormData) {
  console.log(data);
}

async function getStudentIndexes() {
  let { data: students, error } = await supabase
    .from("students")
    .select("id, index, name");

  if (error) {
    console.error("Cannot fetch student indexes: ", error);
  } else {
    const n = students.map((v) => ({
      id: v.id.toString(),
      title: v.index.toString(),
      subtitle: v.name.toString(),
    }));
    studentIndexSearchData.value = n;
  }
}

async function getBookIdData() {
  let { data: books, error } = await supabase
    .from("books")
    .select("id, title, author, isbn");

  if (error) {
    console.error("Cannot fetch books data: ", error);
  } else {
    const n = books.map((v) => ({
      id: v.id.toString(),
      title: v.isbn.toString(),
      subtitle: v.title.toString(),
    }));
    bookIdSearchData.value = n;
  }
}

async function setStudentFields(dropdownData: NovellaSearchDropdownField) {
  let { data: students, error } = await supabase
    .from("students")
    .select("index, name, grade")
    .eq("id", dropdownData.id);

  if (error) {
    console.error("Cannot fetch student data: ", error);
  } else if (students !== null && formElem.value !== null) {
    console.log(formElem.value);
    formElem.value.setFormData("student_grade", {
      value: students[0].grade,
      validationStatus: true,
    });
    formElem.value.setFormData("student_name", {
      value: students[0].name,
      validationStatus: true,
    });
  }
}

async function setBookFields(dropdownData: NovellaSearchDropdownField) {
  let { data: books, error } = await supabase
    .from("books")
    .select("isbn, title, author")
    .eq("id", dropdownData.id);

  if (error) {
    console.error("Cannot fetch books data: ", error);
  } else if (books !== null && formElem.value !== null) {
    console.log(formElem.value);
    formElem.value.setFormData("book_name", {
      value: books[0].title,
      validationStatus: true,
    });
    formElem.value.setFormData("book_author", {
      value: books[0].author,
      validationStatus: true,
    });
  }
}

onMounted(() => {
  getStudentIndexes();
  getBookIdData();
});
</script>
