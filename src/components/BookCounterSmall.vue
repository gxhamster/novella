<template>
  <div
    class="custom-shadow overflow-hidden bg-secondary cursor-pointer flex justify-center flex-col items-center desktop:w-32 laptop:w-24 h-full rounded-lgg"
  >
    <component :is="props.icon" class="text-primary" :size="48" />
    <small class="w-20 text-gray-600 text-xs text-center">{{ title }}</small>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  icon: Object,
  title: String,
});
</script>

<style scoped>
div > small {
  transform: translateY(200%);
  transition: all 0.4s ease-in-out;
}

div > span {
  transition: all 0.4s ease-in-out;
  transform: translateY(40%);
}

div:hover > span {
  transform: translateY(0%);
}

div:hover > small {
  /* animation: slide-in 0.5s ease; */
  /* display: inline-block; */
  transform: translateY(0%);
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
</style>
