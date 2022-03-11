<template>
  <div
    v-on:mouseover="isActive = true"
    v-on:mouseleave="isActive = false"
    class="flex space-x-4 w-40 items-center"
  >
    <slot :isActive="isActive"></slot>
    <button class="text-primary h-full desktop:text-1.5xl laptop:text-1xl">
      {{ props.title }}
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const isActive = ref(false);
const props = defineProps({
  title: String,
});
</script>

<style scoped>
.font {
  font-size: 1.28rem;
}
</style>
