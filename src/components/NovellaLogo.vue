<template>
  <div :class="logoStyle">
    <span class="desktop:text-6xl laptop:text-5xl text-center block font-bold"
      >novella</span
    >
    <span class="font-light text-center laptop:text-sm desktop:text-lg"
      >Library Management System</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { withDefaults, defineProps } from "vue";

interface Props {
  color: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "white",
});

const logoStyle = computed(() => `text-${props.color} mt-2 flex flex-col`);
</script>

<style scoped>
.subtext {
  font-size: 1.35rem;
}
</style>
