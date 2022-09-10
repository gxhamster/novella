<template>
  <form ref="formElem">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { ref, provide, defineProps, defineEmits } from "vue";
import { PageLayoutData } from "@/utils/helper";

interface Prop {
  formData: PageLayoutData[];
}

const props = defineProps<Prop>();

const emit = defineEmits(["firebaseSend"]);

const formElem = ref(null);
const allFieldsValid = ref(true);

function submitForm() {
  for (const data of props.formData) {
    if (data.required) data.elem.checkEmpty();
  }
  let errorCount = 0;
  for (const data of props.formData) {
    console.log(data.title, data.elem.showError);
    if (data.elem.showError) {
      errorCount++;
    }
  }
  if (errorCount !== 0) {
    allFieldsValid.value = false;
  } else {
    allFieldsValid.value = true;
  }

  if (allFieldsValid.value) {
    emit("firebaseSend", props.formData);
  }
}

function clearForm() {
  for (const data of props.formData) {
    data.clearText();
    // Clear errors from input
    data.elem.hideError();
  }
}

provide("form-control", { submitForm, clearForm });
</script>
