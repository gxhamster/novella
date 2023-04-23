<template>
  <button
    class="hover:opacity-90 transition duration-150 px-4 desktop:py-3 bg-primary laptop:py-2 h-12 w-28 text-white rounded-full"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  label: string;
  help?: string;
  placeholder?: string;
}
defineProps<Props>();
</script>
