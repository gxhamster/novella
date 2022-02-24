<template>
  <button class="hover:opacity-90 transition duration-150 px-4 desktop:py-3 laptop:py-2 w-28 text-white rounded-full" :class="`${props.background} ${props.text_color}`">
    {{ props.title }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: 'bg-primary'
    },
    text_color: {
      type: String,
      default: 'text-white'
    }
  })
</script>
