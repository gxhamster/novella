<template>
  <div class="flex gap-2">
    <component class="text-primary bookcounter-main-icon" :is="counter.icon" />
    <div class="flex flex-col justify-evenly">
      <span class="laptop:text-xs desktop:text-base"> {{ counter.title }}</span>
      <span class="laptop:text-4xl desktop:text-5xl font-bold">
        {{ counter.value }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Counter {
  title: string;
  icon: any;
  value: number;
}

interface Props {
  counter: Counter;
}

defineProps<Props>();
</script>
