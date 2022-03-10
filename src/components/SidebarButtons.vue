<template>
  <div @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="$emit('clicked')" :class="isActive ? 'btn-active' : ''" class="transition-all duration-50 btn-hover desktop:py-1 rounded-md cursor-pointer">
    <div class="desktop:pl-14 laptop:pl-10 w-full flex space-x-2">
      <slot></slot>
      <div class="text-white desktop:text-lg laptop:text-md my-auto">{{ props.title }}</div>
    </div>
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

<style scoped>
.btn-active {
  background-color: rgb(118,162,185) !important;
}
.btn-hover:hover {
  background-color: rgb(118,162,185,0.3);
}
</style>
