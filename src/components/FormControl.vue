<template>
  <form ref="formElem">
    <slot></slot>
  </form>
</template>

<script setup>
import { ref, provide, defineProps } from "vue";

const props = defineProps({
  formData: {
    type: Array,
    default: null,
  },
});

const formElem = ref(null);

function submitForm() {
  // const formData = new FormData(formElem.value);
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  // }
  for (const data of props.formData) {
    if (data.required) data.elem.checkEmpty();
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
