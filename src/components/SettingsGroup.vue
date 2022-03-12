<template>
  <section
    class="pt-4 desktop:pb-16 laptop:pb-12 laptop:px-10 desktop:px-14 bg-settingsgray rounded-lgg"
  >
    <span class="text-1.5xl font-bold block mb-2">{{ title }}</span>
    <div class="flex flex-col">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
