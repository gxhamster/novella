<template>
  <section class="flex justify-center space-x-12">
    <PageButton
      @click.prevent="clearForm"
      title="Cancel"
      background="cancel-button-red"
    />
    <PageButton @click.prevent="submitForm" title="Add" />
  </section>
</template>

<script setup>
import { defineEmits, inject } from "vue";
import PageButton from "./PageButton.vue";

defineEmits(["submit", "cancel"]);
const { submitForm, clearForm } = inject("form-control");
</script>
