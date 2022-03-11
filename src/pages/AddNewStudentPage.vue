<template>
  <PageContainer title="Add New Student">
    <div class="grid grid-cols-2 content-between h-full gap-x-14">
      <div
        v-for="(field, index) in student_fields"
        :key="field.id"
        class="flex space-x-4"
      >
        <InputText
          v-model="student_fields[index].text"
          :title="field.title"
          class="w-full"
          :width="!field.full ? '48' : 'full'"
        />
      </div>
      <div class="flex justify-center space-x-12 col-span-2 mt-4">
        <PageButton
          @click="clear_input_text"
          title="Cancel"
          background="cancel-button-red"
        />
        <PageButton @click="clear_input_text" title="Save" />
      </div>
    </div>
  </PageContainer>
</template>

<script setup>
import { ref } from "vue";
import InputText from "@/components/InputText";
import PageButton from "@/components/PageButton";
import PageContainer from "@/components/PageContainer";
import { PageLayoutData } from "@/utils/helper";

const student_fields = ref([
  new PageLayoutData("Student Name", true),
  new PageLayoutData("Student Island", true),
  new PageLayoutData("Student Address", true),
  new PageLayoutData("Student Phone", true),
  new PageLayoutData("Student Grade", false),
  new PageLayoutData("Student Index", false),
]);

const clear_input_text = () => {
  student_fields.value = student_fields.value.map((v) => v.clearText());
};
</script>
