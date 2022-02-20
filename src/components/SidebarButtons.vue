<template>
  <div v-on:mouseover="isActive = true" v-on:mouseleave="isActive = false" class="flex space-x-2 flex-grow cursor-pointer">
    <slot :isActive="isActive"></slot>
    <button @click="$emit('clicked')" class="text-white desktop:text-lg laptop:text-md">{{ props.title }}</button>
  </div>
</template>

<script setup>
  import { defineEmits, ref, defineProps } from 'vue'

  defineEmits(['clicked'])
  const isActive = ref(false)
  const props = defineProps({
    title: String,
    image: String
  })
</script>

