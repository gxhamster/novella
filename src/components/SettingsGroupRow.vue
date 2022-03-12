<template>
  <div class="relative flex justify-between py-2 items-center">
    <span class="text-lg">{{ title }}</span>
    <slot></slot>
    <div class="w-full absolute bottom-0 px-2">
      <div class="custom-border bg-gray-400 w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.custom-border {
  height: 2px;
  width: 100%;
}
</style>
