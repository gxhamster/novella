<template>
  <div class="desktop:p-20 laptop:py-10 laptop:px-14 bg-secondary rounded-lgg flex-grow overflow-hidden">
    <span class="block desktop:text-3xl laptop:text-2xl font-medium desktop:mb-6 laptop:mb-3">{{ props.title }}</span>
    <div class="main-container flex flex-col justify-between">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({ title: String })
</script>
