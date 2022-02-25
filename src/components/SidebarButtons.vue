<template>
  <div @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="$emit('clicked')" class="flex space-x-2 flex-grow cursor-pointer">
    <slot :isHovered="isHovered" :isActive="props.isActive"></slot>
    <button class="text-white desktop:text-lg laptop:text-md">{{ props.title }}</button>
  </div>
</template>

<script setup>
  import { defineEmits, ref, defineProps } from 'vue'

  defineEmits(['clicked'])
  const isHovered = ref(false)
  const props = defineProps({
    title: String,
    image: String,
    isActive: Boolean
  })
</script>
