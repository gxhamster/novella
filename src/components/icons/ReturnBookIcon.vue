<template>
  <div :class="`w-${size} h-${size}`">
    <img src="@/assets/ReturnBook.svg" alt="">
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  size: Number
})
</script>