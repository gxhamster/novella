<template>
  <section class="flex justify-center space-x-12">
    <PageButton
      @click.prevent="clearForm"
      :title="names[1]"
      background="cancel-button-red"
    />
    <PageButton @click.prevent="submitForm" :title="names[0]" />
  </section>
</template>

<script setup>
import { defineEmits, inject, defineProps } from "vue";
import PageButton from "./PageButton.vue";

defineProps({
  names: {
    type: Array,
    default: () => ["Add", "Cancel"],
  },
});
defineEmits(["submit", "cancel"]);
const { submitForm, clearForm } = inject("form-control");
</script>
