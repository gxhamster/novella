<template>
  <div class="flex h-screen">
    <window-controls class="absolute right-3 top-0 w-title-bar" />
    <div class="w-100 bg-primary text-white text-center pt-80 px-10 text-5xl">
      {{ welcomeMessage }}
    </div>
    <div class="flex-grow flex flex-col h-full px-80 py-20">
      <h3 class="text-center text-primary text-4xl font-medium">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import WindowControls from "./WindowControls.vue";

interface Props {
  welcomeMessage: string;
  title: string;
}

defineProps<Props>();
</script>
