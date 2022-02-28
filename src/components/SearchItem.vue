<template>
  <div class="flex bg-secondary rounded-md cursor-pointer hover:text-red-600 p-2 ">
    <span class="text-1xl">{{ props.title }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  title: String
})
</script>

