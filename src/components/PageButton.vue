<template>
  <button class="bg-primary px-4 desktop:py-3 laptop:py-2 w-28 text-white rounded-full">
    {{ props.title }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    title: String
  })
</script>
