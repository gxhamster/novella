<template>
  <form ref="formElem">
    <slot></slot>
  </form>
</template>

<script setup>
import { ref, provide, defineProps, defineEmits } from "vue";

const props = defineProps({
  formData: {
    type: Array,
    default: null,
    required: true,
  },
});

const emit = defineEmits(["firebaseSend"]);

const formElem = ref(null);
const allFieldsValid = ref(true);

function submitForm() {
  for (const data of props.formData) {
    if (data.required) data.elem.checkEmpty();
  }
  let errorCount = 0;
  for (const data of props.formData) {
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
