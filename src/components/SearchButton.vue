<template>
  <button @mouseover="isHovered = true" @mouseleave="isHovered = false" class="rounded-full laptop:p-2 desktop:p-3 bg-steel flex justify-center items-center" alt="search button">
    <magnify-icon class="text-primary" :class="isHovered ? 'animate-pulse' : ''"/>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
const isHovered = ref(false)
</script>
