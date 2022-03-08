<template>
  <div class="custom-shadow bg-secondary cursor-pointer flex justify-center items-center desktop:w-32 laptop:w-24 h-full rounded-lgg">
    <component :is="props.icon" class="text-primary" :size="48"/>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  icon: Object
})
</script>
