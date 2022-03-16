<template>
  <div
    class="flex transition py-1 desktop:py-2 px-4 justify-center hover:bg-steel rounded-lg"
  >
    <div class="flex items-center w-48 space-x-6">
      <slot></slot>
      <button class="text-primary h-full desktop:text-1.5xl laptop:text-1xl">
        {{ props.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style scoped>
.font {
  font-size: 1.28rem;
}
</style>
