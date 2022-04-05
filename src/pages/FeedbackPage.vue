<template>
  <PageContainer title="Feedback">
    <FormControl
      :formData="[fields]"
      class="flex flex-col h-full justify-between"
    >
      <div class="flex flex-col gap-10 flex-grow">
        <InputText
          title="Subject"
          v-model="fields.text"
          :ref="(el) => (fields.elem = el)"
          :validate="fields.validator"
        />
        <TextArea title="Message:" class="w-full h-full max-h-full" />
      </div>
      <SubmitButtonsGroup class="col-span-2 mt-4" />
    </FormControl>
  </PageContainer>
</template>

<script setup>
import { ref } from "vue";
import PageContainer from "@/components/PageContainer";
import InputText from "@/components/InputText";
import TextArea from "@/components/TextArea";
import { validate } from "../utils/validation";
import FormControl from "../components/FormControl.vue";
import SubmitButtonsGroup from "../components/SubmitButtonsGroup.vue";
import { PageLayoutData } from "../utils/helper";

const fields = ref(
  new PageLayoutData("Feedback", {
    validator: (text) =>
      validate(text).between({
        inclusive: true,
        min: 3,
        max: 20,
        message: "Subject must be between 3 and 20",
      }),
  })
);
</script>
