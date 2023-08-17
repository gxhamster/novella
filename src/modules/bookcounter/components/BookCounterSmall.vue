<template>
  <div
    @click="$emit('clicked', counter)"
    class="laptop:rounded-xl desktop:rounded-2xl cursor-pointer laptop:p-2 desktop:p-4 border-2 border-primary"
  >
    <component :is="counter.icon" class="text-primary bookcounter-icon" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Counter {
  title: string;
  icon: any;
  value: number;
}

interface Props {
  counter: Counter;
}

defineProps<Props>();
defineEmits(["clicked"]);
</script>

<style></style>
