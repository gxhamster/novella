<template>
  <span :class="`w-${size} h-${size}`" class="" role="img">
    <img src="@/assets/AddNewBook.svg" alt="" />
  </span>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  size: Number,
});
</script>
