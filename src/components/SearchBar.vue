<template>
  <div class="relative">
    <magnify-icon :class="isActive ? 'animate-pulse' : ''" class="text-primary absolute desktop:top-4 desktop:right-6 laptop:top-2 laptop:right-6" icon="fa-regular fa-magnifying-glass" />
    <input @focus="isActive = true" @blur="isActive = false" class="bg-secondary text-gray-500 rounded-full appearance-none text-right outline-none desktop:px-4 desktop:pr-20 laptop:pr-16 desktop:py-4 laptop:py-2" placeholder="Search..." >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'


const isActive = ref(false)

</script>
