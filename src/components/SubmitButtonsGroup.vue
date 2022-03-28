<template>
  <section class="flex justify-center space-x-12">
    <PageButton
      @click="emit('cancel')"
      title="Cancel"
      background="cancel-button-red"
    />
    <PageButton @click="emit('submit')" title="Add" />
  </section>
</template>

<script setup>
import { defineEmits } from "vue";
import PageButton from "./PageButton.vue";
const emit = defineEmits(["submit", "cancel"]);
</script>
