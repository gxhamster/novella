<template>
  <page-container title="Issue Books to Students">
    <novella-form
      :handle-submit="handleSubmit"
      :default-values="{
        student_index: {
          value: '2416',
        },
        start_date: {
          value: todayDateStr,
        },
      }"
      class="flex flex-col items-center justify-between h-full"
    >
      <div class="flex w-full flex-grow gap-x-14">
        <div class="flex flex-col justify-between flex-grow">
          <novella-search-input-text
            name="student_index"
            label="student_index"
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
          <novella-input-text
            name="book_id"
            label="Book ID"
            :validation="
              (text) => new Validator(text).isAlpha().required().unwrap()
            "
          ></novella-input-text>
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
      <novella-form-button label="Submit" />
    </novella-form>
  </page-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PageContainer from "@/components/PageContainer.vue";
import NovellaForm from "@/components/NovellaForm.vue";
import NovellaInputText from "@/components/NovellaInputText.vue";
import NovellaSearchInputText from "@/components/NovellaSearchInputText.vue";
import NovellaFormButton from "@/components/NovellaFormButton.vue";
import { FormData } from "@/components/NovellaForm.vue";
import { Validator } from "@/utils/validation";

const todayDateStr = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const format = `${year}-${month}-${day}`;

  return format;
});

function handleSubmit(data: FormData) {
  console.log(data);
}
</script>
