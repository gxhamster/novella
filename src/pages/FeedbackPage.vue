<template>
  <PageContainer title="Feedback">
    <div class="flex flex-col h-full justify-between">
      <div class="flex flex-col gap-10 flex-grow">
        <InputText
          title="Subject"
          :width="96"
          :validate="(text) => validate(text).between()"
        />
        <TextArea title="Message:" class="w-full h-full max-h-full" />
      </div>
      <div class="flex justify-center space-x-12 col-span-2 mt-10">
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
import PageContainer from "@/components/PageContainer";
import InputText from "@/components/InputText";
import PageButton from "@/components/PageButton";
import TextArea from "@/components/TextArea";
import { validate } from "../utils/validation";
</script>
