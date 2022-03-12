<template>
  <div class="flex flex-col size">
    <label for="textarea" class="block mb-2">{{ title }}</label>
    <textarea
      class="border-2 resize-none flex-grow px-4 py-2 border-border outline-none apperance-none rounded-lgg bg-secondary"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({ title: String });
</script>

<style scoped>
.size {
  max-height: 350px;
}
</style>
