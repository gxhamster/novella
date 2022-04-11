<template>
  <button
    class="rounded-full relative bg-primary text-sm text-center items-center p-2 text-white flex justify-between"
    @click="$emit('clicked')"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineEmits } from "vue";

defineEmits(["clicked"]);
</script>
