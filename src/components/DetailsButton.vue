<template>
  <button @mouseover="isActive = true" @mouseleave="isActive = false" class="font-medium flex transition duration-150 bg-steel rounded-full desktop:px-4 desktop:py-2 laptop:px-4 laptop:py-2 flex-shrink-0" :class="isActive ? 'animate-pulse' : ''">
    More details
    <arrow-right-icon class="ml-1 inline-block"/>
  </button>
</template>

<script setup>
import { ref } from 'vue'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'

const isActive = ref(false)

</script>
